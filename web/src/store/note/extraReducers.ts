import { ActionReducerMapBuilder, AsyncThunk } from "@reduxjs/toolkit";
import { filterNotes, normalizeNotes, sortNotes } from ".";
import {
	AsyncActionStatus,
	CreateNoteInput,
	Note,
	NoteActions,
	NoteSliceState,
	UpdateNoteInput
} from "../../utils/types";
import {
	addNewNote,
	archiveNote,
	deleteNote,
	fetchArchivedNotes,
	fetchDeletedNotes,
	fetchNotes,
	pinNote,
	restoreNote,
	unarchiveNote,
	unpinNote,
	updateNote
} from "./thunks";

const mutationReducerMap: Record<
	string,
	| AsyncThunk<Note, string, {}>
	| AsyncThunk<Note, UpdateNoteInput, {}>
	| AsyncThunk<Note, CreateNoteInput, {}>
> = {
	[NoteActions.ARCHIVE_NOTE]: archiveNote,
	[NoteActions.UNARCHIVE_NOTE]: unarchiveNote,
	[NoteActions.PIN_NOTE]: pinNote,
	[NoteActions.UNPIN_NOTE]: unpinNote,
	[NoteActions.DELETE_NOTE]: deleteNote,
	[NoteActions.RESTORE_NOTE]: restoreNote,
	[NoteActions.UPDATE_NOTE]: updateNote,
	[NoteActions.CREATE_NOTE]: addNewNote
};

const queryReducerMap: Record<string, AsyncThunk<Note[], void, {}>> = {
	[NoteActions.GET_ALL_NOTES]: fetchNotes,
	[NoteActions.GET_ARCHIVED_NOTES]: fetchArchivedNotes,
	[NoteActions.GET_DELETED_NOTES]: fetchDeletedNotes
};

export default (builder: ActionReducerMapBuilder<NoteSliceState>) => {
	// QUERY REDUCERS

	Object.keys(queryReducerMap).forEach((actionType) => {
		const action = queryReducerMap[actionType];
		builder.addCase(action.pending, (state) => {
			state.status[actionType as NoteActions] = AsyncActionStatus.LOADING;
		});

		builder.addCase(action.rejected, (state, { error }) => {
			state.status[actionType as NoteActions] = AsyncActionStatus.FAILED;
			state.error = error.message || null;
		});

		builder.addCase(action.fulfilled, (state, { payload }) => {
			state.status[actionType as NoteActions] = AsyncActionStatus.SUCCEEDED;
			state.notes = sortNotes(
				filterNotes(normalizeNotes(payload), state.filters)
			);
		});
	});

	// MUTATION REDUCERS

	Object.keys(mutationReducerMap).forEach((actionType) => {
		const action = mutationReducerMap[actionType];

		builder.addCase(action.pending, (state) => {
			state.status[actionType as NoteActions] = AsyncActionStatus.LOADING;
		});

		builder.addCase(action.rejected, (state, { error }) => {
			state.status[actionType as NoteActions] = AsyncActionStatus.FAILED;
			state.error = error.message || null;
		});

		builder.addCase(action.fulfilled, (state, { payload }) => {
			state.status[actionType as NoteActions] = AsyncActionStatus.SUCCEEDED;
			state.notes[payload.id] = payload;
			state.notes = sortNotes(filterNotes(state.notes, state.filters));
		});
	});
};
