import { Module } from '@nestjs/common';
import { EquipmentsTypesService } from './equipments-types.service';
import { EquipmentsTypesController } from './equipments-types.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EquimpentsType, EquimpentsTypeSchema } from './schema/equipments-type.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: EquimpentsType.name, schema: EquimpentsTypeSchema }])],
  controllers: [EquipmentsTypesController],
  providers: [EquipmentsTypesService],
})
export class EquipmentsTypesModule {}
