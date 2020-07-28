import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "superagent";
import { NotesStatus } from "./noteSlice";

export interface IUser {
	id: string;
	name: string;
	email: string;
	username: string;
	avatar: string;
}

export interface UserSliceState {
	user: IUser | null;
	status: Record<string, NotesStatus>;
	error: string | null;
}

export interface UserLoginInput {
	username: string;
	password: string;
}

export interface CreateUserInput {
	name: string;
	username: string;
	email: string;
	password: string;
}

export const login = createAsyncThunk(
	"user/login",
	async (data: UserLoginInput) => {
		const response = await client
			.post("http://192.168.43.59:8000/api/user/login")
			.send(data);
		return response.body.user;
	}
);

export const signup = createAsyncThunk(
	"user/signup",
	async (data: CreateUserInput) => {
		const response = await client
			.post("http://192.168.43.59:8000/api/user/signup")
			.send(data);

		return response.body.user;
	}
);

const userSlice = createSlice({
	name: "user",
	initialState: {
		user: null,
		error: null,
		status: { "user/login": NotesStatus.IDLE, "user/signup": NotesStatus.IDLE }
	} as UserSliceState,

	reducers: {},

	extraReducers(builder) {
		builder.addCase(login.pending, (state) => {
			state.status["user/login"] = NotesStatus.LOADING;
		});

		builder.addCase(login.rejected, (state, { error }) => {
			state.status["user/login"] = NotesStatus.FAILED;
			state.error = error.message || null;
		});

		builder.addCase(login.fulfilled, (state, { payload }) => {
			state.status["user/login"] = NotesStatus.SUCCEEDED;
			state.user = payload;
		});

		builder.addCase(signup.pending, (state) => {
			state.status["user/signup"] = NotesStatus.LOADING;
		});

		builder.addCase(signup.rejected, (state, { error }) => {
			state.status["user/signup"] = NotesStatus.FAILED;
			state.error = error.message || null;
		});

		builder.addCase(signup.fulfilled, (state, { payload }) => {
			state.status["user/signup"] = NotesStatus.SUCCEEDED;
			state.user = payload;
		});
	}
});

export const userReducer = userSlice.reducer;
