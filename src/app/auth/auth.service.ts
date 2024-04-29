import { Injectable } from "@nestjs/common";
import { SecurityService } from "libs/security/src";
import { User } from "@prisma/client";
import * as bcrypt from "bcryptjs";

import { UsersReposService } from "src/domain/repos/user-repos.service";


@Injectable()
export class AuthService {
  constructor(
    private usersRepo: UsersReposService,
    private securityService: SecurityService,
  ) { }

  async generateTokens(user: User) {
    const tokens = await this.securityService.generateTokens(user);
    return tokens;
  }
  async getUserByEmail(email: Pick<User, "email">) {
    const user = await this.usersRepo.getUserByEmail(email);
    return user;
  }


  async comparePassword(user: User, password: Pick<User, "password">) {
    const isCompare = await bcrypt.compare(password.password, user.password);
    return isCompare;
  }

  async signUp(
    data: Pick<User, "email" | "password" > ) {

    const password = await this.securityService.hashPassword(data);
    const user = await this.usersRepo.createUser(data, { password });
    return user;
  }
  async authenticate(user: User) {
    const tokens = await this.securityService.generateTokens(user);
    return tokens;
  }
}
