import {
  CanActivate,
  ExecutionContext,
  Injectable,
  createParamDecorator, UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { SecurityService } from "../security.service";



export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user
  },
);

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private securityService: SecurityService,
  ) {
    super();
  }
  async canActivate(context: ExecutionContext) {
    const contextType = context.getType();
    let authHeader, decodedUser;


    const request = context.switchToHttp().getRequest();
    authHeader = request.headers?.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Not authorized');
    }

    decodedUser = await this.validateToken(authHeader);

    request.user = decodedUser;
    return true

  }

  private async validateToken(
    authHeader: string,
  ) {
    const token = authHeader.split(" ")[1];
    return this.jwtService.verify(token)
  }

}