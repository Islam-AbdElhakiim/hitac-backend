import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';
import { Station } from './schemas/station.schema';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class StationsService {

  constructor(@InjectModel(Station.name) private stationModel: Model<Station>) { }


  async create(createDto: CreateStationDto) {
    try {
      const createdRecord = new this.stationModel(createDto);
      return await createdRecord.save();
    } catch (err) {
      throw new BadRequestException(err.message);
    }

  }

  async findOne(id: mongoose.Schema.Types.ObjectId) {
    try {
      const record = await this.stationModel.findById(id).populate(["segments", "products"]);
      if (!record) throw new NotFoundException("record not exists!");
      return record;
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
      return await this.stationModel.find().populate(["segments", "products"]);
    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }

  async update(id: mongoose.Schema.Types.ObjectId, updateRecord: UpdateStationDto) {
    try {
      const newRecord = await this.stationModel.findOneAndUpdate({ "_id": id }, updateRecord, { returnDocument: "after" });
      if (!newRecord) throw new NotFoundException("record not exists!")
      return (newRecord);
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
      const record = await this.stationModel.findOneAndUpdate({ '_id': id }, { "$set": { isDeleted: true } }, { returnDocument: "after" });
      if (!record) throw new NotFoundException("record not exists!");
      return record;
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
      const deletedRecord = (await this.stationModel.deleteOne({ '_id': id }));
      if (deletedRecord.deletedCount < 1) throw new BadRequestException("record Couldn't be deleted or not exists!");
      return deletedRecord;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

}
