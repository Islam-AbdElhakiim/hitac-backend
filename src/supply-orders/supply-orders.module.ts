import { Module } from '@nestjs/common';
import { SupplyOrdersService } from './supply-orders.service';
import { SupplyOrdersController } from './supply-orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SupplyOrder, SupplyOrderSchema } from './schemas/supply-order.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: SupplyOrder.name, schema: SupplyOrderSchema}])],
  controllers: [SupplyOrdersController],
  providers: [SupplyOrdersService],
})
export class SupplyOrdersModule {}
