import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class EquimpentsType {

    @Prop({ required: true })
    title: string;

    @Prop({ default: 0 })
    totalCount: number;

    @Prop({ default: 0 })
    variants: number;

    @Prop({ required: true })
    icon: string;

    @Prop({ default: ""})
    notes: string;

}

export const EquimpentsTypeSchema = SchemaFactory.createForClass(EquimpentsType);