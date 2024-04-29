import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "libs/prisma/src";




@Injectable()
export class UsersReposService {
  constructor(private prisma: PrismaService) { }
  async getUserByEmail({ email }: Pick<User, "email">) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async getOneUserById({ id }: Pick<User, "id">) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return user;
  }



  async createUser(
    data: Pick<User, "email">,
    { password }: Pick<User, "password">,
  ) {
    const { email } = data;
    const user = await this.prisma.user.create({
      data: {
        email,
        password,
      },
    });
    return user;
  }

}
