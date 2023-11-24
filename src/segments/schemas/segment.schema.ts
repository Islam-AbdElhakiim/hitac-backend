import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class Segment {
    @Prop({ required: true, lowercase: true, minlength: 3, maxlength: 15 })
    name: string;

    @Prop({ minlength: 3, maxlength: 100 , required: true, default: ""})
    description: string;

    @Prop()
    image: string;

    @Prop({required: true, default: false})
    isDeleted: boolean;
}

export const SegmentSchema = SchemaFactory.createForClass(Segment);