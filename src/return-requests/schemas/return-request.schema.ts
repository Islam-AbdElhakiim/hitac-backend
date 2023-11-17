import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class ReturnRequest {
    // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'salesOrders' })
    @Prop()
    supplyOrder: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'suppliers' })
    supplier: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'products' })
    product: string;

    @Prop({ required: true })
    price: number;

    @Prop({ lowercase: true })
    description: string;

    @Prop({ required: true })
    createdOn: Date;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'employees' })
    createdBy: string;

    // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'transactions' })
    @Prop()
    transactions: [string];
}

export const ReturnRequestSchema = SchemaFactory.createForClass(ReturnRequest);