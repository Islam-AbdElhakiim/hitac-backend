import mongoose from "mongoose";

export class CreatePatchDto {

    packingDate: Date;

    suppliers: mongoose.Schema.Types.ObjectId[];

    qualitySpecialist: mongoose.Schema.Types.ObjectId;

    operation: mongoose.Schema.Types.ObjectId;

    station: mongoose.Schema.Types.ObjectId;

    pallets: mongoose.Schema.Types.ObjectId[];
    
    products: mongoose.Schema.Types.ObjectId[];
    
    salesCases: mongoose.Schema.Types.ObjectId[];

    description: string;

    totalPallets: number;

    isFulfilled: boolean;
    






}
