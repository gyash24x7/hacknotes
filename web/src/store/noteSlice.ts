import {
	createAsyncThunk,
	createSlice,
	nanoid,
	PayloadAction
} from "@reduxjs/toolkit";
import client from "superagent";

export interface INote {
	id: string;
	title: string;
	archived: boolean;
	color: string;
	content: string;
	authorId: string;
}

export enum NotesStatus {
	IDLE = "idle",
	LOADING = "loading",
	SUCCEEDED = "succeeded",
	FAILED = "failed"
}

export type NoteSliceState = {
	notes: Record<string, INote>;
	status: NotesStatus;
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

export const fetchNotes = createAsyncThunk("notes/getNotes", async () => {
	const response = await client
		.get("http://192.168.43.59:8000/api/note/all")
		.set("Authorization" as any, `Bearer ${process.env.REACT_APP_TOKEN}`);
	return response.body as INote[];
});

const noteSlice = createSlice({
	name: "notes",
	initialState: {
		notes: initialNotes,
		status: "idle",
		error: null
	} as NoteSliceState,

	reducers: {
		addNote: {
			reducer({ notes }, action: PayloadAction<INote>) {
				notes[action.payload.id] = action.payload as INote;
			},

			prepare(title: string, content: string, authorId: string) {
				return {
					payload: {
						id: nanoid(),
						title,
						content,
						archived: false,
						authorId,
						color: "TRANSPARENT"
					}
				};
			}
		},

		archiveNote({ notes }, action) {
			notes[action.payload.id].archived = true;
		}
	},

	extraReducers(builder) {
		builder.addCase(fetchNotes.pending, (state) => {
			state.status = NotesStatus.LOADING;
		});

		builder.addCase(fetchNotes.rejected, (state, action) => {
			state.status = NotesStatus.FAILED;
			state.error = action.error.message || null;
		});

		builder.addCase(fetchNotes.fulfilled, (state, { payload }) => {
			state.status = NotesStatus.SUCCEEDED;
			state.notes = normalizeNotes(payload);
		});
	}
});

export const noteReducer = noteSlice.reducer;

export const { addNote, archiveNote } = noteSlice.actions;
