import {
  Body,
  Controller,
  Get,
  HttpCode,
  InternalServerErrorException,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SecurityService } from "libs/security/src";
import { ApiBody, ApiResponse } from "@nestjs/swagger";
import { TokenDto } from "./domain/Token.dto";
import { SignInForm } from "./domain/SignIn.form";
import { SignUpForm } from "./domain/SignUp.form";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private securityService: SecurityService,
  ) {}
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: "Successfully login",
    type: TokenDto,
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  @ApiBody({ type: SignInForm })
  @Post("signin")
  async signIn(@Body() body: SignInForm) {
    const form = SignInForm.from(body);
    const errors = await SignInForm.validate(form);
    if (errors) throw new InternalServerErrorException();

    const user = await this.authService.getUserByEmail(form);
    if (!user) throw new InternalServerErrorException();

    const isCompare = await this.authService.comparePassword(user, form);
    if (!isCompare) throw new InternalServerErrorException();

    const tokens = await this.authService.authenticate(user);

    return TokenDto.toEntity(tokens);
  }



  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: "Successfully created a new user",
    type: TokenDto,
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  @ApiBody({ type: SignUpForm })
  @Post("signup")
  async signUp(@Body() body: SignUpForm) {
    const form = SignUpForm.from(body);
    const errors = await SignUpForm.validate(form);
    if (errors) throw new InternalServerErrorException();

    const candidate = await this.authService.getUserByEmail(form);
    if (candidate) {
      throw new InternalServerErrorException();
    }

    const user = await this.authService.signUp(form);
    const tokens = await this.authService.generateTokens(user);
    return TokenDto.toEntity(tokens);
  }

 
}
