import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsEnum } from "class-validator";
import mongoose from "mongoose";
import { palletStatus } from "src/types";

@Schema()
export class Pallet {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Patch", required: true })
    patch: mongoose.Schema.Types.ObjectId;

    @Prop({ type: Date, required: true })
    packingDate: Date;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Supplier", default: "", })
    supplier: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Station", default: "", })
    station: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Product", default: "", })
    product: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Employee", default: "", })
    operation: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Employee", default: "", })
    qualitySpecialist: mongoose.Schema.Types.ObjectId;

    @Prop({ default: "" })
    brand: string;

    @Prop({ required: true, })
    boxWeight: number;

    @Prop({ required: true, })
    boxesPerBase: number;

    @Prop({ required: true, })
    boxesPerColumn: number;

    @Prop({ required: true })
    totalBoxes: number;

    @Prop({ required: true })
    palletGrossWeight: number;

    @Prop({ required: true })
    palletNetWeight: number;

    @Prop({ type: [mongoose.Schema.Types.ObjectId], /* ref: "Patch" required: true  */ default: [] })
    salesCases: mongoose.Schema.Types.ObjectId[];

    @Prop({})
    QRCode: string;

    @IsEnum(palletStatus)
    @Prop({ default: palletStatus.inStock, enum: Object.keys(palletStatus), })
    status: palletStatus;

    @Prop()
    containerSpot: number;
}

export const PalletSchema = SchemaFactory.createForClass(Pallet);