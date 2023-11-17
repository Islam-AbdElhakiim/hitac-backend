import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class Supplier {
    @Prop({ required: true, lowercase: true, minlength: 3, maxlength: 15 })
    firstName: string;

    @Prop({ required: true, lowercase: true, minlength: 3, maxlength: 15 })
    lastName: string;

    @Prop({ required: true, lowercase: true})
    emails: [string];

    @Prop({ required: true, lowercase: true})
    telephones: [string];
    
    @Prop({ required: true, lowercase: true})
    countries: [string];
    
    @Prop({ required: true, lowercase: true})
    cities: [string];
    
    @Prop({ required: true, lowercase: true})
    ports: [string];

    @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'segments' })
    segments: [string];
    
    @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'products' })
    products: [string];
    
    @Prop({lowercase: true})
    transactions: [string];

    @Prop({default: false})
    isDeleted:boolean;
}

export const SupplierSchema = SchemaFactory.createForClass(Supplier);