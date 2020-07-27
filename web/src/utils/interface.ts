export interface FormField {
	type: "text" | "email" | "password";
	label: string;
	validate: (val?: string) => string | undefined;
	helperMessage?: string;
}

export interface INote {
	id: string;
	title: string;
	archived: boolean;
	content: string;
	authorId: string;
}

export interface CreateNoteInput {
	title: string;
	content: string;
}

export interface AddNoteAction {}

export interface AppStore {
	notes: Record<string, INote>;
}
