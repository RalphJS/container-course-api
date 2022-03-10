import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/dto/user.dto';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id).then( user => {
        if(!user) {
            throw new NotFoundException("User not found");
        }
        return user
    });
  }

  add(user: UserDto) {
      const newUser = new User();
      newUser.firstName = user.firstname;
      newUser.lastName = user.lastname;
      return this.usersRepository.save(newUser);
  }

}