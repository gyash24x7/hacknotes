import Form, { ErrorMessage, Field, HelperMessage } from "@atlaskit/form";
import TextField from "@atlaskit/textfield";
import React, { Fragment } from "react";
import IntegratedLogo from "../assets/integrated-logo.svg";
import { FormCard } from "../components/Auth/FormCard";
import { MainGraphic } from "../components/Auth/MainGraphic";
import { AppButton } from "../components/common/AppButton";
import { IntegratedLogoContainer } from "../components/common/IntegratedLogo";
import { PageWrapper } from "../components/common/PageWrapper";
import { VerticalSpacer } from "../components/common/VerticalSpacer";
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
	return (
		<PageWrapper>
			<MainGraphic />
			<FormCard>
				<IntegratedLogoContainer>
					<img src={IntegratedLogo} alt="Hacknotes" />
				</IntegratedLogoContainer>
				<h1>Sign Up</h1>
				<Form onSubmit={(val) => console.log(val)}>
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
							<AppButton appearance="primary" type="submit">
								Submit
							</AppButton>
						</form>
					)}
				</Form>
			</FormCard>
		</PageWrapper>
	);
};
