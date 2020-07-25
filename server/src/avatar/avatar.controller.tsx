import { Controller, Get, Header, Query, Res } from "@nestjs/common";
import Avataaars from "avataaars";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { AvatarService } from "./avatar.service";

@Controller("avatar")
export class AvatarController {
	constructor(private readonly avatarService: AvatarService) {}

	@Get()
	@Header("Content-Type", "image/svg+xml")
	async getAvatar(@Query() queryParams: any, @Res() res: any) {
		res.send(ReactDOMServer.renderToString(<Avataaars {...queryParams} />));
	}

	@Get("/random")
	@Header("Content-Type", "application/json")
	async getRandomAvatar(@Res() res: any) {
		const { url } = this.avatarService.generateAvatar();
		res.send({ url });
	}
}
