import { AsyncStorage } from "react-native";
import client from "superagent";
import { CreateUserInput, User, UserLoginInput } from "../utils/types";

export const userLogin = async (data: UserLoginInput) => {
	const response = await client
		.post(`http://192.168.43.59:8000/user/login`)
		.send(data)
		.catch((err) => {
			throw new Error(err.response.body.message);
		});
	await AsyncStorage.setItem("authToken", response.body.token);

	return response.body.user as User;
};

export const userSignup = async (data: CreateUserInput) => {
	const response = await client
		.post(`http://192.168.43.59:8000/api/user/signup`)
		.send(data)
		.catch((err) => {
			throw new Error(err.response.body.message);
		});
	await AsyncStorage.setItem("authToken", response.body.token);

	return response.body.user;
};

export const me = async () => {
	const token = await AsyncStorage.getItem("authToken");
	const response = await client
		.get(`http://192.168.43.59:8000/api/user/me`)
		.set("Authorization" as any, token ? `Bearer ${token}` : "")
		.catch((err) => {
			throw new Error(err.response.body.message);
		});

	return response.body.me as User;
};

export const updateAvatar = async (data: { avatar: string }) => {
	const token = await AsyncStorage.getItem("authToken");
	const response = await client
		.post(`http://192.168.43.59:8000/api/user/update`)
		.set("Authorization" as any, token ? `Bearer ${token}` : "")
		.send(data)
		.catch((err) => {
			throw new Error(err.response.body.message);
		});

	return response.body as User;
};
