import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response.dto';
import { LoginUserInput } from './dto/login.dto';
import { User } from 'src/user/user.entity';
import { SignupInput } from './dto/sign-up.dto';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => User)
  async signup(@Args('input') input: SignupInput): Promise<User> {
    return this.authService.signup(input);
  }

  @Mutation(() => LoginResponse)
  async login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    console.log('Login...');
    return this.authService.login(
      loginUserInput.email,
      loginUserInput.password,
    );
  }
}
