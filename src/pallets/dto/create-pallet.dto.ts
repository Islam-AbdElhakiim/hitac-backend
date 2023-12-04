import mongoose from "mongoose";
import { palletStatus } from "src/types";

export class CreatePalletDto {

    patch: mongoose.Schema.Types.ObjectId;
    
    packingDate: Date;
    
    supplier: mongoose.Schema.Types.ObjectId;
    
    station: mongoose.Schema.Types.ObjectId;

    product: mongoose.Schema.Types.ObjectId;
    
    operation: mongoose.Schema.Types.ObjectId;
    
    qualitySpecialist: mongoose.Schema.Types.ObjectId;

    brand: string;

    boxWeight: number;

    boxesPerBase: number;

    boxesPerColumn: number;

    totalBoxes: number;

    palletGrossWeight: number;

    palletNetWeight: number;

    salesCases: mongoose.Schema.Types.ObjectId[]; 

    QRCode: string;

    status: palletStatus;

    containerSpot: number;
}