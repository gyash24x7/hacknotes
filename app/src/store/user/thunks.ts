import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "superagent";
import { getTokenFromAsyncStorage } from "../../utils";
import {
	CreateUserInput,
	User,
	UserActions,
	UserLoginInput
} from "../../utils/types";

export const login = createAsyncThunk(
	UserActions.LOGIN,
	async (data: UserLoginInput) => {
		const response = await client
			.post(`${process.env.REACT_APP_API_URL}/user/login`)
			.send(data);
		localStorage.setItem("authToken", response.body.token);
		return response.body.user;
	}
);

export const signup = createAsyncThunk(
	UserActions.SIGNUP,
	async (data: CreateUserInput) => {
		const response = await client
			.post(`${process.env.REACT_APP_API_URL}/user/signup`)
			.send(data);
		localStorage.setItem("authToken", response.body.token);
		return response.body.user;
	}
);

export const me = createAsyncThunk(UserActions.ME, async () => {
	const token = await getTokenFromAsyncStorage();
	const response = await client
		.get(`${process.env.REACT_APP_API_URL}/user/me`)
		.set("Authorization" as any, token ? `Bearer ${token}` : "");

	return response.body.me as User;
});

export const logout = createAsyncThunk(UserActions.LOGOUT, async () => {
	localStorage.removeItem("authToken");
	return null;
});

export const updateAvatar = createAsyncThunk(
	UserActions.UPDATE_AVATAR,
	async (data: { avatar: string }) => {
		const token = await getTokenFromAsyncStorage();
		const response = await client
			.post(`${process.env.REACT_APP_API_URL}/user/update`)
			.set("Authorization" as any, token ? `Bearer ${token}` : "")
			.send(data);

		return response.body as User;
	}
);
