import { createSlice } from "@reduxjs/toolkit";
import {
	AsyncActionStatus,
	Note,
	NoteActions,
	NoteSliceState
} from "../../utils/types";
import extraReducers from "./extraReducers";

let initialNotes: Record<string, Note> = {};

const note = createSlice({
	name: "notes",
	initialState: {
		notes: initialNotes,
		status: {
			[NoteActions.GET_ALL_NOTES]: AsyncActionStatus.IDLE,
			[NoteActions.CREATE_NOTE]: AsyncActionStatus.IDLE
		},
		error: null,
		filters: { archived: false, deleted: false }
	} as NoteSliceState,

	reducers: {
		setArchiveFilter(state, { payload }) {
			state.filters.archived = payload;
		},

		setDeleteFilter(state, { payload }) {
			state.filters.deleted = payload;
		}
	},

	extraReducers
});

export const noteReducer = note.reducer;

export const { setArchiveFilter, setDeleteFilter } = note.actions;
