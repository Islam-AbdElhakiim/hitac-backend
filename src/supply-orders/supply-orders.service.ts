import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSupplyOrderDto } from './dto/create-supply-order.dto';
import { UpdateSupplyOrderDto } from './dto/update-supply-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SupplyOrder } from './schemas/supply-order.schema';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class SupplyOrdersService {

  constructor(@InjectModel(SupplyOrder.name) private supplyOrderModel: Model<SupplyOrder>) { }


  async create(createDto: CreateSupplyOrderDto) {
    try {
      const createdRecord = new this.supplyOrderModel(createDto);
      return await createdRecord.save();
    } catch (err) {
      throw new BadRequestException(err.message);
    }

  }

  async findOne(id: mongoose.Schema.Types.ObjectId) {
    try {
      const record = await this.supplyOrderModel.findById(id).populate(["salesOrder", "supplier", "products", "createdBy"]);
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
      return await this.supplyOrderModel.find().populate(["salesOrder", "supplier", "products", "createdBy"]);
    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }

  async update(id: mongoose.Schema.Types.ObjectId, updateRecord: UpdateSupplyOrderDto) {
    try {
      const newRecord = await this.supplyOrderModel.findOneAndUpdate({ "_id": id }, updateRecord, { returnDocument: "after" });
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
      const record = await this.supplyOrderModel.findOneAndUpdate({ '_id': id }, { "$set": { isDeleted: true } }, { returnDocument: "after" });
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
      const deletedRecord = (await this.supplyOrderModel.deleteOne({ '_id': id }));
      if (deletedRecord.deletedCount < 1) throw new BadRequestException("record Couldn't be deleted or not exists!");
      return deletedRecord;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
