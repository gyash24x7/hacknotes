import { useNavigation } from "@react-navigation/native";
import { Icon, Input, Spinner, Text } from "@ui-kitten/components";
import is from "is_js";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppButton } from "../components/AppButton";
import { AppContainer, HelperContainer } from "../components/AppContainer";
import { AppLogo } from "../components/AppLogo";
import {
	ButtonText,
	ErrorText,
	Heading,
	LinkText
} from "../components/AppTypography";
import { FormWrapper } from "../components/FormWrapper";
import { VerticalSpacer } from "../components/VerticalSpacer";
import { AppStore } from "../store";
import { signup } from "../store/user/thunks";
import { AsyncActionStatus, UserActions } from "../utils/types";

const usernameRegex = /^[a-zA-Z0-9]+$/;
const emailRegex = /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

export const SignupScreen = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [securePasswordEntry, setSecurePasswordEntry] = useState(true);
	const [errorMsg, setErrorMsg] = useState<string>();
	const dispatch = useDispatch();
	const signupStatus = useSelector<AppStore, AsyncActionStatus>(
		(store) => store.user.status[UserActions.SIGNUP]
	);
	const navigation = useNavigation();

	const validateInput = () => {
		switch (true) {
			case !name:
				return "Name is required!";
			case !email:
				return "Email is required!";
			case !emailRegex.test(email):
				return "Please enter a valid email!";
			case !username:
				return "Username is required!";
			case !usernameRegex.test(username):
				return "Username should contain only letters and numbers!";
			case !password:
				return "Password is required!";
			case password.length < 8:
				return "Password should be more than 8 characters!";
			default:
				return;
		}
	};

	const handleSubmit = () => {
		const error = validateInput();
		if (!error) dispatch(signup({ username, password, name, email }));
		setErrorMsg(error);
	};

	return (
		<AppContainer>
			<AppLogo />
			<VerticalSpacer size={20} />
			<Heading>Sign up</Heading>
			<VerticalSpacer size={15} />
			<FormWrapper>
				<Input
					placeholder="Name"
					size="large"
					value={name}
					onChangeText={setName}
					accessoryLeft={(props) => <Icon name="person-outline" {...props} />}
				/>
				<VerticalSpacer size={5} />
				<Input
					placeholder="Email"
					size="large"
					value={email}
					onChangeText={setEmail}
					accessoryLeft={(props) => <Icon name="email-outline" {...props} />}
				/>
				<VerticalSpacer size={5} />
				<Input
					placeholder="Username"
					size="large"
					value={username}
					onChangeText={setUsername}
					accessoryLeft={(props) => <Icon name="at-outline" {...props} />}
				/>
				<VerticalSpacer size={5} />
				<Input
					placeholder="Password"
					size="large"
					value={password}
					onChangeText={setPassword}
					secureTextEntry={securePasswordEntry}
					accessoryLeft={(props) => <Icon name="lock-outline" {...props} />}
					accessoryRight={(props) => (
						<Icon
							{...props}
							name={securePasswordEntry ? "eye-off-outline" : "eye-outline"}
							onPress={() => setSecurePasswordEntry(!securePasswordEntry)}
						/>
					)}
				/>
				<VerticalSpacer />
				<AppButton
					size="large"
					status="primary"
					children={() => {
						if (is.equal(signupStatus, AsyncActionStatus.LOADING))
							return <Spinner status="control" />;
						return <ButtonText>Submit</ButtonText>;
					}}
					onPress={handleSubmit}
				/>
				<VerticalSpacer />
				<HelperContainer>
					<Text>Already have an account?</Text>
					<LinkText onPress={() => navigation.navigate("Login")}>
						Login
					</LinkText>
				</HelperContainer>
				{errorMsg && <ErrorText status="danger">{errorMsg}</ErrorText>}
			</FormWrapper>
		</AppContainer>
	);
};
