import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {authConstants} from "./auth.constants";

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor
    () {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: authConstants.jwt_secret
        });
    }
    async validate(payload: any) {
        console.log("Payload: ", payload);
        return {userId: payload.sub, email: payload.email};
    }
}