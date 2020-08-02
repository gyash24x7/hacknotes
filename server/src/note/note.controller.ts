import {
	Body,
	Controller,
	Delete,
	Get,
	Logger,
	Param,
	Post,
	Put,
	UseGuards,
	ValidationPipe
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { User } from "@prisma/client";
import { AuthUser } from "../user/auth-user.decorator";
import { CreateNoteInput, UpdateNoteTextAndColorInput } from "./note.inputs";
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
	@Get("/deleted")
	async getDeletedNotes(@AuthUser() { id }: User) {
		return this.noteService.getDeletedNotes(id);
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
	@Put("/update/:noteId")
	async updateText(
		@AuthUser() { id }: User,
		@Param("noteId") noteId: string,
		@Body(ValidationPipe) data: UpdateNoteTextAndColorInput
	) {
		return this.noteService.updateNote(noteId, data, id);
	}

	@UseGuards(AuthGuard("jwt"))
	@Put("/archive/:noteId")
	async archiveNote(@AuthUser() { id }: User, @Param("noteId") noteId: string) {
		return this.noteService.updateNote(noteId, { archived: true }, id);
	}

	@UseGuards(AuthGuard("jwt"))
	@Put("/unarchive/:noteId")
	async unarchiveNote(
		@AuthUser() { id }: User,
		@Param("noteId") noteId: string
	) {
		return this.noteService.updateNote(noteId, { archived: false }, id);
	}

	@UseGuards(AuthGuard("jwt"))
	@Put("/pin/:noteId")
	async pinNote(@AuthUser() { id }: User, @Param("noteId") noteId: string) {
		return this.noteService.updateNote(noteId, { pinned: true }, id);
	}

	@UseGuards(AuthGuard("jwt"))
	@Put("/unpin/:noteId")
	async unpinNote(@AuthUser() { id }: User, @Param("noteId") noteId: string) {
		return this.noteService.updateNote(noteId, { pinned: false }, id);
	}

	@UseGuards(AuthGuard("jwt"))
	@Put("/restore/:noteId")
	async restoreNote(@AuthUser() { id }: User, @Param("noteId") noteId: string) {
		return this.noteService.updateNote(noteId, { deleted: false }, id);
	}

	@UseGuards(AuthGuard("jwt"))
	@Delete("/delete/:noteId")
	async deleteNote(@AuthUser() { id }: User, @Param("noteId") noteId: string) {
		return this.noteService.updateNote(noteId, { deleted: true }, id);
	}
}
