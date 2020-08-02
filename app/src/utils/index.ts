import { AsyncStorage } from "react-native";
import { Note, NoteFilters } from "./types";

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
			if (
				is.equal(note.archived, filters.archived) &&
				is.equal(note.deleted, filters.deleted)
			) {
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

export const getTokenFromAsyncStorage = async () => {
	const token = await AsyncStorage.getItem("authToken");
	return token;
};
