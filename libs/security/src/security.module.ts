import { Module } from '@nestjs/common';
import { SecurityService } from './security.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { PassportModule } from '@nestjs/passport';
import {SecurityStrategy} from "./security.strategy";
import { DomainModule } from 'src/domain';

@Module({
  imports: [DomainModule, ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('security'),
      global: true
    }),
  ],
  providers: [SecurityService, SecurityStrategy, JwtService],
  exports: [SecurityService, JwtService],
})
export class SecurityModule { }
