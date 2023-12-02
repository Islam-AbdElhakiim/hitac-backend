import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PatchesService } from './patches.service';
import { CreatePatchDto } from './dto/create-patch.dto';
import { UpdatePatchDto } from './dto/update-patch.dto';
import mongoose from 'mongoose';

@Controller('patches')
export class PatchesController {
  constructor(private readonly patchesService: PatchesService) { }

  @Post()
  create(@Body() createStationDto: CreatePatchDto) {
    return this.patchesService.create(createStationDto);
  }

  @Get()
  findAll() {
    return this.patchesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.patchesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: mongoose.Schema.Types.ObjectId, @Body() updateStationDto: UpdatePatchDto) {
    return this.patchesService.update(id, updateStationDto);
  }

  @Patch('fulfill/:id')
  fulfill(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.patchesService.fulfill(id);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.patchesService.delete(id);
  }
}
