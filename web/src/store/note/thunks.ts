import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "superagent";
import { CreateNoteInput, Note, NoteActions } from "../../utils/types";

export const fetchNotes = createAsyncThunk(NoteActions.ALL_NOTES, async () => {
	const response = await client
		.get("http://192.168.43.59:8000/api/notes/all")
		.set("Authorization" as any, `Bearer ${process.env.REACT_APP_TOKEN}`);
	return response.body as Note[];
});

export const addNewNote = createAsyncThunk(
	NoteActions.CREATE_NOTE,
	async (data: CreateNoteInput) => {
		const response = await client
			.post("http://192.168.43.59:8000/api/notes/create")
			.set("Authorization" as any, `Bearer ${process.env.REACT_APP_TOKEN}`)
			.send(data);
		return response.body as Note;
	}
);
