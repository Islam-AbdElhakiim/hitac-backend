import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class ReturnRequest {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'SupplyOrder' })
    supplyOrder: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' })
    supplier: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
    product: string;

    @Prop({
        type: Number,
    },)
    price: number;

    @Prop({ lowercase: true })
    description: string;

    @Prop({ required: true })
    createdOn: Date;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Employee' })
    createdBy: mongoose.Schema.Types.ObjectId;

    @Prop({ type: Array<mongoose.Schema.Types.ObjectId> })
    transactions: mongoose.Schema.Types.ObjectId[];

    @Prop({required: true, default: false})
    isDeleted: boolean;

}

export const ReturnRequestSchema = SchemaFactory.createForClass(ReturnRequest);