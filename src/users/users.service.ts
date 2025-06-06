import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UsersService {
  private users = [
    {
      "id": 1,
      "name" : "Rahul",
      "email": "Rahul@ds.tv",
      "role": "Intern",
    },
    {
      "id": 2,
      "name" : "Ravi",
      "email": "Ravi@ds.tv",
      "role": "Admin",
    },
    {
      "id": 3,
      "name" : "Rohan",
      "email": "Rohan@ds.tv",
      "role": "Engineer",
    },
    {
      "id": 4,
      "name" : "Ramesh",
      "email": "Ramesh@ds.tv",
      "role": "Intern",
    },
    {
      "id": 5,
      "name" : "Raj",
      "email": "Raj@sr.st",
      "role": "Admin",
    }
  ];

  findAll(role?: 'Intern' | 'Admin' | 'Engineer') {  
    if(role){
      // Filter users by role if provided
    
      const userArray =  this.users.filter(user => user.role === role);
      if(userArray.length === 0){
        throw new NotFoundException(`No Users Found with role ${role}`);
      }
      return userArray;
    }
   
    // If no role is provided, return all users
    if(this.users.length === 0){
      throw new NotFoundException('No Users Found');
    }
    return this.users;
  }

  findOne(id:number){
    const user = this.users.find(user=> user.id === id);
    if(!user){
      throw new NotFoundException('User Not Found');
    }
    return user
  }

  create(user: CreateUserDto) {
    const userByHieghestId = [...this.users].sort((a,b)=> b.id - a.id);
    const newUser = {
      id: userByHieghestId[0].id + 1,
      ...user
    }

    this.users.push(newUser);
    return newUser;
  }

  update(id:number, updatedUser: UpdateUserDto) {
    this.users = this.users.map(user => {
      if(user.id === id){ 
        return {
          ...user,
          ...updatedUser
        };
      }
      return user;
    });
    
    return this.findOne(id);
  }

  delete(id:number){
    const removedUser = this.findOne(id);
    this.users = this.users.filter(user => user.id !== id);

    return removedUser;
  }
}
