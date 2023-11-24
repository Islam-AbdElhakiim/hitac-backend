import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SupplyOrdersService } from './supply-orders.service';
import { CreateSupplyOrderDto } from './dto/create-supply-order.dto';
import { UpdateSupplyOrderDto } from './dto/update-supply-order.dto';
import mongoose from 'mongoose';

@Controller('supply-orders')
export class SupplyOrdersController {
  constructor(private readonly supplyOrdersService: SupplyOrdersService) { }

  @Post()
  create(@Body() createStationDto: CreateSupplyOrderDto) {
    return this.supplyOrdersService.create(createStationDto);
  }

  @Get()
  findAll() {
    return this.supplyOrdersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.supplyOrdersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: mongoose.Schema.Types.ObjectId, @Body() updateStationDto: UpdateSupplyOrderDto) {
    return this.supplyOrdersService.update(id, updateStationDto);
  }

  @Delete('hide/:id')
  hide(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.supplyOrdersService.hide(id);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.supplyOrdersService.delete(id);
  }
}
