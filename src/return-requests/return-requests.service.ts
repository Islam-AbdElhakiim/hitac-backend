import { Injectable } from '@nestjs/common';
import { CreateReturnRequestDto } from './dto/create-return-request.dto';
import { UpdateReturnRequestDto } from './dto/update-return-request.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ReturnRequest } from './schemas/return-request.schema';
import { Model } from 'mongoose';

@Injectable()
export class ReturnRequestsService {
  constructor(@InjectModel(ReturnRequest.name) private returnRequestModel: Model<ReturnRequest>) { }

  async create(returnRequestDto: CreateReturnRequestDto) {
    const createReturnRequest = new this.returnRequestModel(returnRequestDto);
    return await createReturnRequest.save();
  }

  findOne(id: string) {
    return this.returnRequestModel.find({ "_id": id });
  }

  async findAll() {
    return await this.returnRequestModel.find();
  }

  async update(id: string, updatedReturnRequestDto: UpdateReturnRequestDto) {
    const updatedReturnRequest = new this.returnRequestModel(updatedReturnRequestDto);
    await updatedReturnRequest.save();
  }


  async hide(id: string) {
    return await this.returnRequestModel.updateOne({ '_id': id }, { "$set": { isDeleted: true } });
  }

  async remove(id: string) {
    return await this.returnRequestModel.deleteOne({ '_id': id });
  }
}
