import { Injectable } from '@nestjs/common';
import { CreateSegmentDto } from './dto/create-segment.dto';
import { UpdateSegmentDto } from './dto/update-segment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Segment } from './schemas/segment.schema';
import { Model } from 'mongoose';

@Injectable()
export class SegmentsService {
  
  constructor(@InjectModel(Segment.name) private segmentModel: Model<Segment>) { }

  async create(createdSegmentDto: CreateSegmentDto) {
    const createdSegment = new this.segmentModel(createdSegmentDto);
    return await createdSegment.save();
  }

  findOne(id: string) {
    return this.segmentModel.find({ "_id": id });
  }

  async findAll() {
    return await this.segmentModel.find();
  }

  async update(id: string, updatedSegmentDto: UpdateSegmentDto) {
    const updatedSegment = new this.segmentModel(updatedSegmentDto);
    await updatedSegment.save();
  }


  async hide(id: string) {
    return await this.segmentModel.updateOne({ '_id': id }, { "$set": { isDeleted: true } });
  }

  async remove(id: string) {
    return await this.segmentModel.deleteOne({ '_id': id });
  }
}
