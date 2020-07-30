import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateNoteInput, UpdateNoteInput } from "./note.inputs";

@Injectable()
export class NoteService {
	constructor(private readonly prismaService: PrismaService) {}

	async getNotes(authorId: string) {
		return this.prismaService.note.findMany({
			where: { authorId, archived: false },
			orderBy: { updatedAt: "desc" }
		});
	}

	async getArchivedNotes(authorId: string) {
		return this.prismaService.note.findMany({
			where: { authorId, archived: true },
			orderBy: { updatedAt: "desc" }
		});
	}

	async getNote(noteId: string, authorId: string) {
		const note = await this.prismaService.note.findOne({
			where: { id: noteId }
		});

		if (!note) throw new NotFoundException("Note not found!");
		if (note.authorId !== authorId)
			throw new NotFoundException("Access blocked by Owner!");

		return note;
	}

	async createNote(data: CreateNoteInput, authorId: string) {
		return this.prismaService.note.create({
			data: { ...data, author: { connect: { id: authorId } } }
		});
	}

	async updateNote(id: string, data: UpdateNoteInput, authorId: string) {
		let note = await this.prismaService.note.findOne({ where: { id } });

		if (!note) throw new NotFoundException("Note not found!");
		if (note.authorId !== authorId)
			throw new NotFoundException("Access blocked by Owner!");

		note = await this.prismaService.note.update({
			where: { id },
			data: { ...data, archived: Boolean(data.archived), updatedAt: new Date() }
		});
		return note;
	}
}
