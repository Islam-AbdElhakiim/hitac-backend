export class CreateContactDto {
    
    firstName: string;

    lastName: string;

    emails: [string];
    
    telephones: [string];
    
    countries: [string];

    cities: [string];

    ports: [string];

    Account: string;

    segments: [string];

    products: [string];

    isDeleted: boolean;
}
