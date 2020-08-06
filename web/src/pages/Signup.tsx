import Form, { ErrorMessage, Field, HelperMessage } from "@atlaskit/form";
import TextField from "@atlaskit/textfield";
import React, { Fragment, useContext, useState } from "react";
import { queryCache, useMutation } from "react-query";
import { Link } from "react-router-dom";
import { userSignup } from "../api/user";
import IntegratedLogo from "../assets/integrated-logo.svg";
import { BottomLink } from "../components/Auth/BottomLink";
import { FormCard } from "../components/Auth/FormCard";
import { AppButton } from "../components/common/AppButton";
import { AppError } from "../components/common/AppError";
import { IntegratedLogoContainer } from "../components/common/IntegratedLogo";
import { VerticalSpacer } from "../components/common/VerticalSpacer";
import { AuthContext } from "../utils/context";
import { FormField, loginFields } from "./Login";

const emailRegex = /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

export const signupFields: FormField[] = [
	{
		label: "Name",
		type: "text",
		validate: (val) => (!val ? "Name is required!" : undefined)
	},
	{
		label: "Email",
		type: "email",
		validate: (val) =>
			!val
				? "Email is required!"
				: !emailRegex.test(val)
				? "Please enter a valid email!"
				: undefined
	},
	...loginFields
];

export const SignupPage = () => {
	const { setIsAuthenticated } = useContext(AuthContext);
	const [errorMsg, setErrorMsg] = useState<string>();
	const [signup, { isLoading }] = useMutation(userSignup, {
		onError: (err) => setErrorMsg(err.message),
		onSuccess: (data) => {
			queryCache.setQueryData("me", data);
			setIsAuthenticated(true);
		}
	});

	const handleSubmit = ({ username, password, email, name }: any) => {
		signup({ username, password, email, name });
	};

	return (
		<FormCard>
			<IntegratedLogoContainer>
				<img src={IntegratedLogo} alt="Hacknotes" />
			</IntegratedLogoContainer>
			<h1>Sign Up</h1>
			<Form onSubmit={handleSubmit}>
				{({ formProps }) => (
					<form {...formProps} noValidate>
						{signupFields.map((field) => (
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
							<div>Already have an account?</div>
							<Link to="/login">Login</Link>
						</BottomLink>
						{errorMsg && <AppError>{errorMsg}</AppError>}
					</form>
				)}
			</Form>
		</FormCard>
	);
};
