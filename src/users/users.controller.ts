import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ParseIntPipe,
  Patch,
  UseGuards,
  Res,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {  loginUserDTO } from './dto/create-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('login')
  getUser(@Body() loginUserDTO: loginUserDTO): Promise<User> {
    const response = this.usersService.getUser(loginUserDTO);
    return response;
  }

  @Get('details')
  async getUserDetails(@Req() req:Request): Promise<any> {
      const resp = await this.usersService.getUserDetails(req.headers['auth_token']);
      return resp;
  }
}
