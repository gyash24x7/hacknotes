import { colors } from "@atlaskit/theme";

export enum AsyncActionStatus {
	IDLE = "idle",
	LOADING = "loading",
	SUCCEEDED = "succeeded",
	FAILED = "failed"
}

export enum NoteActions {
	ALL_NOTES = "notes/all",
	CREATE_NOTE = "notes/create",
	UPDATE_NOTE = "notes/update"
}

export const NoteColors: Record<string, string> = {
	TRANSPARENT: colors.N0,
	VIOLET: colors.P75,
	INDIGO: colors.B75,
	BLUE: colors.T75,
	GREEN: colors.G75,
	YELLOW: colors.Y75,
	ORANGE: "#F9D3AE",
	RED: colors.R75,
	PINK: "#F9D8E8",
	BROWN: "#C6B7B0"
};

export type NoteFilters = {
	archived?: boolean;
};

export type NoteSliceState = {
	notes: Record<string, Note>;
	status: Record<NoteActions, AsyncActionStatus>;
	error: string | null;
	filters: NoteFilters;
};

export type Note = {
	id: string;
	title: string;
	archived: boolean;
	color: string;
	content: string;
	authorId: string;
	createdAt: string;
	updatedAt: string;
};

export type CreateNoteInput = {
	title: string;
	content: string;
};

export type UpdateNoteInput = {
	noteId: string;
	archived?: boolean;
	color?: string;
	content?: string;
	title?: string;
};

export enum UserActions {
	LOGIN = "user/login",
	SIGNUP = "user/signup",
	ME = "user/me",
	LOGOUT = "user/logout"
}

export type User = {
	id: string;
	name: string;
	email: string;
	username: string;
	avatar: string;
};

export type UserSliceState = {
	user: User | null;
	status: Record<UserActions, AsyncActionStatus>;
	error: string | null;
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
