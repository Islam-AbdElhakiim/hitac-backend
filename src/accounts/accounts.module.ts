import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from './schemas/account.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Account.name, schema:AccountSchema}])],
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule {}
