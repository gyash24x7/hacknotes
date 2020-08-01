import {
	Body,
	Controller,
	Get,
	Post,
	UseGuards,
	ValidationPipe
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { User } from "@prisma/client";
import { AuthUser } from "./auth-user.decorator";
import { UserCreateInput, UserLoginInput } from "./user.inputs";
import { UserService } from "./user.service";

@Controller("/api/user")
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService
	) {}

	@Post("/login")
	async login(@Body(ValidationPipe) data: UserLoginInput) {
		const { salt, password, ...user } = await this.userService.login(data);
		const token = this.jwtService.sign({ id: user.id });
		return { token, user };
	}

	@Post("/signup")
	async signup(@Body(ValidationPipe) data: UserCreateInput) {
		const { salt, password, ...user } = await this.userService.createUser(data);
		const token = this.jwtService.sign({ id: user.id });
		return { token, user };
	}

	@UseGuards(AuthGuard("jwt"))
	@Get("/me")
	async me(@AuthUser() { salt, password, ...me }: User) {
		return { me };
	}

	@UseGuards(AuthGuard("jwt"))
	@Post("/update")
	async updateAvatar(@Body("avatar") avatar: string, @AuthUser() { id }: User) {
		return this.userService.updateAvatar(avatar, id);
	}
}
