import { IAttribute } from "./create-product.dto";


export class UpdateProductDto {
    name: string;
    description: string;
    segment: string;
    imageSrc: string;
    attributes: [IAttribute]
}
