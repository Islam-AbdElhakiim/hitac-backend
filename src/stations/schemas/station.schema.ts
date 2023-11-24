import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class Station {

    @Prop({ required: true, lowercase: true, minlength: 3, maxlength: 40 })
    arabicName: string;

    @Prop({ required: true, lowercase: true, minlength: 3, maxlength: 40 })
    englishName: string;

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

    @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Product' })
    products: Array<mongoose.Schema.Types.ObjectId>;

    @Prop({ type: Number, })
    totalDebt: number;

    @Prop({ lowercase: true })
    transactions: Array<mongoose.Schema.Types.ObjectId>;

    @Prop({ default: false })
    isDeleted: boolean;
}

export const StationSchema = SchemaFactory.createForClass(Station);