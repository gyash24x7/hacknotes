import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const AuthUser = createParamDecorator(
	(_data: unknown, ctx: ExecutionContext) => ctx.getArgs()[0].user
);
