import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateNoteInput, GetNotesInput, UpdateNoteInput } from "./note.inputs";

@Injectable()
export class NoteService {
	constructor(private readonly prismaService: PrismaService) {}

	async getNotes({ archived, deleted }: GetNotesInput, authorId: string) {
		return this.prismaService.note.findMany({
			where: { authorId, archived, deleted },
			orderBy: { createdAt: "desc" }
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
			data: {
				...data,
				updatedAt: new Date(),
				pinned: data.deleted ? false : data.archived ? false : data.pinned,
				archived: data.deleted ? false : data.pinned ? false : data.archived
			}
		});
		return note;
	}
}
