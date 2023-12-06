import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEquipmentsVariantDto } from './dto/create-equipments-variant.dto';
import { UpdateEquipmentsVariantDto } from './dto/update-equipments-variant.dto';
import { InjectModel } from '@nestjs/mongoose';
import { EquipmentsVariant } from './schema/equipments-variant.schema';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class EquipmentsVariantsService {
  constructor(@InjectModel(EquipmentsVariant.name) private EquipmentsVariantModel: Model<EquipmentsVariant>) { }

  async create(createDto: CreateEquipmentsVariantDto) {

    try {
      const createdRecord = new this.EquipmentsVariantModel(createDto);
      return await createdRecord.save();
    } catch (err) {
      throw new BadRequestException(err.message);
    }

  }

  async findOne(id: mongoose.Schema.Types.ObjectId) {
    try {
      const record = await this.EquipmentsVariantModel.findById(id);
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
      return await this.EquipmentsVariantModel.find();
    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }

  async update(id: mongoose.Schema.Types.ObjectId, updateRecord: UpdateEquipmentsVariantDto) {
    try {
      const newRecord = await this.EquipmentsVariantModel.findOneAndUpdate({ "_id": id }, updateRecord, { returnDocument: "after" });
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
  //     const record = await this.EquipmentsVariantModel.findOneAndUpdate({ '_id': id }, { "$set": { status: palletStatus.fulfilled } }, { returnDocument: "before" });
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
      const deletedRecord = (await this.EquipmentsVariantModel.deleteOne({ '_id': id }));
      if (deletedRecord.deletedCount < 1) throw new BadRequestException("record Couldn't be deleted or not exists!");
      return deletedRecord;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
