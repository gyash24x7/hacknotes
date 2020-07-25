import {
	Injectable,
	InternalServerErrorException,
	Logger,
	UnauthorizedException
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly prismaService: PrismaService,
		configService: ConfigService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.get<string>("JWT_SECRET"),
			ignoreExpiration: false
		});
	}

	private logger = new Logger("JwtStrategy");

	async validate({ id }: any) {
		const user = await this.prismaService.user
			.findOne({ where: { id } })
			.catch((err) => {
				this.logger.error(err);
				throw new InternalServerErrorException();
			});

		if (!user) throw new UnauthorizedException();
		return user;
	}
}
