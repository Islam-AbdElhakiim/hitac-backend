import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatchDto } from './dto/create-patch.dto';
import { UpdatePatchDto } from './dto/update-patch.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Patch } from './schemas/patch.schema';
const debug = require('debug')('app:resource');

@Injectable()
export class PatchesService {

  constructor(@InjectModel(Patch.name) private PatchModel: Model<Patch>) { }


  async create(createDto: CreatePatchDto) {
    try {
      const createdRecord = new this.PatchModel(createDto);
      return await createdRecord.save();
    } catch (err) {
      throw new BadRequestException(err.message);
    }

  }

  async findOne(id: mongoose.Schema.Types.ObjectId) {
    try {
      const record = await this.PatchModel.findById(id).populate(['suppliers', "qualitySpecialist", "operation", "station", "products", "pallets"]);
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
      return await this.PatchModel.find().populate(['suppliers', "qualitySpecialist", "operation", "station", "products", "pallets"])
    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }

  async update(id: mongoose.Schema.Types.ObjectId, updateRecord: UpdatePatchDto) {
    try {
      const newRecord = await this.PatchModel.findOneAndUpdate({ "_id": id }, updateRecord, { returnDocument: "after" });
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
      const record = await this.PatchModel.findOneAndUpdate({ '_id': id }, { "$set": { isFulfilled: true } }, { returnDocument: "after" });
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
      const deletedRecord = (await this.PatchModel.deleteOne({ '_id': id }));
      if (deletedRecord.deletedCount < 1) throw new BadRequestException("record Couldn't be deleted or not exists!");
      return deletedRecord;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
