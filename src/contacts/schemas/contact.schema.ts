import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class Contact {

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

    @Prop({ required: true, lowercase: true })
    ports: string[];

    @Prop({ required: true, type: Array<mongoose.Schema.Types.ObjectId>, default: []})
    segments: string[];

    @Prop({ required: true, type: Array<mongoose.Schema.Types.ObjectId>, default: []})
    products: string[];

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Account' })
    account: mongoose.Schema.Types.ObjectId;

    @Prop({ default: false })
    isDeleted: boolean;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);