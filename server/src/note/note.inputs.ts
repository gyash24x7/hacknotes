import { NoteColors } from "@prisma/client";
import { IsBoolean, IsBooleanString, IsIn, IsOptional } from "class-validator";

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

export class UpdateNoteTextAndColorInput {
	@IsOptional() content?: string;
	@IsOptional() title?: string;
	@IsOptional() @IsIn(allowedColors) color?: NoteColors;
}

export class UpdateNoteInput {
	@IsOptional() @IsIn(allowedColors) color?: NoteColors;
	@IsOptional() @IsBoolean() archived?: boolean;
	@IsOptional() @IsBoolean() pinned?: boolean;
	@IsOptional() @IsBoolean() deleted?: boolean;
	@IsOptional() content?: string;
	@IsOptional() title?: string;
}

export class GetNotesInput {
	@IsOptional() @IsBooleanString() archived?: boolean;
	@IsOptional() @IsBooleanString() deleted?: boolean;
}
