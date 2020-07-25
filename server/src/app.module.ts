import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppService } from "./app.service";
import { AvatarModule } from './avatar/avatar.module';

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true }), AvatarModule],
	providers: [AppService]
})
export class AppModule {}
