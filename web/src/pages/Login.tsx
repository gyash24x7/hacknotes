import Form, { ErrorMessage, Field, HelperMessage } from "@atlaskit/form";
import TextField from "@atlaskit/textfield";
import React, { Fragment, useState } from "react";
import { queryCache, useMutation } from "react-query";
import { Link } from "react-router-dom";
import { userLogin } from "../api/user";
import IntegratedLogo from "../assets/integrated-logo.svg";
import { BottomLink } from "../components/Auth/BottomLink";
import { FormCard } from "../components/Auth/FormCard";
import { AppButton } from "../components/common/AppButton";
import { AppError } from "../components/common/AppError";
import { IntegratedLogoContainer } from "../components/common/IntegratedLogo";
import { VerticalSpacer } from "../components/common/VerticalSpacer";
import { useAuth } from "../utils/context";

const usernameRegex = /^[a-zA-Z0-9]+$/;
export interface FormField {
	type: "text" | "email" | "password";
	label: string;
	validate: (val?: string) => string | undefined;
	helperMessage?: string;
}

export const loginFields: FormField[] = [
	{
		label: "Username",
		type: "text",
		validate: (val) =>
			!val
				? "Username is required!"
				: !usernameRegex.test(val)
				? "Only letters and numbers allowed!"
				: undefined,
		helperMessage: "You can use only letters and numbers"
	},
	{
		label: "Password",
		type: "password",
		helperMessage: "You can use letters, numbers and symbols only",
		validate: (val) =>
			!val
				? "Password is required!"
				: val.length < 8
				? "Password should be greater than 8 chracters!"
				: undefined
	}
];

export const LoginPage = () => {
	const { setIsAuthenticated } = useAuth();
	const [errorMsg, setErrorMsg] = useState<string>();
	const [login, { isLoading }] = useMutation(userLogin, {
		onError: (err) => {
			setErrorMsg(err.message);
		},
		onSuccess: (data) => {
			queryCache.setQueryData("me", data);
			setIsAuthenticated(true);
		}
	});

	const handleSubmit = ({ username, password }: any) => {
		login({ username, password });
	};

	return (
		<FormCard>
			<IntegratedLogoContainer>
				<img src={IntegratedLogo} alt="Hacknotes" />
			</IntegratedLogoContainer>
			<h1>Login</h1>
			<Form onSubmit={handleSubmit}>
				{({ formProps }) => (
					<form {...formProps} noValidate>
						{loginFields.map((field) => (
							<Field
								key={field.label}
								label={field.label}
								isRequired
								name={field.label.toLowerCase()}
								validate={field.validate}
								defaultValue=""
							>
								{({ fieldProps, error }) => (
									<Fragment>
										<TextField
											{...fieldProps}
											autoComplete="off"
											type={field.type}
										/>
										{error && <ErrorMessage>{error}</ErrorMessage>}
										{!error && field.helperMessage && (
											<HelperMessage>{field.helperMessage}</HelperMessage>
										)}
									</Fragment>
								)}
							</Field>
						))}
						<VerticalSpacer />
						<AppButton
							appearance="primary"
							type="submit"
							shouldFitContainer
							isLoading={isLoading}
						>
							Submit
						</AppButton>
						<VerticalSpacer />
						<BottomLink>
							<div>Don't have an account?</div>
							<Link to="/signup">Sign Up</Link>
						</BottomLink>
						<VerticalSpacer />
						{errorMsg && <AppError>{errorMsg}</AppError>}
					</form>
				)}
			</Form>
		</FormCard>
	);
};
