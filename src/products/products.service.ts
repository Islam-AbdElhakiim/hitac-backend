import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) { }

  async create(createdProductDto: CreateProductDto) {
    const createdProduct = new this.productModel(createdProductDto);
    return await createdProduct.save();
  }

  findOne(id: string) {
    return this.productModel.find({ "_id": id });
  }

  async findAll() {
    return await this.productModel.find();
  }

  async update(id: string, updatedProductDto: UpdateProductDto) {
    const updatedProduct = new this.productModel(updatedProductDto);
    await updatedProduct.save();
  }


  async hide(id: string) {
    return await this.productModel.updateOne({ '_id': id }, { "$set": { isDeleted: true } });
  }

  async remove(id: string) {
    return await this.productModel.deleteOne({ '_id': id });
  }
}
