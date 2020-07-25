import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient
	implements OnModuleInit, OnModuleDestroy {
	constructor(configService: ConfigService) {
		super({
			datasources: { db: configService.get("DATABASE_URL") },
			log: ["error", "info", "query", "warn"]
		});
	}

	async onModuleInit() {
		await this.connect();
	}

	async onModuleDestroy() {
		await this.disconnect();
	}
}
