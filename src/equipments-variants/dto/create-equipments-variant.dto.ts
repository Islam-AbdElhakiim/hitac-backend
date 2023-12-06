import mongoose from "mongoose";

export class Variants {
    title: string;

    value: string;
}

export class CreateEquipmentsVariantDto {
    equipmentsType: mongoose.Schema.Types.ObjectId;
    
    title: string;

    totalCount: number = 0;

    variants: Variants[];

    notes: string;
}
