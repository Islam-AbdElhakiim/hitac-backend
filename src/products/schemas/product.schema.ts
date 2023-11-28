import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { IAttribute } from "../dto/create-product.dto";

@Schema()
export class Product {
    @Prop({ required: true, lowercase: true, minlength: 3, maxlength: 15 })
    name: string;

    @Prop({ minlength: 3, maxlength: 100 })
    description: string;
    
    @Prop()
    image: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Segment'})
    segment: mongoose.Schema.Types.ObjectId;

    @Prop()
    specifications: IAttribute[];

    @Prop({required: true, default: false})
    isDeleted: boolean
}

export const ProductSchema = SchemaFactory.createForClass(Product);