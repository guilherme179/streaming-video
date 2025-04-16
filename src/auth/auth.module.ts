import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './google.strategy';
import { GoogleAuthGuard } from './google-auth.guard';

@Module({
  providers: [AuthService, GoogleStrategy, GoogleAuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}
