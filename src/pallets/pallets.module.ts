import { Module } from '@nestjs/common';
import { PalletsService } from './pallets.service';
import { PalletsController } from './pallets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pallet, PalletSchema } from './schemas/pallet.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Pallet.name, schema: PalletSchema }])],
  controllers: [PalletsController],
  providers: [PalletsService],
})
export class PalletsModule { }
