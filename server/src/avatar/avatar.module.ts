import { Module } from "@nestjs/common";
import { AvatarController } from "./avatar.controller";
import { AvatarService } from "./avatar.service";

@Module({
	providers: [AvatarService],
	controllers: [AvatarController],
	exports: [AvatarService]
})
export class AvatarModule {}
