import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EquipmentsVariantsService } from './equipments-variants.service';
import { CreateEquipmentsVariantDto } from './dto/create-equipments-variant.dto';
import { UpdateEquipmentsVariantDto } from './dto/update-equipments-variant.dto';
import mongoose from 'mongoose';

@Controller('equipments-variants')
export class EquipmentsVariantsController {
  constructor(private readonly equipmentsVariantsService: EquipmentsVariantsService) { }

  @Post()
  create(@Body() createContactDto: CreateEquipmentsVariantDto) {
    return this.equipmentsVariantsService.create(createContactDto);
  }

  @Get(':id')
  findOne(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.equipmentsVariantsService.findOne(id);
  }

  @Get()
  findAll() {
    return this.equipmentsVariantsService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: mongoose.Schema.Types.ObjectId, @Body() updateContactDto: UpdateEquipmentsVariantDto) {
    return this.equipmentsVariantsService.update(id, updateContactDto);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.equipmentsVariantsService.delete(id);
  }
}
