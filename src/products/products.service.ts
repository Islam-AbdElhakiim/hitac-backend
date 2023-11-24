import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Product } from './schemas/product.schema';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) { }


  async create(createDto: CreateProductDto) {
    try {
      const createdRecord = new this.productModel(createDto);
      return await createdRecord.save();
    } catch (err) {
      throw new BadRequestException(err.message);
    }

  }

  async findOne(id: mongoose.Schema.Types.ObjectId) {
    try {
      const record = await this.productModel.findById(id).populate(["segment"]);
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
      return await this.productModel.find().populate(["segment"]);
    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }

  async update(id: mongoose.Schema.Types.ObjectId, updateRecord: UpdateProductDto) {
    try {
      const newRecord = await this.productModel.findOneAndUpdate({ "_id": id }, updateRecord, { returnDocument: "after" });
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
      const record = await this.productModel.findOneAndUpdate({ '_id': id }, { "$set": { isDeleted: true } }, { returnDocument: "after" });
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
      const deletedRecord = (await this.productModel.deleteOne({ '_id': id }));
      if (deletedRecord.deletedCount < 1) throw new BadRequestException("record Couldn't be deleted or not exists!");
      return deletedRecord;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
