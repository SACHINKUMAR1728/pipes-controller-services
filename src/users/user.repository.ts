import { promises as fs } from 'fs';

export class UserRepository {

  async findOne(id:string){
    const data = await fs.readFile('user.json', 'utf8');
    const users = JSON.parse(data);
    return users[id];
  }

  async findAll(){
    const data = await fs.readFile('user.json', 'utf8');
    return JSON.parse(data);
  }

  async create(user: any) {
    const data = await fs.readFile('user.json', 'utf8');
    let users = JSON.parse(data);
    
    // Simply use object length + 1 for the next ID
    const nextId = (Object.keys(users).length + 1).toString();
    users[nextId] = user;
    
    await fs.writeFile('user.json', JSON.stringify(users, null, 2));
    return user;
  }

}