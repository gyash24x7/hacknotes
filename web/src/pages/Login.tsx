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
import { FormField } from "../utils/interface";

const usernameRegex = /^[a-zA-Z0-9]+$/;

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
	return (
		<PageWrapper>
			<MainGraphic />
			<FormCard>
				<IntegratedLogoContainer>
					<img src={IntegratedLogo} alt="Hacknotes" />
				</IntegratedLogoContainer>
				<h1>Login</h1>
				<Form onSubmit={(val) => console.log(val)}>
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
