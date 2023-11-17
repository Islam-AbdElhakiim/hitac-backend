import { Module } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { SuppliersController } from './suppliers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Supplier, SupplierSchema } from './schemas/supplier.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Supplier.name, schema: SupplierSchema}])],
  controllers: [SuppliersController],
  providers: [SuppliersService],
})
export class SuppliersModule {}
