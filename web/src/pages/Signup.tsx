import Form, { ErrorMessage, Field, HelperMessage } from "@atlaskit/form";
import TextField from "@atlaskit/textfield";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import IntegratedLogo from "../assets/integrated-logo.svg";
import { AppButton } from "../components/AppButton";
import { AppError } from "../components/AppError";
import { BottomLink } from "../components/BottomLink";
import { FormCard } from "../components/FormCard";
import { IntegratedLogoContainer } from "../components/IntegratedLogo";
import { VerticalSpacer } from "../components/VerticalSpacer";
import { useAuth } from "../utils/context";
import { useSignupMutation } from "../utils/hooks";
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
	const { setIsAuthenticated } = useAuth();
	const [errorMsg, setErrorMsg] = useState<string>();
	const [signup, { isLoading }] = useSignupMutation({
		onError: (err) => setErrorMsg(err.message),
		onSuccess: () => setIsAuthenticated(true)
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
