import mongoose from "mongoose";

export class UpdateSupplierDto {
    firstName: string;

    lastName: string;

    emails: string[];

    telephones: string[];

    countries: string[];

    cities: string[];

    notes: string;

    totalDebt: number;

    segments: mongoose.Schema.Types.ObjectId[];

    products: mongoose.Schema.Types.ObjectId[];

    isDeleted: boolean;

    transactions: mongoose.Schema.Types.ObjectId[];
}
