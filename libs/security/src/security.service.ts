import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { User } from "@prisma/client";
import * as bcrypt from "bcryptjs";



@Injectable()
export class SecurityService {
  constructor(
    private jwtService: JwtService,
    private config: ConfigService,
  ) { }

  async generateTokens(user: Pick<User, "id" | "email">) {
    const payload = {
      email: user.email,
      id: user.id,
    };
    const access_token = this.jwtService.sign(payload, {
      secret: this.config.get("security").secret,
    });
    const refresh_token = this.jwtService.sign(payload, {
      secret: this.config.get("security").secret,
    });
    return { access_token, refresh_token };
  }

  async hashPassword({ password }: Pick<User, "password">) {
    // Method generates hashed password with SHA256
    const salt = 5;
    return await bcrypt.hash(password, salt);
  }
}
