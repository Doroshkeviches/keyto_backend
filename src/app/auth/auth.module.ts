import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { SecurityModule, SecurityService } from 'libs/security/src';
import { DomainModule } from 'src/domain';

@Module({
  imports: [DomainModule,SecurityModule],
  providers: [AuthService,SecurityService],
  controllers: [AuthController]
})
export class AuthModule {}
