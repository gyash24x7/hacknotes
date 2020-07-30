import { NoteColors } from "@prisma/client";
import { IsIn, IsOptional } from "class-validator";

const allowedColors: NoteColors[] = [
	"TRANSPARENT",
	"VIOLET",
	"INDIGO",
	"BLUE",
	"GREEN",
	"YELLOW",
	"ORANGE",
	"RED",
	"PINK"
];

export class CreateNoteInput {
	title: string;
	content: string;
}

export class UpdateNoteInput {
	@IsOptional() @IsIn(allowedColors) color?: NoteColors;
	@IsOptional() archived?: boolean;
	@IsOptional() content?: string;
	@IsOptional() title?: string;
}
