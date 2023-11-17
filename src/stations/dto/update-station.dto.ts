import { PartialType } from '@nestjs/mapped-types';
import { CreateStationDto } from './create-station.dto';

export class UpdateStationDto extends PartialType(CreateStationDto) {
    arabicName: string;
    
    englishName: string;
    
    email: [string];

    telephone: [string];

    country: [string];
    
    city: [string];

    address: [string]
    
    port: [string];
    
    segments: [string];
    
    products: [string];
    
    transactions: [string];
}
