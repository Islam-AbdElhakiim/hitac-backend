import { Injectable } from '@nestjs/common';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';
import { Station } from './schemas/station.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class StationsService {

  constructor(@InjectModel(Station.name) private stationModel: Model<Station>) { }

  async create(createStationDto: CreateStationDto) {
    const createdStation = new this.stationModel(createStationDto);
    return await createdStation.save();
  }

  async findOne(id: string) {
    return await this.stationModel.find({ "_id": id });
  }

  async findAll() {
    return await this.stationModel.find();
  }

  async update(id: string, updateStationDto: UpdateStationDto) {
    const updatedStation = new this.stationModel(updateStationDto);
    await updatedStation.save();
  }


  async hide(id: string) {
    return await this.stationModel.updateOne({ '_id': id }, { "$set": { isDeleted: true } });
  }

  async remove(id: string) {
    return await this.stationModel.deleteOne({ '_id': id });
  }

}
