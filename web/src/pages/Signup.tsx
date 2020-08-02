import Form, { ErrorMessage, Field, HelperMessage } from "@atlaskit/form";
import TextField from "@atlaskit/textfield";
import is from "is_js";
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import IntegratedLogo from "../assets/integrated-logo.svg";
import { BottomLink } from "../components/Auth/BottomLink";
import { FormCard } from "../components/Auth/FormCard";
import { AppButton } from "../components/common/AppButton";
import { IntegratedLogoContainer } from "../components/common/IntegratedLogo";
import { VerticalSpacer } from "../components/common/VerticalSpacer";
import { AppStore } from "../store";
import { signup } from "../store/user/thunks";
import { AsyncActionStatus, UserActions } from "../utils/types";
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
	const dispatch = useDispatch();
	const signupStatus = useSelector<AppStore, AsyncActionStatus>(
		(store) => store.user.status[UserActions.SIGNUP]
	);

	const handleSubmit = ({ username, password, name, email }: any) => {
		dispatch(signup({ username, password, name, email }));
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
							isLoading={is.equal(signupStatus, AsyncActionStatus.LOADING)}
						>
							Submit
						</AppButton>
						<VerticalSpacer />
						<BottomLink>
							<div>Already have an account?</div>
							<Link to="/login">Login</Link>
						</BottomLink>
					</form>
				)}
			</Form>
		</FormCard>
	);
};
