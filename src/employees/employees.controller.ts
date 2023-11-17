import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Res, Header } from "@nestjs/common";
import { EmployeesService } from "./employees.service";
// import { Employee } from "./schemas/employee.schema";
import { CreateEmpDto } from "./dto/create-employee.dto";
import mongoose from "mongoose";
import { UpdateEmpDto } from "./dto/update-employee.dto";
import { CreateAuthDto } from "src/auth/dto/create-auth.dto";
import { NotFoundError } from "rxjs";
import e, { Response } from "express";

const debug = require('debug')('employees');

@Controller('employees')
export class EmployeesController {
    constructor(public service: EmployeesService) { }

    @Get()
    get() {
        return this.service.get();
    }

    @Get(':id')
    getById(@Param('id') id: mongoose.Schema.Types.ObjectId) {
        return this.service.getOne(id);
    }

    @Post("login")
    async login(@Body() employee: CreateAuthDto, @Res({passthrough: true}) res: Response) {
        // debug(employee)
        return await this.service.login(employee, res);
    }

    @Post()
    async create(@Body() employee: CreateEmpDto) {
        // debug(employee);
        return await this.service.create(employee)
    }

    @Delete('hide/:id')
    hide(@Param('id') id: mongoose.Schema.Types.ObjectId) {
        // debug("id is ", id);
        return this.service.hide(id);
    }

    @Delete('delete/:id')
    remove(@Param('id') id: mongoose.Schema.Types.ObjectId) {
        return this.service.remove(id);
    }

    @Put(':id')
    update(@Param('id') id: mongoose.Schema.Types.ObjectId, @Body() employee: UpdateEmpDto) {
        debug(employee);
        return this.service.update(id, employee);
    }
}