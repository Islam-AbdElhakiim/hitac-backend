import mongoose from "mongoose";

export class CreateSupplierDto {
        
    firstName: string;

    lastName: string;

    emails: string[];
    
    telephones: string[];
    
    countries: string[];

    cities: string[];
    
    notes: string;

    segments: mongoose.Schema.Types.ObjectId[];
    
    products: mongoose.Schema.Types.ObjectId[];
    
    totalDebt: number;
    
    transactions: mongoose.Schema.Types.ObjectId[];
    
    isDeleted: boolean;
}
