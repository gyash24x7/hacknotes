import {
	Body,
	Controller,
	Get,
	Logger,
	Param,
	Post,
	UseGuards,
	ValidationPipe
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { User } from "@prisma/client";
import { AuthUser } from "../user/auth-user.decorator";
import { CreateNoteInput, UpdateNoteInput } from "./note.inputs";
import { NoteService } from "./note.service";

@Controller("/api/notes")
export class NoteController {
	logger = new Logger("NoteController");
	constructor(private readonly noteService: NoteService) {}

	@UseGuards(AuthGuard("jwt"))
	@Get("/all")
	async getAllNotes(@AuthUser() { id }: User) {
		return this.noteService.getNotes(id);
	}

	@UseGuards(AuthGuard("jwt"))
	@Get("/archived")
	async getArchivedNotes(@AuthUser() { id }: User) {
		return this.noteService.getArchivedNotes(id);
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
	@Post("/update/:noteId")
	async updateColor(
		@AuthUser() { id }: User,
		@Param("noteId") noteId: string,
		@Body(ValidationPipe) data: UpdateNoteInput
	) {
		return this.noteService.updateNote(noteId, data, id);
	}
}
