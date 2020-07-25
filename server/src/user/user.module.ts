import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AvatarModule } from "../avatar/avatar.module";
import { PrismaModule } from "../prisma/prisma.module";
import { JwtStrategy } from "./jwt.strategy";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
	imports: [
		PassportModule.register({ defaultStrategy: "jwt" }),
		JwtModule.registerAsync({
			useFactory: (configService: ConfigService) => {
				const secret = configService.get<string>("JWT_SECRET");
				return { secret, expiresIn: 7 * 24 * 60 * 60 };
			},
			inject: [ConfigService]
		}),
		PrismaModule,
		AvatarModule
	],
	providers: [UserService, JwtStrategy],
	controllers: [UserController],
	exports: [PassportModule, JwtStrategy]
})
export class UserModule {}
