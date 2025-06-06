import { Controller, Get, Param, Post, Body, Patch, Delete, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  
  constructor(private readonly usersService: UsersService) {}



 @Get() //GET /users or /users?role=admin
 findAll(@Query('role') role?: 'Intern' | 'Admin' | 'Engineer'){
   return this.usersService.findAll(role);
 }
 @Get('interns') //GET /users/interns
 findAllInterns(){
   return this.usersService.findAll('Intern');
 }
 @Get(':id') //GET /users/:id
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post() //POST /users
  create(@Body(ValidationPipe) user: CreateUserDto) {
    
    return this.usersService.create(user);  

  }
  @Patch(':id') //PATCH /users/:id
  update(@Param('id',ParseIntPipe) id: number, @Body(ValidationPipe) userUpdate: UpdateUserDto) {

    const user = this.usersService.update(id,userUpdate);
    
    
  }

  @Delete(':id') //DELETE /users/:id
  remove(@Param('id',ParseIntPipe) id:number){
    return this.usersService.delete(id);
  }
}
