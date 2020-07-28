import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "superagent";
import {
	CreateUserInput,
	UserActions,
	UserLoginInput
} from "../../utils/types";

export const login = createAsyncThunk(
	UserActions.LOGIN,
	async (data: UserLoginInput) => {
		const response = await client
			.post("http://192.168.43.59:8000/api/user/login")
			.send(data);
		return response.body.user;
	}
);

export const signup = createAsyncThunk(
	UserActions.SIGNUP,
	async (data: CreateUserInput) => {
		const response = await client
			.post("http://192.168.43.59:8000/api/user/signup")
			.send(data);

		return response.body.user;
	}
);
