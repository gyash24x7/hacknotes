import { createSlice } from "@reduxjs/toolkit";

export interface IUser {
	id: string;
	name: string;
	email: string;
	username: string;
	avatar: string;
}

const userSlice = createSlice({
	name: "user",
	initialState: null as IUser | null,
	reducers: {
		logIn() {}
	}
});

export const userReducer = userSlice.reducer;
export const { logIn } = userSlice.actions;
