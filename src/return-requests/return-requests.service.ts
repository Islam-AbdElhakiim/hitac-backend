import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReturnRequestDto } from './dto/create-return-request.dto';
import { UpdateReturnRequestDto } from './dto/update-return-request.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ReturnRequest } from './schemas/return-request.schema';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class ReturnRequestsService {
  constructor(@InjectModel(ReturnRequest.name) private returnRequestModel: Model<ReturnRequest>) { }


  async create(createDto: CreateReturnRequestDto) {
    try {
      const createdRecord = new this.returnRequestModel(createDto);
      return await createdRecord.save();
    } catch (err) {
      throw new BadRequestException(err.message);
    }

  }

  async findOne(id: mongoose.Schema.Types.ObjectId) {
    try {
      const record = await this.returnRequestModel.findById(id).populate(["supplyOrder", "supplier", "createdBy", "product"]);
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
      return await this.returnRequestModel.find().populate(["supplyOrder", "supplier", "createdBy", "product"]);
    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }

  async update(id: mongoose.Schema.Types.ObjectId, updateRecord: UpdateReturnRequestDto) {
    try {
      const newRecord = await this.returnRequestModel.findOneAndUpdate({ "_id": id }, updateRecord, { returnDocument: "after" });
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

  async hide(id: mongoose.Schema.Types.ObjectId) {
    try {
      const record = await this.returnRequestModel.findOneAndUpdate({ '_id': id }, { "$set": { isDeleted: true } }, { returnDocument: "after" });
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
      const deletedRecord = (await this.returnRequestModel.deleteOne({ '_id': id }));
      if (deletedRecord.deletedCount < 1) throw new BadRequestException("record Couldn't be deleted or not exists!");
      return deletedRecord;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
