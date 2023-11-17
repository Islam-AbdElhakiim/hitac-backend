import { Module } from '@nestjs/common';
import { SegmentsService } from './segments.service';
import { SegmentsController } from './segments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Segment, SegmentSchema } from './schemas/segment.schema';
import { Model } from 'mongoose';

@Module({
  imports: [MongooseModule.forFeature([{name: Segment.name, schema: SegmentSchema}])],
  controllers: [SegmentsController],
  providers: [SegmentsService],
})
export class SegmentsModule {}
