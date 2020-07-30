import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { filterNotes, normalizeNotes } from ".";
import {
	AsyncActionStatus,
	NoteActions,
	NoteSliceState
} from "../../utils/types";
import { addNewNote, fetchNotes, updateNote } from "./thunks";

export default (builder: ActionReducerMapBuilder<NoteSliceState>) => {
	builder.addCase(fetchNotes.pending, (state) => {
		state.status[NoteActions.ALL_NOTES] = AsyncActionStatus.LOADING;
	});

	builder.addCase(fetchNotes.rejected, (state, { error }) => {
		state.status[NoteActions.ALL_NOTES] = AsyncActionStatus.FAILED;
		state.error = error.message || null;
	});

	builder.addCase(fetchNotes.fulfilled, (state, { payload }) => {
		state.status[NoteActions.ALL_NOTES] = AsyncActionStatus.SUCCEEDED;
		state.notes = filterNotes(normalizeNotes(payload), state.filters);
	});

	builder.addCase(addNewNote.pending, (state) => {
		state.status[NoteActions.CREATE_NOTE] = AsyncActionStatus.LOADING;
	});

	builder.addCase(addNewNote.rejected, (state, { error }) => {
		state.status[NoteActions.CREATE_NOTE] = AsyncActionStatus.FAILED;
		state.error = error.message || null;
	});

	builder.addCase(addNewNote.fulfilled, (state, { payload }) => {
		state.status[NoteActions.CREATE_NOTE] = AsyncActionStatus.SUCCEEDED;
		state.notes[payload.id] = payload;
		state.notes = filterNotes(state.notes, state.filters);
	});

	builder.addCase(updateNote.pending, (state) => {
		state.status[NoteActions.UPDATE_NOTE] = AsyncActionStatus.LOADING;
	});

	builder.addCase(updateNote.rejected, (state, { error }) => {
		state.status[NoteActions.UPDATE_NOTE] = AsyncActionStatus.FAILED;
		state.error = error.message || null;
	});

	builder.addCase(updateNote.fulfilled, (state, { payload }) => {
		state.status[NoteActions.UPDATE_NOTE] = AsyncActionStatus.SUCCEEDED;
		state.notes[payload.id] = payload;
		state.notes = filterNotes(state.notes, state.filters);
	});
};
