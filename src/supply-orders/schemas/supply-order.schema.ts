import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class SupplyOrder {

    @Prop({ type: Array<mongoose.Schema.Types.ObjectId>, required: true, default: []})
    salesOrder: Array<mongoose.Schema.Types.ObjectId>;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' })
    supplier: mongoose.Schema.Types.ObjectId;

    @Prop({ type: Array<mongoose.Schema.Types.ObjectId>, ref: 'Product' })
    products: mongoose.Schema.Types.ObjectId;

    @Prop({ type: Number })
    price: number;

    @Prop({ lowercase: true })
    description: string;

    @Prop({ required: true })
    createdOn: Date;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Employee' })
    createdBy: mongoose.Schema.Types.ObjectId;

    @Prop({ type: Array<mongoose.Schema.Types.ObjectId>, })
    transactions: mongoose.Schema.Types.ObjectId[];

    @Prop({required: true, default: false})
    isDeleted: boolean;
}

export const SupplyOrderSchema = SchemaFactory.createForClass(SupplyOrder);