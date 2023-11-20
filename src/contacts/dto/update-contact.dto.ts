import mongoose from "mongoose";

export class UpdateContactDto {
    _id: mongoose.Schema.Types.ObjectId;

    firstName: string;

    lastName: string;

    emails: string[];

    telephones: string[];

    countries: string[];

    cities: string[];

    ports: string[];

    account: string;

    segments: string[];

    products: string[];

    isDeleted: boolean;
}
