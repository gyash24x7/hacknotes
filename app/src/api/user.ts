import AsyncStorage from "@react-native-community/async-storage";
import client from "superagent";
import { CreateUserInput, User, UserLoginInput } from "../utils/types";

export const userLogin = async (data: UserLoginInput) => {
	const response = await client
		.post(`https://hacknotes-server.yashgupta.dev/api/user/login`)
		.send(data);
	await AsyncStorage.setItem("authToken", response.body.token);

	return response.body.user as User;
};

export const userSignup = async (data: CreateUserInput) => {
	const response = await client
		.post(`https://hacknotes-server.yashgupta.dev/api/user/signup`)
		.send(data);
	await AsyncStorage.setItem("authToken", response.body.token);

	return response.body.user;
};

export const me = async () => {
	const token = await AsyncStorage.getItem("authToken");
	const response = await client
		.get(`https://hacknotes-server.yashgupta.dev/api/user/me`)
		.set("Authorization" as any, token ? `Bearer ${token}` : "");

	return response.body.me as User;
};

export const updateAvatar = async (data: { avatar: string }) => {
	const token = await AsyncStorage.getItem("authToken");
	const response = await client
		.post(`https://hacknotes-server.yashgupta.dev/api/user/update`)
		.set("Authorization" as any, token ? `Bearer ${token}` : "")
		.send(data);

	return response.body as User;
};
