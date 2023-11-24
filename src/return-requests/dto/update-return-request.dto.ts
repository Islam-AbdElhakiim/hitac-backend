import mongoose from "mongoose";

export class UpdateReturnRequestDto {
    supplyOrder: mongoose.Schema.Types.ObjectId;

    supplier: mongoose.Schema.Types.ObjectId;

    product: mongoose.Schema.Types.ObjectId;

    price: number

    description: string;

    createdOn: Date;

    createdBy: mongoose.Schema.Types.ObjectId;

    transactions: mongoose.Schema.Types.ObjectId[];

    isDeleted: boolean;

}
