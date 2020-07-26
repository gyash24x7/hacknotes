export interface FormField {
	type: "text" | "email" | "password";
	label: string;
	validate: (val?: string) => string | undefined;
	helperMessage?: string;
}
