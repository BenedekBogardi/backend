import { BadRequestException, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";
import { UsersService } from "src/users/users.service";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {

    canActivate(context: ExecutionContext) {
        return super.canActivate(context);        
    }

    handleRequest<TUser = any>(err: any, user: any, info: any, context: ExecutionContext, status?: any): TUser {
        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        console.log("user:", user)
        return user;
    }
}