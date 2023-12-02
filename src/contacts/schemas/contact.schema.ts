import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class Contact {

    @Prop({ required: true, lowercase: true, minlength: 3, maxlength: 15 })
    firstName: string;

    @Prop({ required: true, lowercase: true, minlength: 3, maxlength: 15 })
    lastName: string;

    @Prop({ lowercase: true, default: [] })
    emails: string[];

    @Prop({ lowercase: true, default: [] })
    telephones: string[];

    @Prop({ required: true, lowercase: true })
    countries: string[];

    @Prop({ required: true, lowercase: true })
    cities: string[];

    @Prop({ required: true, lowercase: true })
    ports: string[];

    @Prop({ lowercase: true, default: "" })
    notes: string;

    @Prop({ default: [] })
    websites: string[];

    @Prop({ type: Array<mongoose.Schema.Types.ObjectId>, default: [] })
    segments: string[];

    @Prop({ type: Array<mongoose.Schema.Types.ObjectId>, default: [] })
    products: string[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Account', default: null })
    account: mongoose.Schema.Types.ObjectId;

    @Prop({ default: false })
    isDeleted: boolean;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);