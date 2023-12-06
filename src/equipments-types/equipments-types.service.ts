import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEquipmentsTypeDto } from './dto/create-equipments-type.dto';
import { UpdateEquipmentsTypeDto } from './dto/update-equipments-type.dto';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { EquimpentsType } from './schema/equipments-type.schema';
const debug = require('debug')('resource');

@Injectable()
export class EquipmentsTypesService {
  constructor(@InjectModel(EquimpentsType.name) private EquipmentsTypeModel: Model<EquimpentsType>) { }

  async create(createDto: CreateEquipmentsTypeDto) {
    
    try {
      const createdRecord = new this.EquipmentsTypeModel(createDto);
      return await createdRecord.save();
    } catch (err) {
      throw new BadRequestException(err.message);
    }

  }

  async findOne(id: mongoose.Schema.Types.ObjectId) {
    try {
      const record = await this.EquipmentsTypeModel.findById(id);
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
      return await this.EquipmentsTypeModel.find();
    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }

  async update(id: mongoose.Schema.Types.ObjectId, updateRecord: UpdateEquipmentsTypeDto) {
    try {
      const newRecord = await this.EquipmentsTypeModel.findOneAndUpdate({ "_id": id }, updateRecord, { returnDocument: "after" });
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

  // async fulfill(id: mongoose.Schema.Types.ObjectId) {
  //   try {
  //     // fulfill pallet
  //     const record = await this.EquipmentsTypeModel.findOneAndUpdate({ '_id': id }, { "$set": { status: palletStatus.fulfilled } }, { returnDocument: "before" });
  //     debug(record)
  //     if (!record) throw new NotFoundException("record not exists!");

  //     // update patch
  //     if (record.status == palletStatus.inStock) {
  //       const patchId = record.patch;
  //       let patch = await this.PatchModel.findOneAndUpdate({ "_id": patchId }, { $inc: { inStockPallets: -1, fullfilledPallets: 1 } }, { returnDocument: "before" });
  //       debug(patch);
  //       if (patch.inStockPallets <= 1) {
  //         let patch = await this.PatchModel.updateOne({ "_id": patchId }, { $set: { isFulfilled: true } });
  //         debug(patch);
  //       }
  //     }




  //     return record;
  //   } catch (err) {
  //     if (err.name === "NotFoundException") {
  //       throw err;
  //     } else {
  //       throw new BadRequestException(err.message);
  //     }
  //   }
  // }

  async delete(id: mongoose.Schema.Types.ObjectId) {
    try {
      const deletedRecord = (await this.EquipmentsTypeModel.deleteOne({ '_id': id }));
      if (deletedRecord.deletedCount < 1) throw new BadRequestException("record Couldn't be deleted or not exists!");
      return deletedRecord;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
