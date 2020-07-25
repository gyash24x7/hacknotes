import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AvatarModule } from "./avatar/avatar.module";
import { PrismaModule } from "./prisma/prisma.module";
import { UserModule } from "./user/user.module";

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		AvatarModule,
		UserModule,
		PrismaModule
	]
})
export class AppModule {}
