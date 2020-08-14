import AsyncStorage from "@react-native-community/async-storage";
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
		.get(`https://hacknotes-server.yashgupta.dev/api/notes`)
		.query(filters)
		.set("Authorization" as any, token ? `Bearer ${token}` : "");
	return response.body as Note[];
};

export const createNote = async (data: CreateNoteInput) => {
	const token = await AsyncStorage.getItem("authToken");
	const response = await client
		.post(`https://hacknotes-server.yashgupta.dev/api/notes/create`)
		.set("Authorization" as any, token ? `Bearer ${token}` : "")
		.send(data);

	return response.body as Note;
};

export const updateNote = async ({ noteId, ...data }: UpdateNoteInput) => {
	const token = await AsyncStorage.getItem("authToken");
	const response = await client
		.put(`https://hacknotes-server.yashgupta.dev/api/notes/update/${noteId}`)
		.set("Authorization" as any, token ? `Bearer ${token}` : "")
		.send(data);

	return response.body as Note;
};
