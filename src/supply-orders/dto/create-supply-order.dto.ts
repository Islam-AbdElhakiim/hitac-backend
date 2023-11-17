export class CreateSupplyOrderDto {
    
    salesOrder: string;

    supplier: string;

    product: string;

    price: BigInteger

    description: string;

    createdOn: Date;

    createdBy: string;

    transactions: [string];
}
