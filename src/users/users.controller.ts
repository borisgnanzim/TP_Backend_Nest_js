import { BadRequestException, Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @HttpCode(201)
    create(@Body() createUserDto: CreateUserDto) {
        const user = this.usersService.create(createUserDto);
        if (!user) {
            throw new BadRequestException('User creation failed');
        }
        return user;
    }

    @Get()
    @HttpCode(200)
    findAll(@Query('role') role?: string) {
        const users = this.usersService.findAll(role);
        if (!users) {
            throw new NotFoundException('No users found');
        }
        return users;
    }

    @Get(':id')
    @HttpCode(200)
    findOne(@Param('id', ParseIntPipe) id: number) {
        const user = this.usersService.findOne(id);
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return user;
    }

    @Patch(':id')
    @HttpCode(200)
    update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
        const updatedUser = this.usersService.update(id, updateUserDto);
        if (!updatedUser) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return updatedUser;
    }

    @Delete(':id')
    @HttpCode(204)
    // remove(@Param('id', ParseIntPipe) id: number) {
    //     const user = this.usersService.findOne(id);
    //     if (!user) {
    //         throw new NotFoundException(`User with id ${id} not found`);
    //     }
    //     this.usersService.remove(id);
    // }
    remove(@Param('id', ParseIntPipe) id: number) {
        const user = this.usersService.remove(id);
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return user;
    }

}
