import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SegmentsService } from './segments.service';
import { CreateSegmentDto } from './dto/create-segment.dto';
import { UpdateSegmentDto } from './dto/update-segment.dto';

@Controller('segments')
export class SegmentsController {
  constructor(private readonly segmentsService: SegmentsService) { }

  @Post()
  create(@Body() createSegmentDto: CreateSegmentDto) {
    return this.segmentsService.create(createSegmentDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.segmentsService.findOne(id);
  }

  @Get()
  findAll() {
    return this.segmentsService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSegmentDto: UpdateSegmentDto) {
    return this.segmentsService.update(id, updateSegmentDto);
  }

  @Delete('hide/:id')
  hide(@Param('id') id: string) {
    return this.segmentsService.hide(id);
  }

  @Delete('delete:id')
  remove(@Param('id') id: string) {
    return this.segmentsService.remove(id);
  }

}
