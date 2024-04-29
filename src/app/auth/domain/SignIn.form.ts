import { IsEmail } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsStrongPassword,
  IsUUID,
  validate,
} from "class-validator";


export class SignInForm {
  @ApiProperty({
    description: "email",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "password",
  })
  password: string;


  static from(form?: SignInForm) {
    const it = new SignInForm();
    it.email = form?.email;
    it.password = form?.password;
    return it;
  }

  static async validate(form: SignInForm) {
    const errors = await validate(form);
    return errors.length ? errors : false;
  }
}
