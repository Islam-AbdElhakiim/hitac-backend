import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Account } from './schemas/account.schema';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class AccountsService {
	constructor(@InjectModel(Account.name) private accountModel: Model<Account>) { }

	async create(createAccountDto: CreateAccountDto) {
		try {
			const createdAccount = new this.accountModel(createAccountDto);
			return await createdAccount.save();
		} catch (err) {
			throw new BadRequestException(err.message);
		}

	}

	async findOne(id: mongoose.Schema.Types.ObjectId) {
		try {
			const user = await this.accountModel.findById(id).populate(["contacts", "segments"]);
			if (!user) {
				throw new NotFoundException("account not exists!");
			}
			return user;
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
			return await this.accountModel.find().populate(["contacts", "segments"]);

		} catch (err) {
			throw new BadRequestException(err.message)
		}
	}

	async update(id: mongoose.Schema.Types.ObjectId, updateAccountDto: UpdateAccountDto) {
		try {
			if (!updateAccountDto._id) updateAccountDto._id = id;

			const account = await this.accountModel.findOneAndUpdate({ "_id": id }, updateAccountDto, { returnDocument: "after" });
			if (!account) throw new NotFoundException("account not exists!")
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
			const account = await this.accountModel.findOneAndUpdate({ '_id': id }, { "$set": { isDeleted: true } }, { returnDocument: "after" });
			if (!account) throw new NotFoundException("account not exists!");
			return account;
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
			const deletedRecord = (await this.accountModel.deleteOne({ '_id': id }));
			if (deletedRecord.deletedCount < 1) throw new BadRequestException("account Couldn't be deleted or not exists!");
			return deletedRecord;
		} catch (err) {
			throw new BadRequestException(err.message);
		}
	}

}
