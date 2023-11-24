import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, BadRequestException } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import mongoose from 'mongoose';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) { }

  @Post() 
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactsService.create(createContactDto);
  }

  @Get(':id')
  findOne(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.contactsService.findOne(id);
  }

  @Get()
  findAll() {
    return this.contactsService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: mongoose.Schema.Types.ObjectId, @Body() updateContactDto: UpdateContactDto) {
    return this.contactsService.update(id, updateContactDto);
  }

  @Delete('hide/:id')
  hide(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.contactsService.hide(id);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.contactsService.delete(id);
  }
}
