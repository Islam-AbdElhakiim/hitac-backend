import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class Account {

    @Prop({ required: true, lowercase: true, minlength: 3, maxlength: 40 })
    arabicName: string;

    @Prop({ required: true, lowercase: true, minlength: 3, maxlength: 40 })
    englishName: string;

    @Prop({ required: true, lowercase: true})
    emails: string[];

    @Prop({ required: true, lowercase: true})
    telephones: string[];
    
    @Prop({ required: true, lowercase: true})
    countries: string[];
    
    @Prop({ required: true, lowercase: true})
    cities: string[];
    
    @Prop({ required: true, lowercase: true})
    ports: string[];

    @Prop({ required: true, type: [mongoose.Schema.Types.ObjectId], ref: "Segment" })
    segments: mongoose.Schema.Types.ObjectId[];
    
    @Prop({ required: true, type: [mongoose.Schema.Types.ObjectId], })
    products: mongoose.Schema.Types.ObjectId[];
    
    @Prop({ required: true, type: [mongoose.Schema.Types.ObjectId], ref: 'Contact' })
    contacts: mongoose.Schema.Types.ObjectId[];

    @Prop({default: false})
    isDeleted:boolean;
}  

export const AccountSchema = SchemaFactory.createForClass(Account);