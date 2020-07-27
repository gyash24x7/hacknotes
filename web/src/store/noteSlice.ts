import { createSlice, nanoid } from "@reduxjs/toolkit";
import { INote } from "../utils/interface";
import lorem from "../utils/lorem";

const authorId = nanoid();

let initialState: Record<string, INote> = {};

[...Array(20)].forEach(() => {
	let id = nanoid();
	initialState[id] = {
		id,
		title: lorem.generateWords(Math.round(3 * Math.random())),
		content: lorem.generateParagraphs(Math.round(3 * Math.random())),
		archived: false,
		authorId
	};
});

const noteSlice = createSlice({
	name: "notes",
	initialState,
	reducers: {
		addNote(state, action) {
			const id = nanoid();
			state[id] = action.payload as INote;
		},

		archiveNote(state, action) {
			state[action.payload.id].archived = true;
		}
	}
});

export const noteReducer = noteSlice.reducer;

export const { addNote, archiveNote } = noteSlice.actions;
