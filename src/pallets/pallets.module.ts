import { Module } from '@nestjs/common';
import { PalletsService } from './pallets.service';
import { PalletsController } from './pallets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pallet, PalletSchema } from './schemas/pallet.schema';
import { Patch, PatchSchema } from 'src/patches/schemas/patch.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Pallet.name, schema: PalletSchema }]), MongooseModule.forFeature([{ name: Patch.name, schema: PatchSchema }])],
  controllers: [PalletsController],
  providers: [PalletsService],
})
export class PalletsModule { }
