import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Contact } from './schemas/contact.schema';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class ContactsService {
  constructor(@InjectModel(Contact.name) private contactModel: Model<Contact>) { }


  async create(CreateContactDto: CreateContactDto) {
    try {
      const createdContact = new this.contactModel(CreateContactDto);
      return await createdContact.save();
    } catch (err) {
      throw new BadRequestException(err.message);
    }

  }

  async findOne(id: mongoose.Schema.Types.ObjectId) {
    try {
      const contact = await this.contactModel.findById(id).populate("account");
      if (!contact) throw new NotFoundException("contact not exists!");
      return contact;
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
      return await this.contactModel.find();
    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }

  async update(id: mongoose.Schema.Types.ObjectId, updateContactDto: UpdateContactDto) {
    try {
      //if (!updateContactDto._id) updateContactDto._id = id;

      const account = await this.contactModel.findOneAndUpdate({ "_id": id }, updateContactDto, { returnDocument: "after" });
      if (!account) throw new NotFoundException("contact not exists!")
      return (account);
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
      const contact = await this.contactModel.findOneAndUpdate({ '_id': id }, { "$set": { isDeleted: true } }, { returnDocument: "after" });
      if (!contact) throw new NotFoundException("contact not exists!");
      return contact;
    } catch (err) {
      if (err.name === "NotFoundException") {
        throw err;
      } else {
        throw new BadRequestException(err.message);
      }
    }
  }

  async remove(id: mongoose.Schema.Types.ObjectId) {
    try {
      const contact = await this.contactModel.findOneAndDelete({ '_id': id });
      if (!contact) throw new NotFoundException("contact not exists!");
      return contact;
    } catch (err) {
      if (err.name === "NotFoundException") {
        throw err;
      } else {
        throw new BadRequestException(err.message);
      }
    }
  }
}
