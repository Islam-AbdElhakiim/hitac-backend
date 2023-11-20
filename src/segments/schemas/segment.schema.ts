import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class Segment {
    @Prop({ required: true, lowercase: true, minlength: 3, maxlength: 15 })
    name: string;

    @Prop({ minlength: 3, maxlength: 100 })
    description: string;

}

export const SegmentSchema = SchemaFactory.createForClass(Segment);