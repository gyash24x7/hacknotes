import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	UseGuards,
	ValidationPipe
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { User } from "@prisma/client";
import { AuthUser } from "../user/auth-user.decorator";
import { CreateNoteInput, UpdateNoteColorInput } from "./note.inputs";
import { NoteService } from "./note.service";

@Controller("/api/note")
export class NoteController {
	constructor(private readonly noteService: NoteService) {}

	@UseGuards(AuthGuard("jwt"))
	@Get("/all")
	async getAllNotes(@AuthUser() { id }: User) {
		return this.noteService.getNotes(id);
	}

	@UseGuards(AuthGuard("jwt"))
	@Get("/:noteId")
	async getNote(@Param("noteId") noteId: string, @AuthUser() { id }: User) {
		return this.noteService.getNote(noteId, id);
	}

	@UseGuards(AuthGuard("jwt"))
	@Post("/create")
	async createNote(@Body() data: CreateNoteInput, @AuthUser() { id }: User) {
		return this.noteService.createNote(data, id);
	}

	@UseGuards(AuthGuard("jwt"))
	@Post("/:noteId/archive")
	async archiveNote(@Param("noteId") noteId: string, @AuthUser() { id }: User) {
		return this.noteService.archiveNote(noteId, id);
	}

	@UseGuards(AuthGuard("jwt"))
	@Post("/:noteId/:color")
	async updateColor(
		@Param(ValidationPipe) data: UpdateNoteColorInput,
		@AuthUser() { id }: User
	) {
		return this.noteService.updateColor(data, id);
	}
}
