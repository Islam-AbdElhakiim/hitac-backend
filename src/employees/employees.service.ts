import { BadRequestException, ConflictException, Injectable, NotFoundException, Redirect } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import mongoose, { Model, Mongoose } from "mongoose"
import { EmployeeSchema, Employee } from './schemas/employee.schema';
import { CreateEmpDto } from "./dto/create-employee.dto";
import { UpdateEmpDto } from "./dto/update-employee.dto";
import { CreateAuthDto } from "src/auth/dto/create-auth.dto";
import { Session } from "src/sessions/schemas/session.schema";
import { CreateSessionDto } from "src/sessions/dto/create-session.dto";
import e, { Response, Request, json } from "express";
import { ClientEmpDto } from "./dto/client-employee.dto";
import { error } from "console";
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
        try {
            //hashing password
            const { email, password } = employee;
            // console.log(email, password);
            const hashedPassword = EmployeesService.hash(password);
            employee.password = hashedPassword;

            //creating
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
        try {
            const user = await this.employeesModel.findById(id);

            if (!user) {
                throw new NotFoundException("user not exists!");
            }
            return user;
        } catch (err) {
            // console.log("error is ", JSON.stringify(err))
            if (err.name === 'NotFoundException') {
                throw err;
            } else {
                throw new BadRequestException(err.message);
            }
        }
    }

    public async login(emp: CreateAuthDto, res?: Response, req?: Request): Promise<Employee> {
        try {
            const { email, password, rememberMe } = emp;
            const hashedPassword = EmployeesService.hash(password);

            const user = await this.employeesModel.findOne({ email, password: hashedPassword });

            if (!user) throw new NotFoundException("user not exists!");

            // console.log(user)
            const userId = user._id;

            // set expiry
            let expiry = rememberMe ? new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30) : new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7)

            //create the session
            const session = new this.sessinoModel<Session>({ expiry, userId });
            const saved = await session.save()
            const sessionId = saved._id.toString();

            //create the cookie
            const domain = req.headers.host;
            res.cookie('session', sessionId, {
                expires: expiry,
                sameSite: "none",
                secure: true,
            });
            res.cookie('user', userId.toString(), {
                sameSite: "none",
                secure: true,
            });

            res.status(200);
            return user;
        } catch (err) {
            console.log("error is ", JSON.stringify(err))

            if (err.name === 'NotFoundException') {
                throw new NotFoundException(err.message)
            } else {
                throw new BadRequestException(err.message)
            }
        }

    }

    public async update(id: mongoose.Schema.Types.ObjectId, employee: UpdateEmpDto) {
        try {
            if (!employee._id) employee._id = id;

            if (employee.password) {
                const hashedPassword = EmployeesService.hash(employee.password);
                employee.password = hashedPassword;
            }
            console.log(employee)
            const user = await this.employeesModel.findOneAndUpdate({ "_id": id }, employee, { returnDocument: "after" });
            if (!user) throw new NotFoundException("user not exists!")
            console.log(user)
            return (user);
        } catch (err) {
            if (err.name == "NotFoundException") throw err;
            else throw new BadRequestException(err.message);
        }
    }

    public async hide(id: mongoose.Schema.Types.ObjectId) {

        try {
            const user = await this.employeesModel.findOneAndUpdate({ '_id': id }, { "$set": { isDeleted: true } }, { returnDocument: "after" });
            if (!user) throw new NotFoundException("user not found!");
            return user;
        } catch (err) {
            if (err.name === "NotFoundException") {
                throw err;
            } else {
                throw new BadRequestException(err.message);
            }
        }
    }

    async delete(id: mongoose.Schema.Types.ObjectId) {
        try {
            const deletedRecord = (await this.employeesModel.deleteOne({ '_id': id }));
            if (deletedRecord.deletedCount < 1) throw new BadRequestException("record Couldn't be deleted or not exists!");
            return deletedRecord;
        } catch (err) {
            throw new BadRequestException(err.message);
        }
    }
}