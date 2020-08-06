import client from "superagent";
import { CreateNoteInput, Note, UpdateNoteInput } from "../utils/types";

export const getAllNotes = async () => {
	const token = localStorage.getItem("authToken");
	const response = await client
		.get(`${process.env.REACT_APP_API_URL}/notes/all`)
		.set("Authorization" as any, token ? `Bearer ${token}` : "");
	return response.body as Note[];
};

export const getArchivedNotes = async () => {
	const token = localStorage.getItem("authToken");
	const response = await client
		.get(`${process.env.REACT_APP_API_URL}/notes/archived`)
		.set("Authorization" as any, token ? `Bearer ${token}` : "");

	return response.body as Note[];
};

export const getDeletedNotes = async () => {
	const token = localStorage.getItem("authToken");
	const response = await client
		.get(`${process.env.REACT_APP_API_URL}/notes/deleted`)
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

export const archiveNote = async (noteId: string) => {
	const token = localStorage.getItem("authToken");
	const response = await client
		.put(`${process.env.REACT_APP_API_URL}/notes/archive/${noteId}`)
		.set("Authorization" as any, token ? `Bearer ${token}` : "");

	return response.body as Note;
};

export const unarchiveNote = async (noteId: string) => {
	const token = localStorage.getItem("authToken");
	const response = await client
		.put(`${process.env.REACT_APP_API_URL}/notes/unarchive/${noteId}`)
		.set("Authorization" as any, token ? `Bearer ${token}` : "");

	return response.body as Note;
};

export const pinNote = async (noteId: string) => {
	const token = localStorage.getItem("authToken");
	const response = await client
		.put(`${process.env.REACT_APP_API_URL}/notes/pin/${noteId}`)
		.set("Authorization" as any, token ? `Bearer ${token}` : "");

	return response.body as Note;
};

export const unpinNote = async (noteId: string) => {
	const token = localStorage.getItem("authToken");
	const response = await client
		.put(`${process.env.REACT_APP_API_URL}/notes/unpin/${noteId}`)
		.set("Authorization" as any, token ? `Bearer ${token}` : "");

	return response.body as Note;
};

export const deleteNote = async (noteId: string) => {
	const token = localStorage.getItem("authToken");
	const response = await client
		.delete(`${process.env.REACT_APP_API_URL}/notes/delete/${noteId}`)
		.set("Authorization" as any, token ? `Bearer ${token}` : "");

	return response.body as Note;
};

export const restoreNote = async (noteId: string) => {
	const token = localStorage.getItem("authToken");
	const response = await client
		.put(`${process.env.REACT_APP_API_URL}/notes/restore/${noteId}`)
		.set("Authorization" as any, token ? `Bearer ${token}` : "");

	return response.body as Note;
};
