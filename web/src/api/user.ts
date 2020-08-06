import client from "superagent";
import { CreateUserInput, User, UserLoginInput } from "../utils/types";

export const userLogin = async (data: UserLoginInput) => {
	const response = await client
		.post(`${process.env.REACT_APP_API_URL}/user/login`)
		.send(data)
		.catch((err) => {
			throw new Error(err.response.body.message);
		});
	localStorage.setItem("authToken", response.body.token);

	return response.body.user as User;
};

export const userSignup = async (data: CreateUserInput) => {
	const response = await client
		.post(`${process.env.REACT_APP_API_URL}/user/signup`)
		.send(data)
		.catch((err) => {
			throw new Error(err.response.body.message);
		});
	localStorage.setItem("authToken", response.body.token);

	return response.body.user;
};

export const me = async () => {
	const token = localStorage.getItem("authToken");
	const response = await client
		.get(`${process.env.REACT_APP_API_URL}/user/me`)
		.set("Authorization" as any, token ? `Bearer ${token}` : "")
		.catch((err) => {
			throw new Error(err.response.body.message);
		});

	return response.body.me as User;
};

export const updateAvatar = async (data: { avatar: string }) => {
	const token = localStorage.getItem("authToken");
	const response = await client
		.post(`${process.env.REACT_APP_API_URL}/user/update`)
		.set("Authorization" as any, token ? `Bearer ${token}` : "")
		.send(data)
		.catch((err) => {
			throw new Error(err.response.body.message);
		});

	return response.body as User;
};
