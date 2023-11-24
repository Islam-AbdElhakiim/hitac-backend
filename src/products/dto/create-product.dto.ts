import mongoose from "mongoose";

export interface IAttribute {
    attribute: string,
    options: string[];
}

export class CreateProductDto {
    name: string;
    description: string;
    segment: mongoose.Schema.Types.ObjectId;
    image: string;
    attributes: IAttribute[];
    isDeleted: boolean;
}
