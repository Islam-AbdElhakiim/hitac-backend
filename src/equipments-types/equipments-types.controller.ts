import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EquipmentsTypesService } from './equipments-types.service';
import { CreateEquipmentsTypeDto } from './dto/create-equipments-type.dto';
import { UpdateEquipmentsTypeDto } from './dto/update-equipments-type.dto';
import mongoose from 'mongoose';

@Controller('equipments-types')
export class EquipmentsTypesController {
  constructor(private readonly equipmentsTypesService: EquipmentsTypesService) { }

  @Post()
  create(@Body() createContactDto: CreateEquipmentsTypeDto) {
    return this.equipmentsTypesService.create(createContactDto);
  }

  @Get(':id')
  findOne(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.equipmentsTypesService.findOne(id);
  }

  @Get()
  findAll() {
    return this.equipmentsTypesService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: mongoose.Schema.Types.ObjectId, @Body() updateContactDto: UpdateEquipmentsTypeDto) {
    return this.equipmentsTypesService.update(id, updateContactDto);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.equipmentsTypesService.delete(id);
  }
}
