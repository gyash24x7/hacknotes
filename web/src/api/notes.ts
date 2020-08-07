import client from "superagent";
import {
	CreateNoteInput,
	GetNotesFilter,
	Note,
	UpdateNoteInput
} from "../utils/types";

const defaultFilters = { archived: false, deleted: false };

export const getAllNotes = async (filters: GetNotesFilter = defaultFilters) => {
	const token = localStorage.getItem("authToken");
	const response = await client
		.get(`${process.env.REACT_APP_API_URL}/notes`)
		.query(filters)
		.set("Authorization" as any, token ? `Bearer ${token}` : "");
	return response.body as Note[];
};

export const createNote = async (data: CreateNoteInput) => {
	const token = localStorage.getItem("authToken");
	const response = await client
		.post(`${process.env.REACT_APP_API_URL}/notes/create`)
		.set("Authorization" as any, token ? `Bearer ${token}` : "")
		.send(data);

	return response.body as Note;
};

export const updateNote = async ({ noteId, ...data }: UpdateNoteInput) => {
	const token = localStorage.getItem("authToken");
	const response = await client
		.put(`${process.env.REACT_APP_API_URL}/notes/update/${noteId}`)
		.set("Authorization" as any, token ? `Bearer ${token}` : "")
		.send(data);

	return response.body as Note;
};
