import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import mongoose from 'mongoose';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.create(createAccountDto);
  }

  @Get()
  findAll() {
    return this.accountsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.accountsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: mongoose.Schema.Types.ObjectId, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountsService.update(id, updateAccountDto);
  }

  @Delete('hide/:id')
  hide(@Param('id') id: mongoose.Schema.Types.ObjectId) {
      return this.accountsService.hide(id);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: mongoose.Schema.Types.ObjectId) {
    return this.accountsService.delete(id);
  }
}
