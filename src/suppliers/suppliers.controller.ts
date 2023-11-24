import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import mongoose from 'mongoose';

@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) { }

  @Post()
  create(@Body() createSupplierDto: CreateSupplierDto) {
    return this.suppliersService.create(createSupplierDto);
  }

  @Get()
  findAll() {
    return this.suppliersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.suppliersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: mongoose.Schema.Types.ObjectId, @Body() updateSupplierDto: UpdateSupplierDto) {
    return this.suppliersService.update(id, updateSupplierDto);
  }

  @Delete('hide/:id')
  hide(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.suppliersService.hide(id);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.suppliersService.delete(id);
  }
}
