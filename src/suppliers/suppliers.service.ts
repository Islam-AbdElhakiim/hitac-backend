import { Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Supplier } from './schemas/supplier.schema';
import { Model } from 'mongoose';

@Injectable()
export class SuppliersService {
  constructor(@InjectModel(Supplier.name) private supplierModel: Model<Supplier>) { }

  async create(createSupplierDto: CreateSupplierDto) {
    const createdSupplier = new this.supplierModel(createSupplierDto);
    return await createdSupplier.save();
  }

  findOne(id: string) {
    return this.supplierModel.find({ "_id": id });
  }

  async findAll() {
    return await this.supplierModel.find();
  }

  async update(id: string, updateSupplierDto: UpdateSupplierDto) {
    const updatedSupplier = new this.supplierModel(updateSupplierDto);
    await updatedSupplier.save();
  }


  async hide(id: string) {
    return await this.supplierModel.updateOne({ '_id': id }, { "$set": { isDeleted: true } });
  }

  async remove(id: string) {
    return await this.supplierModel.deleteOne({ '_id': id });
  }
}
