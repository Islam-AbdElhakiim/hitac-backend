import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePalletDto } from './dto/create-pallet.dto';
import { UpdatePalletDto } from './dto/update-pallet.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Pallet } from './schemas/pallet.schema';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class PalletsService {

  constructor(@InjectModel(Pallet.name) private PalletModel: Model<Pallet>) { }

  async create(createDto: CreatePalletDto) {
    try {
      const createdRecord = new this.PalletModel(createDto);
      return await createdRecord.save();
    } catch (err) {
      throw new BadRequestException(err.message);
    }

  }

  async findOne(id: mongoose.Schema.Types.ObjectId) {
    try {
      const record = await this.PalletModel.findById(id).populate(['supplier', "qualitySpecialist", "operation", "station", "product"]);
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
      const record = await this.PalletModel.findOneAndUpdate({ '_id': id }, { "$set": { isFulfilled: true } }, { returnDocument: "after" });
      if (!record) throw new NotFoundException("record not exists!");
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
