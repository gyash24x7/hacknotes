import { NoteColor } from "@prisma/client";
import { IsIn } from "class-validator";

const allowedColors: NoteColor[] = [
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

export class UpdateNoteColorInput {
	noteId: string;
	@IsIn(allowedColors) color: NoteColor;
}
