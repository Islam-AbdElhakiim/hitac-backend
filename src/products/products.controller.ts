import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import mongoose from 'mongoose';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: mongoose.Schema.Types.ObjectId, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete('hide/:id')
  hide(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.productsService.hide(id);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.productsService.delete(id);
  }
}
