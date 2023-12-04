import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePalletDto } from './dto/create-pallet.dto';
import { UpdatePalletDto } from './dto/update-pallet.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Pallet } from './schemas/pallet.schema';
import mongoose, { Model } from 'mongoose';
import { Patch } from 'src/patches/schemas/patch.schema';
import { palletStatus } from 'src/types';
const debug = require('debug')('resource');
const qr = require("qrcode");

@Injectable()
export class PalletsService {

  constructor(@InjectModel(Pallet.name) private PalletModel: Model<Pallet>, @InjectModel(Patch.name) private PatchModel: Model<Patch>) { }

  async create(createDto: CreatePalletDto) {
    try {
      // create record
      const createdRecord = await new this.PalletModel(createDto).save();

      // update patch
      const patchId = createDto.patch;
      let patch = await this.PatchModel.findOneAndUpdate({ "_id": patchId }, { $inc: { inStockPallets: 1, totalPallets: 1 } }, { returnDocument: "after" });
      debug(patch)

      return createdRecord;


    } catch (err) {
      throw new BadRequestException(err.message);
    }

  }

  async findOne(id: mongoose.Schema.Types.ObjectId) {
    try {
      const record = await this.PalletModel.findById(id).populate(['supplier', "qualitySpecialist", "operation", "station", "product", "patch"]);
      if (!record) throw new NotFoundException("record not exists!");
      return record;
    } catch (err) {
      if (err.name === 'NotFoundException') {
        throw err
      } else {
        throw new BadRequestException(err.message);
      }
    }
  }

  async findAll() {

    try {
      return await this.PalletModel.find().populate(['supplier', "qualitySpecialist", "operation", "station", "product"]);
    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }

  async update(id: mongoose.Schema.Types.ObjectId, updateRecord: UpdatePalletDto) {
    try {
      const newRecord = await this.PalletModel.findOneAndUpdate({ "_id": id }, updateRecord, { returnDocument: "after" });
      if (!newRecord) throw new NotFoundException("record not exists!")
      return (newRecord);
    } catch (err) {
      if (err.name === "NotFoundException") {
        throw err;
      } else {
        throw new BadRequestException(err.message);
      }
    }
  }

  async fulfill(id: mongoose.Schema.Types.ObjectId) {
    try {
      // fulfill pallet
      const record = await this.PalletModel.findOneAndUpdate({ '_id': id }, { "$set": { status: palletStatus.fulfilled } }, { returnDocument: "before" });
      debug(record)
      if (!record) throw new NotFoundException("record not exists!");

      // update patch
      if (record.status == palletStatus.inStock) {
        const patchId = record.patch;
        let patch = await this.PatchModel.findOneAndUpdate({ "_id": patchId }, { $inc: { inStockPallets: -1, fullfilledPallets: 1 } }, { returnDocument: "before" });
        debug(patch);
        if (patch.inStockPallets <= 1) {
          let patch = await this.PatchModel.updateOne({ "_id": patchId }, { $set: { isFulfilled: true } });
          debug(patch);
        }
      }




      return record;
    } catch (err) {
      if (err.name === "NotFoundException") {
        throw err;
      } else {
        throw new BadRequestException(err.message);
      }
    }
  }

  async delete(id: mongoose.Schema.Types.ObjectId) {
    try {
      const deletedRecord = (await this.PalletModel.deleteOne({ '_id': id }));
      if (deletedRecord.deletedCount < 1) throw new BadRequestException("record Couldn't be deleted or not exists!");
      return deletedRecord;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
