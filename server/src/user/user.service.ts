import {
	ConflictException,
	Injectable,
	UnauthorizedException
} from "@nestjs/common";
import { genSalt, hash } from "bcryptjs";
import { AvatarService } from "../avatar/avatar.service";
import { PrismaService } from "../prisma/prisma.service";
import { UserCreateInput, UserLoginInput } from "./user.inputs";

@Injectable()
export class UserService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly avatarService: AvatarService
	) {}

	async createUser({ email, username, name, password }: UserCreateInput) {
		let user = await this.prismaService.user.findOne({ where: { email } });
		if (user) throw new ConflictException("Email Already Exists!");

		user = await this.prismaService.user.findOne({ where: { username } });
		if (user) throw new ConflictException("Username Already taken!");

		const salt = await genSalt(15);
		const hashedPassword = await hash(password, salt);
		const { url: avatar } = this.avatarService.generateAvatar();
		return this.prismaService.user.create({
			data: { name, email, username, password: hashedPassword, salt, avatar }
		});
	}

	async login({ username, password }: UserLoginInput) {
		const user = await this.prismaService.user.findOne({ where: { username } });
		if (!user) throw new UnauthorizedException("Invalid Credentials!");

		const hashedPassword = await hash(password, user.salt);
		if (hashedPassword !== user.password)
			throw new UnauthorizedException("Invalid Credentials!");

		return user;
	}
}
