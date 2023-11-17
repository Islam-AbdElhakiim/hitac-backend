import mongoose from "mongoose";

export class UpdateAccountDto {
    arabicName: string;
    
    englishName: string;
    
    emails: string[];

    telephones: string[];

    countries: string[];
    
    cities: string[];
    
    ports: string[];
    
    segments: mongoose.Types.ObjectId[];
    
    products: mongoose.Types.ObjectId[];
    
    contacts: mongoose.Types.ObjectId[];

    isDeleted: boolean;
}
