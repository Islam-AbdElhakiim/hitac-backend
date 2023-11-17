import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Account } from './schemas/account.schema';
import { Model } from 'mongoose';

@Injectable()
export class AccountsService {
  constructor(@InjectModel(Account.name) private accountModel: Model<Account>) { }

  async create(createAccountDto: CreateAccountDto) {
    const createdAccount = new this.accountModel(createAccountDto);
    return await createdAccount.save();
  }

  async findOne(id: string) {
    return this.accountModel.find({ "_id": id });
  }

  async findAll() {
    return await this.accountModel.find();
  }

  async update(id: string, updateAccountDto: UpdateAccountDto) {
    const updatedAccount = new this.accountModel(updateAccountDto);
    await updatedAccount.save();
  }


  async hide(id: string) {
    return await this.accountModel.updateOne({ '_id': id }, { "$set": { isDeleted: true } });
  }

  async remove(id: string) {
    return await this.accountModel.deleteOne({ '_id': id });
  }

}
