import { NoteColors } from "@prisma/client";
import { IsBoolean, IsIn, IsOptional } from "class-validator";

const allowedColors: NoteColors[] = [
	"TRANSPARENT",
	"VIOLET",
	"INDIGO",
	"BLUE",
	"GREEN",
	"YELLOW",
	"ORANGE",
	"RED",
	"PINK",
	"BROWN"
];

export class CreateNoteInput {
	title: string;
	content: string;
}

export class UpdateNoteInput {
	@IsOptional() @IsIn(allowedColors) color?: NoteColors;
	@IsOptional() @IsBoolean() archived?: boolean;
	@IsOptional() @IsBoolean() pinned?: boolean;
	@IsOptional() content?: string;
	@IsOptional() title?: string;
}
