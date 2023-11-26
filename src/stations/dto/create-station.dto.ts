import mongoose from "mongoose";

export class CreateStationDto {
    arabicName: string;
    
    englishName: string;
    
    email: string[];

    telephone: string[];

    country: string[];
    
    city: string[];

    address: string;

    notes: string;
        
    segments: mongoose.Schema.Types.ObjectId[];
    
    products: mongoose.Schema.Types.ObjectId[];

    totalDebt: number;
    
    transactions: mongoose.Schema.Types.ObjectId[];
}
