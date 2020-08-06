import { colors } from "@atlaskit/theme";

export enum AsyncActionStatus {
	IDLE = "idle",
	LOADING = "loading",
	SUCCEEDED = "succeeded",
	FAILED = "failed"
}

export enum NoteActions {
	GET_ALL_NOTES = "notes/all",
	CREATE_NOTE = "notes/create",
	UPDATE_NOTE = "notes/update",
	GET_ARCHIVED_NOTES = "notes/archived",
	GET_DELETED_NOTES = "notes/deleted",
	ARCHIVE_NOTE = "notes/archive",
	PIN_NOTE = "notes/pin",
	UNPIN_NOTE = "notes/unpin",
	UNARCHIVE_NOTE = "notes/unarchive",
	DELETE_NOTE = "notes/delete",
	RESTORE_NOTE = "notes/restore"
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
	deleted?: boolean;
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

export enum UserActions {
	LOGIN = "user/login",
	SIGNUP = "user/signup",
	ME = "user/me",
	LOGOUT = "user/logout",
	UPDATE_AVATAR = "user/avatar"
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

export enum DrawerModes {
	PROFILE = "PROFILE",
	SETTINGS = "SETTINGS",
	CLOSED = "CLOSED"
}

export interface AppIconProps {
	filled?: boolean;
}

export interface GetNotesFilter {
	archived?: boolean;
	deleted?: boolean;
}
