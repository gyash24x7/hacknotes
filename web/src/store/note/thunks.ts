import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "superagent";
import {
	CreateNoteInput,
	Note,
	NoteActions,
	UpdateNoteInput
} from "../../utils/types";

export const fetchNotes = createAsyncThunk(NoteActions.ALL_NOTES, async () => {
	const token = localStorage.getItem("authToken");
	const response = await client
		.get(`${process.env.REACT_APP_API_URL}/notes/all`)
		.set("Authorization" as any, token ? `Bearer ${token}` : "");
	return response.body as Note[];
});

export const fetchArchivedNotes = createAsyncThunk(
	NoteActions.ARCHIVED_NOTES,
	async () => {
		const token = localStorage.getItem("authToken");
		const response = await client
			.get(`${process.env.REACT_APP_API_URL}/notes/archived`)
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
			.post(`${process.env.REACT_APP_API_URL}/notes/update/${noteId}`)
			.set("Authorization" as any, token ? `Bearer ${token}` : "")
			.send(data);

		return response.body as Note;
	}
);
