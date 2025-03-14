import {env} from "node:process";

export const authConstants = {
    jwt_secret: env.JWT_SECRET
}