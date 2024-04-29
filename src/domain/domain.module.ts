import { Module } from '@nestjs/common';
import { UsersReposService } from './repos/user-repos.service';
import { PrismaModule } from 'libs/prisma/src';

@Module({
  imports: [PrismaModule],
  providers: [
    UsersReposService,

  ],
  exports: [
    UsersReposService,

  ],
})
export class DomainModule { }
