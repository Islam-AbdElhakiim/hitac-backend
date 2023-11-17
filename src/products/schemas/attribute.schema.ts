import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class Attribute {
    @Prop({ required: true, lowercase: true, minlength: 3, maxlength: 15 })
    attribute: string;

    @Prop({ required: true, lowercase: true, minlength: 3, maxlength: 100 })
    options: [string];

}

export const AttributeSchema = SchemaFactory.createForClass(Attribute);