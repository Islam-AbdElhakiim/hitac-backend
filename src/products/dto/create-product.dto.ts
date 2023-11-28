import mongoose from "mongoose";

export interface IAttribute {
    key: string,
    values: string[];
}

export class CreateProductDto {
    name: string;
    description: string;
    segment: mongoose.Schema.Types.ObjectId;
    image: string;
    specifications: IAttribute[];
    isDeleted: boolean;
}
