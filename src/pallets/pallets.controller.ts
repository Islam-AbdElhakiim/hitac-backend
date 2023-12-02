import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PalletsService } from './pallets.service';
import { CreatePalletDto } from './dto/create-pallet.dto';
import { UpdatePalletDto } from './dto/update-pallet.dto';
import mongoose from 'mongoose';

@Controller('pallets')
export class PalletsController {
  constructor(private readonly palletsService: PalletsService) {}

  @Post()
  create(@Body() createStationDto: CreatePalletDto) {
    return this.palletsService.create(createStationDto);
  }

  @Get()
  findAll() {
    return this.palletsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.palletsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: mongoose.Schema.Types.ObjectId, @Body() updateStationDto: UpdatePalletDto) {
    return this.palletsService.update(id, updateStationDto);
  }

  @Patch('fulfill/:id')
  fulfill(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.palletsService.fulfill(id);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.palletsService.delete(id);
  }
}
