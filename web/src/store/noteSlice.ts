import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "superagent";

export interface INote {
	id: string;
	title: string;
	archived: boolean;
	color: string;
	content: string;
	authorId: string;
}

export interface CreateNoteInput {
	title: string;
	content: string;
}

export enum NotesStatus {
	IDLE = "idle",
	LOADING = "loading",
	SUCCEEDED = "succeeded",
	FAILED = "failed"
}

export type NoteSliceState = {
	notes: Record<string, INote>;
	status: Record<string, NotesStatus>;
	error: string | null;
};

let initialNotes: Record<string, INote> = {};

export const normalizeNotes = (notes: INote[]) => {
	let normalizedNotes: Record<string, INote> = {};
	notes.forEach((note) => {
		normalizedNotes[note.id] = note;
	});

	return normalizedNotes;
};

export const fetchNotes = createAsyncThunk("notes/all", async () => {
	const response = await client
		.get("http://192.168.43.59:8000/api/notes/all")
		.set("Authorization" as any, `Bearer ${process.env.REACT_APP_TOKEN}`);
	return response.body as INote[];
});

export const addNewNote = createAsyncThunk(
	"notes/create",
	async (data: CreateNoteInput) => {
		const response = await client
			.post("http://192.168.43.59:8000/api/notes/create")
			.set("Authorization" as any, `Bearer ${process.env.REACT_APP_TOKEN}`)
			.send(data);
		return response.body as INote;
	}
);

const noteSlice = createSlice({
	name: "notes",
	initialState: {
		notes: initialNotes,
		status: { "notes/all": NotesStatus.IDLE, "notes/create": NotesStatus.IDLE },
		error: null
	} as NoteSliceState,

	reducers: {},

	extraReducers(builder) {
		builder.addCase(fetchNotes.pending, (state, { type }) => {
			state.status[type.slice(0, type.lastIndexOf("/"))] = NotesStatus.LOADING;
		});

		builder.addCase(fetchNotes.rejected, (state, { type, error }) => {
			state.status[type.slice(0, type.lastIndexOf("/"))] = NotesStatus.FAILED;
			state.error = error.message || null;
		});

		builder.addCase(fetchNotes.fulfilled, (state, { payload, type }) => {
			state.status[type.slice(0, type.lastIndexOf("/"))] =
				NotesStatus.SUCCEEDED;
			state.notes = normalizeNotes(payload);
		});

		builder.addCase(addNewNote.pending, (state, { type }) => {
			state.status[type.slice(0, type.lastIndexOf("/"))] = NotesStatus.LOADING;
		});

		builder.addCase(addNewNote.rejected, (state, { type, error }) => {
			state.status[type.slice(0, type.lastIndexOf("/"))] = NotesStatus.FAILED;
			state.error = error.message || null;
		});

		builder.addCase(addNewNote.fulfilled, (state, { payload, type }) => {
			state.status[type.slice(0, type.lastIndexOf("/"))] =
				NotesStatus.SUCCEEDED;
			state.notes[payload.id] = payload;
		});
	}
});

export const noteReducer = noteSlice.reducer;
