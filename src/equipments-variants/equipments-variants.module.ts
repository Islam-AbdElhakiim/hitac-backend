import { Module } from '@nestjs/common';
import { EquipmentsVariantsService } from './equipments-variants.service';
import { EquipmentsVariantsController } from './equipments-variants.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EquipmentsVariant, EquipmentsVariantSchema } from './schema/equipments-variant.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: EquipmentsVariant.name, schema: EquipmentsVariantSchema }])],
  controllers: [EquipmentsVariantsController],
  providers: [EquipmentsVariantsService],
})
export class EquipmentsVariantsModule { }
