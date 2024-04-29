import { IsEmail } from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  IsUUID,
  validate,
} from "class-validator";


export class SignUpForm {
  @ApiProperty({
    description: "email",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "password",
  })
  @IsString()
  password: string;

  static from(form?: SignUpForm) {
    const it = new SignUpForm();
    it.email = form?.email;
    it.password = form?.password;
    return it;
  }

  static async validate(form: SignUpForm) {
    const errors = await validate(form);
    return errors.length ? errors : false;
  }
}
