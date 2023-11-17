import { Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Session } from './schemas/session.schema';
import { Model } from 'mongoose';

@Injectable()
export class SessionsService {
  constructor(@InjectModel(Session.name) private sessinoModel: Model<Session>) { }

  async create(createSessionDto: CreateSessionDto) {

    //create the session
    console.log("before creating session => sessions")
    const session = new this.sessinoModel<Session>(createSessionDto);
    const saved = await session.save();
    console.log("after creating session")
    return saved._id; 
  }

  findAll() {
    return `This action returns all sessions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} session`;
  }

  update(id: number, updateSessionDto: UpdateSessionDto) {
    return `This action updates a #${id} session`;
  }

  remove(id: number) {
    return `This action removes a #${id} session`;
  }
}
