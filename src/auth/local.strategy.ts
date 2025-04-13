import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-local";
import {AuthService} from "./auth.service";
import {User} from "@prisma/client";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super();
    }

    async validate(username: string, password: string): Promise<User> {
        const user = await this.authService.validateUser(username, password);
        console.log("Validate-nak hol kéne meghívva lennie? "+ username)
        console.log("Oda írom szívesen de nem logolja"+ password)
        if (!user) {
            throw new UnauthorizedException()
        }
        return user;
    }
}