import { Module } from '@nestjs/common';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeSchema, Employee} from './schemas/employee.schema';
import { Session, SessionSchema } from 'src/sessions/schemas/session.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Employee.name, schema: EmployeeSchema}, {name: Session.name, schema: SessionSchema}])],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}