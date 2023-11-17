import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { IsArray, IsEnum } from 'class-validator';


export enum Modules {
  SALES,
  MARKETING,
  INVENTORY,
  ACCOUNTING
}

@Schema()
export class Employee {

    @Prop({ required: true, lowercase: true, minlength: 3, maxlength: 15 })
    firstName: string;

    @Prop({ required: true, lowercase: true, minlength: 3, maxlength: 15 })
    lastName: string;

    @Prop({ required: true, lowercase: true, enum: ['admin', 'export-manager', 'operation-specialist', 'logistics-specialist', 'accountant'] })
    role: string;

    @Prop({ min: 100, max: 200000, required: true })
    salary: number;

    @Prop({ default: false })
    isDeleted: boolean;

    @Prop({ min: 10, max: 100 })
    age: number;

    @Prop({ lowercase: true, unique: true})
    email: string;

    @Prop({ required: true, min: 6, max: 30})
    password: string;

    @Prop()
    notes: string;

    @Prop()
    image: string;

    @Prop({ lowercase: true })
    telephone: string[];

    @Prop()
    @IsArray()
    @IsEnum(Modules)
    modules: Modules[];

    @Prop()
    accessedAccounts: mongoose.Schema.Types.ObjectId[];

    @Prop()
    hiringDate: string;
  
    // @Prop({ type: mongoose.Schema.Types.ObjectId[], ref: 'notifications' })
    @Prop()
    notifications: mongoose.Schema.Types.ObjectId[];

    // @Prop({ type: mongoose.Schema.Types.ObjectId[], refPath: 'pinnedModel' })
    @Prop()
    pinned: mongoose.Schema.Types.ObjectId[];

    // @Prop({ type: String, enum: ['case', 'email', 'whatsapp'] })
    // pinnedModel: mongoose.Schema.Types.ObjectId[];

}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);