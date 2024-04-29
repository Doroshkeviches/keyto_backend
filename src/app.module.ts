import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SecurityModule } from "libs/security/src/security.module";
import securityConfig from "libs/security/src/config/security.config";
import appConfig from "libs/security/src/config/app.config";
import { AuthModule } from "./app/auth/auth.module";

@Module({
  imports: [
    AuthModule,
    SecurityModule,
    ConfigModule.forRoot({
      envFilePath: ".env",
      load: [appConfig, securityConfig],
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
