import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReturnRequestsService } from './return-requests.service';
import { CreateReturnRequestDto } from './dto/create-return-request.dto';
import { UpdateReturnRequestDto } from './dto/update-return-request.dto';
import mongoose from 'mongoose';

@Controller('return-requests')
export class ReturnRequestsController {
  constructor(private readonly returnRequestsService: ReturnRequestsService) { }

  @Post()
  create(@Body() createDto: CreateReturnRequestDto) {
    return this.returnRequestsService.create(createDto);
  }

  @Get()
  findAll() {
    return this.returnRequestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.returnRequestsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: mongoose.Schema.Types.ObjectId, @Body() updateDto: UpdateReturnRequestDto) {
    return this.returnRequestsService.update(id, updateDto);
  }

  @Delete('hide/:id')
  hide(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.returnRequestsService.hide(id);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.returnRequestsService.delete(id);
  }
}
