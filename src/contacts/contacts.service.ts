import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Contact } from './schemas/contact.schema';
import { Model } from 'mongoose';

@Injectable()
export class ContactsService {
  constructor(@InjectModel(Contact.name) private contactModel: Model<Contact>) { }


  async create(createContactDto: CreateContactDto) {
    try {
      const createdContact = new this.contactModel(createContactDto);
      return await createdContact.save();
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  findOne(id: string) {
    return this.contactModel.find({ "_id": id });
  }

  async findAll() {
    return await this.contactModel.find();
  }


  async update(id: string, updateContactDto: UpdateContactDto) {
    const updatedContact = new this.contactModel(updateContactDto);
    await updatedContact.save();
  }

  async hide(id: string) {
    return await this.contactModel.updateOne({ '_id': id }, { "$set": { isDeleted: true } });
  }

  async remove(id: string) {
    return await this.contactModel.deleteOne({ '_id': id });
  }
}
