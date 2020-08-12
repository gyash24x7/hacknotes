import { DrawerScreenProps } from "@react-navigation/drawer";

export const NoteColors: Record<string, string> = {
	TRANSPARENT: "#FFFFFF",
	VIOLET: "#C0B6F2",
	INDIGO: "#B3D4FF",
	BLUE: "#B3F5FF",
	GREEN: "#ABF5D1",
	YELLOW: "#FFF0B3",
	ORANGE: "#F9D3AE",
	RED: "#FFBDAD",
	PINK: "#F9D8E8",
	BROWN: "#C6B7B0"
};

export type NoteFilters = {
	archived?: boolean;
	deleted?: boolean;
};

export type Note = {
	id: string;
	title: string;
	archived: boolean;
	pinned: boolean;
	color: string;
	content: string;
	authorId: string;
	createdAt: string;
	updatedAt: string;
	deleted: boolean;
};

export type CreateNoteInput = {
	title: string;
	content: string;
};

export type UpdateNoteInput = {
	noteId: string;
	color?: string;
	content?: string;
	title?: string;
	archived?: boolean;
	pinned?: boolean;
	deleted?: boolean;
};

export type User = {
	id: string;
	name: string;
	email: string;
	username: string;
	avatar: string;
};

export type UserLoginInput = {
	username: string;
	password: string;
};

export type CreateUserInput = {
	name: string;
	username: string;
	email: string;
	password: string;
};

export interface GetNotesFilter {
	archived?: boolean;
	deleted?: boolean;
}

export type FlagData = {
	description?: string;
	appearance: "success" | "error";
	title: string;
};

export type AppScreenParamList = {
	Home: undefined;
	Archive: undefined;
	Trash: undefined;
	Profile: undefined;
	ViewNote: { note?: Note };
};

export const defaultNote: Note = {
	id: "defaultNote",
	title: "",
	content: "",
	archived: false,
	pinned: false,
	deleted: false,
	color: "TRANSPARENT",
	authorId: "defaultAuthorId",
	createdAt: new Date().toISOString(),
	updatedAt: new Date().toISOString()
};

export interface NoteActionProps {
	note: Note;
	setNote: (_note: Note) => void;
}

export type NoteScreenProps = DrawerScreenProps<AppScreenParamList, "ViewNote">;
