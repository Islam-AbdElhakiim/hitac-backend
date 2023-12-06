import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Variants } from "../dto/create-equipments-variant.dto";

@Schema()
export class EquipmentsVariant {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "EquimpentsType", required: true })
    equipmentsType: mongoose.Schema.Types.ObjectId;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    totalCount: number = 0;

    @Prop({ default: [] })
    variants: Variants[];

    @Prop({ default: "" })
    notes: string;
}

export const EquipmentsVariantSchema = SchemaFactory.createForClass(EquipmentsVariant);
