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

const emailRegex = /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

export const SignupPage = () => {
	return (
		<PageWrapper>
			<MainGraphic />
			<FormCard>
				<h1>Sign Up</h1>
				<Form onSubmit={(val) => console.log(val)}>
					{({ formProps }) => (
						<form {...formProps} noValidate>
							<Field
								label="Name"
								isRequired
								name="name"
								validate={(val) => (!val ? "Name is required!" : undefined)}
								defaultValue=""
							>
								{({ fieldProps, error }) => (
									<Fragment>
										<TextField {...fieldProps} autoComplete="off" />
										{error && <ErrorMessage>{error}</ErrorMessage>}
									</Fragment>
								)}
							</Field>

							<Field
								label="Email"
								isRequired
								name="email"
								validate={(val) =>
									!val
										? "Email is required!"
										: !emailRegex.test(val)
										? "Please enter a valid email!"
										: undefined
								}
								defaultValue=""
							>
								{({ fieldProps, error }) => (
									<Fragment>
										<TextField
											{...fieldProps}
											autoComplete="off"
											type="email"
										/>
										{error && <ErrorMessage>{error}</ErrorMessage>}
									</Fragment>
								)}
							</Field>

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
											<ErrorMessage>{error}</ErrorMessage>
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
											? "Password should be greater than 8 chracters!"
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
											<ErrorMessage>{error}</ErrorMessage>
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
