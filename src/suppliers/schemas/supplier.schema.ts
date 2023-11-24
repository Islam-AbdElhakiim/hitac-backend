import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class Supplier {
    @Prop({ required: true, lowercase: true, minlength: 3, maxlength: 15 })
    firstName: string;

    @Prop({ required: true, lowercase: true, minlength: 3, maxlength: 15 })
    lastName: string;

    @Prop({ required: true, lowercase: true })
    emails: string[];

    @Prop({ required: true, lowercase: true })
    telephones: string[];

    @Prop({ required: true, lowercase: true })
    countries: string[];

    @Prop({ required: true, lowercase: true })
    cities: string[];

    @Prop({ type: Array<mongoose.Schema.Types.ObjectId>, ref: 'Segment' })
    segments: Array<mongoose.Schema.Types.ObjectId>;

    @Prop({ type: Array<mongoose.Schema.Types.ObjectId>, ref: 'Product' })
    products: Array<mongoose.Schema.Types.ObjectId>;

    @Prop({
        type: Number,
        get: (value) => (value / 100).toFixed(2), // Convert cents to dollars for retrieval
        set: (value) => Math.round(value * 100), // Convert dollars to cents for storage
    })
    totalDebt: number;

    @Prop({ type: Array<mongoose.Schema.Types.ObjectId>, })
    transactions: string[];

    @Prop({ default: false })
    isDeleted: boolean;
}

export const SupplierSchema = SchemaFactory.createForClass(Supplier);