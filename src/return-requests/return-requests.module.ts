import { Module } from '@nestjs/common';
import { ReturnRequestsService } from './return-requests.service';
import { ReturnRequestsController } from './return-requests.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReturnRequest, ReturnRequestSchema } from './schemas/return-request.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: ReturnRequest.name, schema: ReturnRequestSchema}])],
  controllers: [ReturnRequestsController],
  providers: [ReturnRequestsService],
})
export class ReturnRequestsModule {}
