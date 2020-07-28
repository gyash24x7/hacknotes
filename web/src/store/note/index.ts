import { createSlice } from "@reduxjs/toolkit";
import {
	AsyncActionStatus,
	Note,
	NoteActions,
	NoteSliceState
} from "../../utils/types";
import extraReducers from "./extraReducers";

let initialNotes: Record<string, Note> = {};

export const normalizeNotes = (notes: Note[]) => {
	let normalizedNotes: Record<string, Note> = {};
	notes.forEach((note) => {
		normalizedNotes[note.id] = note;
	});

	return normalizedNotes;
};

const note = createSlice({
	name: "notes",
	initialState: {
		notes: initialNotes,
		status: {
			[NoteActions.ALL_NOTES]: AsyncActionStatus.IDLE,
			[NoteActions.CREATE_NOTE]: AsyncActionStatus.IDLE
		},
		error: null
	} as NoteSliceState,

	reducers: {},

	extraReducers
});

export const noteReducer = note.reducer;
