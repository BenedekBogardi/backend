import {createParamDecorator, ExecutionContext} from "@nestjs/common";

export const Self = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest();
        console.log("ctx id:", req.user.userId)
        return req.user.userId;
    }
)