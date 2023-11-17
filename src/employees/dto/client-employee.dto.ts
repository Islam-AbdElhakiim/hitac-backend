import mongoose from "mongoose";
import { Modules } from "../schemas/employee.schema";


export class ClientEmpDto {
    _id: mongoose.Schema.Types.ObjectId;
    firstName: string;
    lastName: string;
    role: string;
    isDeleted: boolean;
    age: number
    salary: number;
    email: string;
    // password: string;
    telephone: string[];
    modules: Modules[];
    accessedAccounts: mongoose.Schema.Types.ObjectId[]
    notifications: mongoose.Schema.Types.ObjectId[]
    pinned: string[]
    notes?: string;
    hiringDate: string
    image?: string;
};
 