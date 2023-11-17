
export interface IAttribute {
    attribute: string,
    options: [string];
}

export class CreateProductDto {
    name: string;
    description: string;
    segment: string;
    imageSrc: string;
    attributes: [IAttribute]
}
