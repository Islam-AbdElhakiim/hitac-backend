import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { MongooseModule } from '@nestjs/mongoose'
import { AccountsModule } from './accounts/accounts.module';
import { ContactsModule } from './contacts/contacts.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { StationsModule } from './stations/stations.module';
import { SegmentsModule } from './segments/segments.module';
import { ProductsModule } from './products/products.module';
import { SupplyOrdersModule } from './supply-orders/supply-orders.module';
import { ReturnRequestsModule } from './return-requests/return-requests.module';
// import { AuthModule } from './auth/auth.module';
import { SessionsModule } from './sessions/sessions.module';

import * as config from 'config';
const debug = require('debug')('app:start');
const morgan = require('morgan');


//database Server URL
// const databaseUrl = config.get('database.deployed'); 
const databaseUrl = config.get('database.local'); 
debug(`Database Server url is ${databaseUrl}`);


@Module({
  imports: [EmployeesModule, MongooseModule.forRoot(databaseUrl), AccountsModule, ContactsModule, SuppliersModule, StationsModule, SegmentsModule, ProductsModule, SupplyOrdersModule, ReturnRequestsModule, SessionsModule, ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(morgan('combined'));
  }
}
