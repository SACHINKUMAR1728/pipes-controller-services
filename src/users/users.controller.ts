import { Controller, Get, Post, Body, Query, Param,NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

  userService: UsersService;

  constructor() {
    this.userService = new UsersService();
  }

  @Get('all')
  listUsers() {
    return this.userService.findAll();
  }

  @Get('/:id')
  getUsers(@Param('id') id: string) {
    const user= this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
  
  @Post()
  createUsers(@Body() user: string) {
    return this.userService.create(user);
  }

}



  
  // constructor(private readonly usersService: UsersService) {}

//  @Get() //GET /users or /users?role=admin
//  findAll(@Query('role') role?: 'Intern' | 'Admin' | 'Engineer'){
//    return this.usersService.findAll(role);
//  }
//  @Get('interns') //GET /users/interns
//  findAllInterns(){
//    return this.usersService.findAll('Intern');
//  }
//  @Get(':id') //GET /users/:id
//   findOne(@Param('id',ParseIntPipe) id: number) {
//     return this.usersService.findOne(id);
//   }

//   @Post() //POST /users
//   create(@Body(ValidationPipe) user: CreateUserDto) {
    
//     return this.usersService.create(user);  

//   }
//   @Patch(':id') //PATCH /users/:id
//   update(@Param('id',ParseIntPipe) id: number, @Body(ValidationPipe) userUpdate: UpdateUserDto) {

//     const user = this.usersService.update(id,userUpdate);
    
    
//   }

//   @Delete(':id') //DELETE /users/:id
//   remove(@Param('id',ParseIntPipe) id:number){
//     return this.usersService.delete(id);
//   }
