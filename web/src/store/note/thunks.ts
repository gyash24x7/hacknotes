import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "superagent";
import {
	CreateNoteInput,
	Note,
	NoteActions,
	UpdateNoteInput
} from "../../utils/types";

export const fetchNotes = createAsyncThunk(
	NoteActions.GET_ALL_NOTES,
	async () => {
		const token = localStorage.getItem("authToken");
		const response = await client
			.get(`${process.env.REACT_APP_API_URL}/notes/all`)
			.set("Authorization" as any, token ? `Bearer ${token}` : "");
		return response.body as Note[];
	}
);

export const fetchArchivedNotes = createAsyncThunk(
	NoteActions.GET_ARCHIVED_NOTES,
	async () => {
		const token = localStorage.getItem("authToken");
		const response = await client
			.get(`${process.env.REACT_APP_API_URL}/notes/archived`)
			.set("Authorization" as any, token ? `Bearer ${token}` : "");
		return response.body as Note[];
	}
);

export const fetchDeletedNotes = createAsyncThunk(
	NoteActions.GET_DELETED_NOTES,
	async () => {
		const token = localStorage.getItem("authToken");
		const response = await client
			.get(`${process.env.REACT_APP_API_URL}/notes/deleted`)
			.set("Authorization" as any, token ? `Bearer ${token}` : "");
		return response.body as Note[];
	}
);

export const addNewNote = createAsyncThunk(
	NoteActions.CREATE_NOTE,
	async (data: CreateNoteInput) => {
		const token = localStorage.getItem("authToken");
		const response = await client
			.post(`${process.env.REACT_APP_API_URL}/notes/create`)
			.set("Authorization" as any, token ? `Bearer ${token}` : "")
			.send(data);
		return response.body as Note;
	}
);

export const updateNote = createAsyncThunk(
	NoteActions.UPDATE_NOTE,
	async ({ noteId, ...data }: UpdateNoteInput) => {
		const token = localStorage.getItem("authToken");
		const response = await client
			.put(`${process.env.REACT_APP_API_URL}/notes/update/${noteId}`)
			.set("Authorization" as any, token ? `Bearer ${token}` : "")
			.send(data);

		return response.body as Note;
	}
);

export const archiveNote = createAsyncThunk(
	NoteActions.ARCHIVE_NOTE,
	async (noteId: string) => {
		const token = localStorage.getItem("authToken");
		const response = await client
			.put(`${process.env.REACT_APP_API_URL}/notes/archive/${noteId}`)
			.set("Authorization" as any, token ? `Bearer ${token}` : "");

		return response.body as Note;
	}
);

export const unarchiveNote = createAsyncThunk(
	NoteActions.UNARCHIVE_NOTE,
	async (noteId: string) => {
		const token = localStorage.getItem("authToken");
		const response = await client
			.put(`${process.env.REACT_APP_API_URL}/notes/unarchive/${noteId}`)
			.set("Authorization" as any, token ? `Bearer ${token}` : "");

		return response.body as Note;
	}
);

export const pinNote = createAsyncThunk(
	NoteActions.PIN_NOTE,
	async (noteId: string) => {
		const token = localStorage.getItem("authToken");
		const response = await client
			.put(`${process.env.REACT_APP_API_URL}/notes/pin/${noteId}`)
			.set("Authorization" as any, token ? `Bearer ${token}` : "");

		return response.body as Note;
	}
);

export const unpinNote = createAsyncThunk(
	NoteActions.UNPIN_NOTE,
	async (noteId: string) => {
		const token = localStorage.getItem("authToken");
		const response = await client
			.put(`${process.env.REACT_APP_API_URL}/notes/unpin/${noteId}`)
			.set("Authorization" as any, token ? `Bearer ${token}` : "");

		return response.body as Note;
	}
);

export const deleteNote = createAsyncThunk(
	NoteActions.DELETE_NOTE,
	async (noteId: string) => {
		const token = localStorage.getItem("authToken");
		const response = await client
			.delete(`${process.env.REACT_APP_API_URL}/notes/delete/${noteId}`)
			.set("Authorization" as any, token ? `Bearer ${token}` : "");

		return response.body as Note;
	}
);

export const restoreNote = createAsyncThunk(
	NoteActions.RESTORE_NOTE,
	async (noteId: string) => {
		const token = localStorage.getItem("authToken");
		const response = await client
			.put(`${process.env.REACT_APP_API_URL}/notes/restore/${noteId}`)
			.set("Authorization" as any, token ? `Bearer ${token}` : "");

		return response.body as Note;
	}
);
