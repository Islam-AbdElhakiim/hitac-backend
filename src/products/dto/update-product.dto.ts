import mongoose from "mongoose";
import { IAttribute } from "./create-product.dto";

export class UpdateProductDto {
    name: string;
    description: string;
    segment: mongoose.Schema.Types.ObjectId;
    image: string;
    specifications: IAttribute[];
    isDeleted: boolean;
} 
