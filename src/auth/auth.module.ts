import { GoogleAuthGuard } from './google-auth.guard';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './google.strategy';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  providers: [AuthService, GoogleStrategy, GoogleAuthGuard, JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
