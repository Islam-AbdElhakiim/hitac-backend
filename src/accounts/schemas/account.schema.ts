import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class Account {

    @Prop({ required: true, lowercase: true, minlength: 3, maxlength: 40 })
    arabicName: string;

    @Prop({ required: true, lowercase: true, minlength: 3, maxlength: 40 })
    englishName: string;

    @Prop({ required: true, lowercase: true, default: []  })
    emails: string[];

    @Prop({ required: true, lowercase: true , default: [] })
    telephones: string[];

    @Prop({ required: true, lowercase: true, default: []  })
    countries: string[];

    @Prop({ required: true, lowercase: true, default: [] })
    cities: string[];

    @Prop({ required: true, lowercase: true, default: [] })
    addresses: string[];

    @Prop({ lowercase: true , default: ""})
    website: string;

    @Prop({ required: true, lowercase: true, default: [] })
    ports: string[];

    @Prop({type: [mongoose.Schema.Types.ObjectId], ref: "Segment", default: [] })
    segments: mongoose.Schema.Types.ObjectId[];

    @Prop({ type: [mongoose.Schema.Types.ObjectId], default: []})
    products: mongoose.Schema.Types.ObjectId[];

    @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Contact', default: [] })
    contacts: mongoose.Schema.Types.ObjectId[];

    @Prop({ default: false })
    isDeleted: boolean;
}

export const AccountSchema = SchemaFactory.createForClass(Account);