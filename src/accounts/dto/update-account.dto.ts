import mongoose from "mongoose";

export class UpdateAccountDto {
    _id: mongoose.Schema.Types.ObjectId;

    arabicName: string;

    englishName: string;

    emails: string[];

    telephones: string[];

    countries: string[];

    cities: string[];

    ports: string[];

    addresses: string[];

    website: string;

    segments: mongoose.Types.ObjectId[];

    products: mongoose.Types.ObjectId[];

    contacts: mongoose.Types.ObjectId[];

    isDeleted: boolean;
}
