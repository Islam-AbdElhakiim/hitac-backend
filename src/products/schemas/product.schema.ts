import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Attribute, AttributeSchema } from "./attribute.schema";

@Schema()
export class Product {
    @Prop({ required: true, lowercase: true, minlength: 3, maxlength: 15 })
    name: string;

    @Prop({ minlength: 3, maxlength: 100 })
    description: string;
    
    @Prop()
    imageSrc: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'segments', required: true })
    segment: mongoose.Schema.Types.ObjectId;

    @Prop({type: [AttributeSchema]})
    attributes: [Attribute];

}

export const ProductSchema = SchemaFactory.createForClass(Product);