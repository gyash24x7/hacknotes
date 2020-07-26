import Form, {
	ErrorMessage,
	Field,
	HelperMessage,
	ValidMessage
} from "@atlaskit/form";
import TextField from "@atlaskit/textfield";
import React, { Fragment } from "react";
import { FormCard } from "../components/Auth/FormCard";
import { MainGraphic } from "../components/Auth/MainGraphic";
import { AppButton } from "../components/common/AppButton";
import { PageWrapper } from "../components/common/PageWrapper";
import { VerticalSpacer } from "../components/common/VerticalSpacer";

export const LoginPage = () => {
	return (
		<PageWrapper>
			<MainGraphic />
			<FormCard>
				<h1>Login</h1>
				<Form onSubmit={(val) => console.log(val)}>
					{({ formProps }) => (
						<form {...formProps} noValidate>
							<Field
								label="Username"
								isRequired
								name="username"
								validate={(val) => (!val ? "Username is required!" : undefined)}
								defaultValue=""
							>
								{({ fieldProps, error }) => (
									<Fragment>
										<TextField {...fieldProps} autoComplete="off" />
										{!error ? (
											<HelperMessage>
												You can use letters and numbers only.
											</HelperMessage>
										) : (
											<ErrorMessage>Username is required!</ErrorMessage>
										)}
									</Fragment>
								)}
							</Field>
							<Field
								label="Password"
								isRequired
								name="password"
								defaultValue=""
								validate={(val) =>
									!!val
										? val.length < 8
											? "Password too short!"
											: undefined
										: "Password is required!"
								}
							>
								{({ fieldProps, error, valid }) => (
									<Fragment>
										<TextField
											{...fieldProps}
											type="password"
											autoComplete="off"
										/>
										{error && !valid ? (
											<ErrorMessage>
												Password should be more than 8 characters.
											</ErrorMessage>
										) : valid ? (
											<ValidMessage>Awesome Password!</ValidMessage>
										) : (
											<HelperMessage>
												You can use letters, numbers and symbols.
											</HelperMessage>
										)}
									</Fragment>
								)}
							</Field>
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
