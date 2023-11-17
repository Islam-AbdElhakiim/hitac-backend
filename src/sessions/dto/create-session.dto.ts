import mongoose from "mongoose";
import { Employee } from "src/employees/schemas/employee.schema";

export class CreateSessionDto {
    expiry: Date;
    userId: mongoose.Types.ObjectId;
}

