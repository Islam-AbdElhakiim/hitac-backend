import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Supplier } from './schemas/supplier.schema';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class SuppliersService {
  constructor(@InjectModel(Supplier.name) private supplierModel: Model<Supplier>) { }


  async create(createSuppliertDto: CreateSupplierDto) {
    try {
      const createdSupplier = new this.supplierModel(createSuppliertDto);
      return await createdSupplier.save();
    } catch (err) {
      throw new BadRequestException(err.message);
    }

  }

  async findOne(id: mongoose.Schema.Types.ObjectId) {
    try {
      const user = await this.supplierModel.findById(id).populate(["segments", "products", "transactions"]);
      if (!user) {
        throw new NotFoundException("supplier not exists!");
      }
      return user;
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
      return await this.supplierModel.find().populate(["segments", "products", "transactions"]);

    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }

  async update(id: mongoose.Schema.Types.ObjectId, updateSuppliertDto: UpdateSupplierDto) {
    try {
      const supplier = await this.supplierModel.findOneAndUpdate({ "_id": id }, updateSuppliertDto, { returnDocument: "after" });
      if (!supplier) throw new NotFoundException("supplier not exists!")
      return (supplier);
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
      const supplier = await this.supplierModel.findOneAndUpdate({ '_id': id }, { "$set": { isDeleted: true } }, { returnDocument: "after" });
      if (!supplier) throw new NotFoundException("supplier not exists!");
      return supplier;
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
      const supplier = (await this.supplierModel.deleteOne({ '_id': id }));
      if (supplier.deletedCount < 1) throw new BadRequestException("record Couldn't be deleted or not exists!");
      return supplier;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
