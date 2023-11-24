import mongoose from "mongoose";

export class UpdateSupplyOrderDto {

    salesOrder: mongoose.Schema.Types.ObjectId;

    supplier: mongoose.Schema.Types.ObjectId;

    products: mongoose.Schema.Types.ObjectId[];

    price: number

    description: string;

    createdOn: Date;

    createdBy: mongoose.Schema.Types.ObjectId;

    transactions: mongoose.Schema.Types.ObjectId[];

    isDeleted: boolean;

}
