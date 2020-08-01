import { createSlice } from "@reduxjs/toolkit";
import is from "is_js";
import {
	AsyncActionStatus,
	Note,
	NoteActions,
	NoteFilters,
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

export const filterNotes = (
	notes: Record<string, Note>,
	filters: NoteFilters
) => {
	const filteredNotes: Record<string, Note> = {};
	for (const noteId in notes) {
		if (Object.prototype.hasOwnProperty.call(notes, noteId)) {
			const note = notes[noteId];
			if (is.equal(note.archived, filters.archived)) {
				filteredNotes[noteId] = { ...note };
			}
		}
	}

	return filteredNotes;
};

export const sortNotes = (notes: Record<string, Note>) => {
	const sortedNotes: Record<string, Note> = {};
	Object.keys(notes)
		.map((id) => notes[id])
		.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
		.forEach((note) => (sortedNotes[note.id] = note));

	return sortedNotes;
};

const note = createSlice({
	name: "notes",
	initialState: {
		notes: initialNotes,
		status: {
			[NoteActions.ALL_NOTES]: AsyncActionStatus.IDLE,
			[NoteActions.CREATE_NOTE]: AsyncActionStatus.IDLE
		},
		error: null,
		filters: { archived: false }
	} as NoteSliceState,

	reducers: {
		setArchiveFilter(state, { payload }) {
			state.filters.archived = payload;
		}
	},

	extraReducers
});

export const noteReducer = note.reducer;

export const { setArchiveFilter } = note.actions;
