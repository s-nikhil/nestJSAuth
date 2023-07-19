import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, loginUserDTO } from './dto/create-user.dto';
import { User } from './user.entity';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) { }

  async getUser(@Body() loginUserDTO: loginUserDTO): Promise<any | null> {
    try {
      const user = await this.usersRepository.findOne({ where: { email: loginUserDTO.email } });
      if (user) {
        let isPasswordValid = false;

        // If the password is in bcrypt format, use bcrypt.compare
        const isBcryptHash = /^(\$2[aby]\$)/.test(user.password);

        if (isBcryptHash) {
          isPasswordValid = await bcrypt.compare(loginUserDTO.password, user.password);
        } 
        
        if (isPasswordValid) {
          const payload = { email: user.email };
          return {
            access_token: this.jwtService.sign(payload),
            expiredAt: Date.now() + 60000,
          };
        } else {
          // If the password doesn't match, throw Unauthorized error
          throw new HttpException('Looks like you have entered an invalid username or password', HttpStatus.UNAUTHORIZED);
        }
      } else {
        throw new HttpException('No user found', HttpStatus.UNAUTHORIZED);
      }
    } catch (error) {
      console.error('Error in getUser:', error.message);
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      }
    }
  }
  
  async getUserDetails(token: string): Promise<any | null> {
    try {
      const tokenDetails = this.jwtService.decode(token);
      if (!tokenDetails || typeof tokenDetails === 'string') throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      const email = tokenDetails?.email;
      const user = await this.usersRepository.findOne({ where: { email } });
      if (!user) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      return user;
    } catch (error) {
      
      console.error('Error in getUserDetails:', error.message);
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      }
    }
  }
}
