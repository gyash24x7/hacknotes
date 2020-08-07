import { AsyncStorage } from "react-native";
import client from "superagent";
import {
	CreateNoteInput,
	GetNotesFilter,
	Note,
	UpdateNoteInput
} from "../utils/types";

const defaultFilters = { archived: false, deleted: false };

export const getAllNotes = async (filters: GetNotesFilter = defaultFilters) => {
	const token = await AsyncStorage.getItem("authToken");
	const response = await client
		.get(`http://192.168.43.59:8000/api/notes`)
		.query(filters)
		.set("Authorization" as any, token ? `Bearer ${token}` : "");
	return response.body as Note[];
};

export const createNote = async (data: CreateNoteInput) => {
	const token = await AsyncStorage.getItem("authToken");
	const response = await client
		.post(`http://192.168.43.59:8000/api/notes/create`)
		.set("Authorization" as any, token ? `Bearer ${token}` : "")
		.send(data);

	return response.body as Note;
};

export const updateNote = async ({ noteId, ...data }: UpdateNoteInput) => {
	const token = await AsyncStorage.getItem("authToken");
	const response = await client
		.put(`http://192.168.43.59:8000/api/notes/update/${noteId}`)
		.set("Authorization" as any, token ? `Bearer ${token}` : "")
		.send(data);

	return response.body as Note;
};
