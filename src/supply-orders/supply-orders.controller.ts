import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SupplyOrdersService } from './supply-orders.service';
import { CreateSupplyOrderDto } from './dto/create-supply-order.dto';
import { UpdateSupplyOrderDto } from './dto/update-supply-order.dto';

@Controller('supply-orders')
export class SupplyOrdersController {
  constructor(private readonly supplyOrdersService: SupplyOrdersService) {}

  @Post()
  create(@Body() createSupplyOrderDto: CreateSupplyOrderDto) {
    return this.supplyOrdersService.create(createSupplyOrderDto);
  }

  @Get()
  findAll() {
    return this.supplyOrdersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supplyOrdersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSupplyOrderDto: UpdateSupplyOrderDto) {
    return this.supplyOrdersService.update(id, updateSupplyOrderDto);
  }
  
  @Delete('hide/:id')
  hide(@Param('id') id: string) {
    return this.supplyOrdersService.hide(id);
  }
  
  @Delete('delete:id')
  remove(@Param('id') id: string) {
    return this.supplyOrdersService.remove(id);
  }
}
