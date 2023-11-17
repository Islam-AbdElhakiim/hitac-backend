import { Injectable } from '@nestjs/common';
import { CreateSupplyOrderDto } from './dto/create-supply-order.dto';
import { UpdateSupplyOrderDto } from './dto/update-supply-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SupplyOrder } from './schemas/supply-order.schema';
import { Model } from 'mongoose';

@Injectable()
export class SupplyOrdersService {
  
  constructor(@InjectModel(SupplyOrder.name) private supplyOrderModel: Model<SupplyOrder>) { }

  async create(createdSupplyOrderDto: CreateSupplyOrderDto) {
    const createdSupplyOrder = new this.supplyOrderModel(createdSupplyOrderDto);
    return await createdSupplyOrder.save();
  }

  findOne(id: string) {
    return this.supplyOrderModel.find({ "_id": id });
  }

  async findAll() {
    return await this.supplyOrderModel.find();
  }

  async update(id: string, updatedSupplyOrderDto: UpdateSupplyOrderDto) {
    const updatedSupplyOrder = new this.supplyOrderModel(updatedSupplyOrderDto);
    await updatedSupplyOrder.save();
  }


  async hide(id: string) {
    return await this.supplyOrderModel.updateOne({ '_id': id }, { "$set": { isDeleted: true } });
  }

  async remove(id: string) {
    return await this.supplyOrderModel.deleteOne({ '_id': id });
  }
}
