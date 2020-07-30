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

export enum NoteColor {
	TRANSPARENT = "#00000000",
	VIOLET = "#403294ff",
	INDIGO = "#0747a6ff",
	BLUE = "#00b8d9ff",
	GREEN = "#36b37eff",
	YELLOW = "#ffab00ff",
	ORANGE = "#ff5630ff",
	RED = "#de350bff",
	PINK = "##ff99c8ff"
}

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
	color?: NoteColor;
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
