import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import {compareSync} from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ){}

  async validateUser(email: string, password: string){
    let user: User;
    try{
      user = await this.userService.findByEmail(email);
    } catch (error){
      return null;
    }

    if(!user) return null;

    const isPasswordValid = compareSync(password, user.password);
    if(!isPasswordValid) return null;

    return user;
  }

  async login(user: any) {
    const payload = { sub: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
