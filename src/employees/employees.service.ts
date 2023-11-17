import { BadRequestException, ConflictException, Injectable, NotFoundException, Redirect } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import mongoose, { Model, Mongoose } from "mongoose"
import { EmployeeSchema, Employee } from './schemas/employee.schema';
import { CreateEmpDto } from "./dto/create-employee.dto";
import { UpdateEmpDto } from "./dto/update-employee.dto";
import { CreateAuthDto } from "src/auth/dto/create-auth.dto";
import { Session } from "src/sessions/schemas/session.schema";
import { CreateSessionDto } from "src/sessions/dto/create-session.dto";
import { Response } from "express";
import { ClientEmpDto } from "./dto/client-employee.dto";
const crypto = require('crypto');


@Injectable()
export class EmployeesService {
    constructor(@InjectModel(Employee.name) private employeesModel: Model<Employee>, @InjectModel(Session.name) private sessinoModel: Model<Session>) { }

    static hash = (password: string): string => {
        const algo = "aes-256-cbc";
        const key = "hitac-for-exporthitac-for-export";
        const iv = "1234567891234567";
        const cipher = crypto.createCipheriv(algo, key, iv);
        let hashedPassword = cipher.update(password, 'utf-8', 'hex');
        hashedPassword += cipher.final("hex");
        return hashedPassword;
    }

    async create(employee: CreateEmpDto): Promise<Employee> {
        //hashing password
        const { email, password } = employee;
        // console.log(email, password);
        const hashedPassword = EmployeesService.hash(password);
        employee.password = hashedPassword;

        //creating
        try {
            const createdEmployee = new this.employeesModel(employee);
            return await createdEmployee.save();
        } catch (err) {
            throw new BadRequestException(err.message);
        }
    }

    public async get(): Promise<Employee[]> {
        return await this.employeesModel.find();
    }

    public async getOne(id: mongoose.Schema.Types.ObjectId): Promise<Employee> {
        return await this.employeesModel.findById(id);
    }

    public async login(emp: CreateAuthDto, res?: Response): Promise<Employee> {
        const { email, password, rememberMe } = emp;
        const hashedPassword = EmployeesService.hash(password);

        const user = await this.employeesModel.findOne({ email, password: hashedPassword });
        if (!user) throw new NotFoundException("user not exists!");

        // console.log(user)
        const userId = user._id;

        // set expiry
        let expiry: Date;
        if (rememberMe) {
            expiry = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30) //one month
        } else {
            expiry = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7) //one week
        }

        //create the sessio(
        const session = new this.sessinoModel<Session>({ expiry, userId });
        const saved = await session.save()
        const sessionId = saved._id.toString();
        //create the cookie

        res.cookie('session', sessionId, {
            expires: expiry,
        });
        res.cookie('user', userId.toString());
        res.status(200);
        return user;

    } 

    public async update(id: mongoose.Schema.Types.ObjectId, employee: UpdateEmpDto) {
        try {
            const updateEmployee = new this.employeesModel(employee);
            if (updateEmployee.password) {
                console.log("has pw");
                const hashedPassword = EmployeesService.hash(updateEmployee.password);
                updateEmployee.password = hashedPassword;
            }
            const user =  await this.employeesModel.updateOne({ "_id": id }, updateEmployee);
            return JSON.stringify(user);
        } catch( err ) {
            console.log('err' , err.message)
            return err.message
        }
    }

    public hide(id: mongoose.Schema.Types.ObjectId) {

        return this.employeesModel.updateOne({ '_id': id }, { "$set": { isDeleted: true } });
    }

    public remove(id: mongoose.Schema.Types.ObjectId) {

        return this.employeesModel.deleteOne({ '_id': id });
    }
}