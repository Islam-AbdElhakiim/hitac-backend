import { Module } from '@nestjs/common';
import { PatchesService } from './patches.service';
import { PatchesController } from './patches.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Patch, PatchSchema } from './schemas/patch.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Patch.name, schema: PatchSchema }])],
  controllers: [PatchesController],
  providers: [PatchesService],
})
export class PatchesModule { }
