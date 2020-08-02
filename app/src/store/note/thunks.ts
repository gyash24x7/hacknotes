import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "superagent";
import { getTokenFromAsyncStorage } from "../../utils";
import {
	CreateNoteInput,
	Note,
	NoteActions,
	UpdateNoteInput
} from "../../utils/types";

export const fetchNotes = createAsyncThunk(
	NoteActions.GET_ALL_NOTES,
	async () => {
		const token = await getTokenFromAsyncStorage();
		const response = await client
			.get(`http://192.168.43.59:8000/api/notes/all`)
			.set("Authorization" as any, token ? `Bearer ${token}` : "");
		return response.body as Note[];
	}
);

export const fetchArchivedNotes = createAsyncThunk(
	NoteActions.GET_ARCHIVED_NOTES,
	async () => {
		const token = await getTokenFromAsyncStorage();
		const response = await client
			.get(`http://192.168.43.59:8000/api/notes/archived`)
			.set("Authorization" as any, token ? `Bearer ${token}` : "");
		return response.body as Note[];
	}
);

export const fetchDeletedNotes = createAsyncThunk(
	NoteActions.GET_DELETED_NOTES,
	async () => {
		const token = await getTokenFromAsyncStorage();
		const response = await client
			.get(`http://192.168.43.59:8000/api/notes/deleted`)
			.set("Authorization" as any, token ? `Bearer ${token}` : "");
		return response.body as Note[];
	}
);

export const addNewNote = createAsyncThunk(
	NoteActions.CREATE_NOTE,
	async (data: CreateNoteInput) => {
		const token = await getTokenFromAsyncStorage();
		const response = await client
			.post(`http://192.168.43.59:8000/api/notes/create`)
			.set("Authorization" as any, token ? `Bearer ${token}` : "")
			.send(data);
		return response.body as Note;
	}
);

export const updateNote = createAsyncThunk(
	NoteActions.UPDATE_NOTE,
	async ({ noteId, ...data }: UpdateNoteInput) => {
		const token = await getTokenFromAsyncStorage();
		const response = await client
			.put(`http://192.168.43.59:8000/api/notes/update/${noteId}`)
			.set("Authorization" as any, token ? `Bearer ${token}` : "")
			.send(data);

		return response.body as Note;
	}
);

export const archiveNote = createAsyncThunk(
	NoteActions.ARCHIVE_NOTE,
	async (noteId: string) => {
		const token = await getTokenFromAsyncStorage();
		const response = await client
			.put(`http://192.168.43.59:8000/api/notes/archive/${noteId}`)
			.set("Authorization" as any, token ? `Bearer ${token}` : "");

		return response.body as Note;
	}
);

export const unarchiveNote = createAsyncThunk(
	NoteActions.UNARCHIVE_NOTE,
	async (noteId: string) => {
		const token = await getTokenFromAsyncStorage();
		const response = await client
			.put(`http://192.168.43.59:8000/api/notes/unarchive/${noteId}`)
			.set("Authorization" as any, token ? `Bearer ${token}` : "");

		return response.body as Note;
	}
);

export const pinNote = createAsyncThunk(
	NoteActions.PIN_NOTE,
	async (noteId: string) => {
		const token = await getTokenFromAsyncStorage();
		const response = await client
			.put(`http://192.168.43.59:8000/api/notes/pin/${noteId}`)
			.set("Authorization" as any, token ? `Bearer ${token}` : "");

		return response.body as Note;
	}
);

export const unpinNote = createAsyncThunk(
	NoteActions.UNPIN_NOTE,
	async (noteId: string) => {
		const token = await getTokenFromAsyncStorage();
		const response = await client
			.put(`http://192.168.43.59:8000/api/notes/unpin/${noteId}`)
			.set("Authorization" as any, token ? `Bearer ${token}` : "");

		return response.body as Note;
	}
);

export const deleteNote = createAsyncThunk(
	NoteActions.DELETE_NOTE,
	async (noteId: string) => {
		const token = await getTokenFromAsyncStorage();
		const response = await client
			.delete(`http://192.168.43.59:8000/api/notes/delete/${noteId}`)
			.set("Authorization" as any, token ? `Bearer ${token}` : "");

		return response.body as Note;
	}
);

export const restoreNote = createAsyncThunk(
	NoteActions.RESTORE_NOTE,
	async (noteId: string) => {
		const token = await getTokenFromAsyncStorage();
		const response = await client
			.put(`http://192.168.43.59:8000/api/notes/restore/${noteId}`)
			.set("Authorization" as any, token ? `Bearer ${token}` : "");

		return response.body as Note;
	}
);
