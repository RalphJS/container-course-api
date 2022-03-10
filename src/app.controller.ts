import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UsersService } from './service/users.service';

@Controller()
export class AppController {
  constructor(private readonly userService: UsersService) {}

  @Get('/users')
  getUsers() {
    return this.userService.findAll();
  }
  
  @Get('/users/:id')
  getUser(@Param('id') userId: string) {
    return this.userService.findOne(userId);
  }

  @Post('/users')
  addUsers(@Body() user: UserDto){
    return this.userService.add(user);
  }
}
