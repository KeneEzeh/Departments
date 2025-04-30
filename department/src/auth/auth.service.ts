import {
  ConsoleLogger,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { SignupInput } from './dto/sign-up.dto';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, userId: number): Promise<any> {
    console.log(email, userId);
    const user = await this.usersService.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User does not have access to app.');
    }

    if (user && user.id === userId) {
      // const { password, ...result } = user;
      return user;
    }
    return null;
  }

  async signup(input: SignupInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(input.password, 10);
    const user = this.userRepo.create({ ...input, password: hashedPassword });
    return this.userRepo.save(user);
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findUserByEmail(email);
    console.log(email, password);

    if (!user) {
      throw new UnauthorizedException('Invalid email.');
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password.');
    }
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
