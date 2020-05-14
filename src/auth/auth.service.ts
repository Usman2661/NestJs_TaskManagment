import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.respository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async signup(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentialsDto);
  }

  async sigin(authCredentialsDto: AuthCredentialsDto) {
    const username = await this.userRepository.validateUser(authCredentialsDto);

    if (!username) {
      throw new UnauthorizedException('Invalid Credentials');
    }
  }
}
