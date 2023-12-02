import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class Patch {

    @Prop({ type: Date, required: true })
    packingDate: Date;

    @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: "Supplier", default: [], })
    suppliers: mongoose.Schema.Types.ObjectId[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Employee", default: "", })
    qualitySpecialist: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Employee", default: "", })
    operation: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Station", default: "", })
    station: mongoose.Schema.Types.ObjectId;

    @Prop({ type: [mongoose.Schema.Types.ObjectId], /*ref: "Pallet",*/ default: [], })
    pallets: mongoose.Schema.Types.ObjectId[];

    @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: "Product", default: [], })
    products: mongoose.Schema.Types.ObjectId[];

    @Prop({ type: [mongoose.Schema.Types.ObjectId], /* ref: "Product", */ default: [], })
    salesCases: mongoose.Schema.Types.ObjectId[];

    @Prop({default: ""})
    description: string;

    @Prop({})
    totalPallets: number;

    @Prop({})
    inStockPallets: number;
    
    @Prop({})
    fullfilledPallets: number;

    @Prop({default: false})
    isFulfilled: boolean;

}

export const PatchSchema = SchemaFactory.createForClass(Patch);