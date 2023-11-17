
export class UpdateReturnRequestDto {
    supplyOrder: string;

    supplier: string;

    product: string;

    price: BigInteger

    description: string;

    createdOn: Date;

    createdBy: string;

    transactions: [string];
}
