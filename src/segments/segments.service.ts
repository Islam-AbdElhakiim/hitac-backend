import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSegmentDto } from './dto/create-segment.dto';
import { UpdateSegmentDto } from './dto/update-segment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Segment } from './schemas/segment.schema';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class SegmentsService {

  constructor(@InjectModel(Segment.name) private segmentModel: Model<Segment>) { }

  async create(CreCreateSegmentDto: CreateSegmentDto) {
    try {
      const createdSegment = new this.segmentModel(CreCreateSegmentDto);
      return await createdSegment.save();
    } catch (err) {
      throw new BadRequestException(err.message);
    }

  }

  async findOne(id: mongoose.Schema.Types.ObjectId) {
    try {
      const segment = await this.segmentModel.findById(id);
      if (!segment) {
        throw new NotFoundException("segment not exists!");
      }
      return segment;
    } catch (err) {
      if (err.name === 'NotFoundException') {
        throw err
      } else {
        throw new BadRequestException(err.message);
      }
    }
  }

  async findAll() {

    try {
      return await this.segmentModel.find();
    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }

  async update(id: mongoose.Schema.Types.ObjectId, updateSegmentDto: UpdateSegmentDto) {
    try {
      const segment = await this.segmentModel.findOneAndUpdate({ "_id": id }, updateSegmentDto, { returnDocument: "after" });
      if (!segment) throw new NotFoundException("segment not exists!")
      return (segment);
    } catch (err) {
      if (err.name === "NotFoundException") {
        throw err;
      } else {
        throw new BadRequestException(err.message);
      }
    }
  }

  async hide(id: mongoose.Schema.Types.ObjectId) {
    try {
      const segment = await this.segmentModel.findOneAndUpdate({ '_id': id }, { "$set": { isDeleted: true } }, { returnDocument: "after" });
      if (!segment) throw new NotFoundException("segment not exists!");
      return segment;
    } catch (err) {
      if (err.name === "NotFoundException") {
        throw err;
      } else {
        throw new BadRequestException(err.message);
      }
    }
  }

  async delete(id: mongoose.Schema.Types.ObjectId) {
    try {
      const deletedRecord = (await this.segmentModel.deleteOne({ '_id': id }));
      if (deletedRecord.deletedCount < 1) throw new BadRequestException("record Couldn't be deleted or not exists!");
      return deletedRecord;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
