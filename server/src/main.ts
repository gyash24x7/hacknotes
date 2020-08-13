import { NestFactory } from "@nestjs/core";
import {
	FastifyAdapter,
	NestFastifyApplication
} from "@nestjs/platform-fastify";
import helmet from "helmet";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter()
	);

	let host =
		process.env.NODE_ENV !== "production" ? "192.168.43.59" : "localhost";

	app.use(helmet());
	app.enableCors({
		origin: [
			"http://192.168.43.59:3000",
			"http://localhost:3000",
			"https://hacknotes.yashgupta.dev"
		],
		credentials: true
	});

	await app.listen(9000, host);
}
bootstrap();
