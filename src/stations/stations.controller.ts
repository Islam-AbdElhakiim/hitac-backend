import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StationsService } from './stations.service';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';
import mongoose from 'mongoose';

@Controller('stations')
export class StationsController {
  constructor(private readonly stationsService: StationsService) { }

  @Post()
  create(@Body() createStationDto: CreateStationDto) {
    return this.stationsService.create(createStationDto);
  }

  @Get()
  findAll() {
    return this.stationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.stationsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: mongoose.Schema.Types.ObjectId, @Body() updateStationDto: UpdateStationDto) {
    return this.stationsService.update(id, updateStationDto);
  }

  @Delete('hide/:id')
  hide(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.stationsService.hide(id);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.stationsService.delete(id);
  }
}
