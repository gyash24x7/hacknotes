import "@atlaskit/css-reset/dist/bundle.css";
import { AutoDismissFlag, FlagGroup } from "@atlaskit/flag";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
	BrowserRouter,
	Redirect,
	Route,
	RouteProps,
	Switch
} from "react-router-dom";
import styled from "styled-components";
import { me } from "./api/user";
import LogoIcon from "./assets/icon.svg";
import { MainGraphic, MainGraphicIcon } from "./components/Auth/MainGraphic";
import AppLoader from "./components/common/AppLoader";
import { AppNav } from "./components/common/AppNav";
import { PageWrapper } from "./components/common/PageWrapper";
import ErrorIcon from "./components/icons/ErrorIcon";
import SuccessIcon from "./components/icons/SuccessIcon";
import { ArchivePage } from "./pages/Archive";
import { HomePage } from "./pages/Home";
import { LoginPage } from "./pages/Login";
import { SignupPage } from "./pages/Signup";
import { TrashPage } from "./pages/Trash";
import { AuthContext, FlagContext, useAuth } from "./utils/context";
import { FlagData } from "./utils/types";

const IconWrapper = styled.span`
	width: 24px;
	height: 24px;

	span {
		width: 100%;
		svg {
			width: 100%;
		}
	}
`;

function App() {
	const { error, data } = useQuery("me", me, {
		retry: false,
		refetchOnWindowFocus: false
	});
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>();
	const [flags, setFlags] = useState<FlagData[]>([]);

	const dismissFlag = () => setFlags(flags.slice(1));
	const addFlag = (flag: FlagData) => setFlags([flag, ...flags]);

	useEffect(() => {
		if (error) setIsAuthenticated(false);
		if (data) setIsAuthenticated(true);
	}, [error, data]);

	if (typeof isAuthenticated !== "undefined") {
		return (
			<BrowserRouter>
				<PageWrapper>
					<FlagContext.Provider value={{ addFlag }}>
						{isAuthenticated ? (
							<AppNav />
						) : (
							<MainGraphic>
								<MainGraphicIcon src={LogoIcon} />
							</MainGraphic>
						)}
						<AuthContext.Provider
							value={{ isAuthenticated, setIsAuthenticated }}
						>
							<Switch>
								<PublicRoute path="/login" component={LoginPage} exact />
								<PublicRoute path="/signup" component={SignupPage} exact />
								<PrivateRoute path="/archive" component={ArchivePage} exact />
								<PrivateRoute path="/trash" component={TrashPage} exact />
								<PrivateRoute path="/" component={HomePage} exact />
							</Switch>
						</AuthContext.Provider>
						<FlagGroup onDismissed={dismissFlag}>
							{flags.map(({ appearance, title }, i) => (
								<AutoDismissFlag
									title={title}
									id={i + "flag"}
									key={i + "flag"}
									icon={
										<IconWrapper>
											{appearance === "success" ? (
												<SuccessIcon />
											) : (
												<ErrorIcon />
											)}
										</IconWrapper>
									}
								/>
							))}
						</FlagGroup>
					</FlagContext.Provider>
				</PageWrapper>
			</BrowserRouter>
		);
	} else return <AppLoader />;
}

export const PrivateRoute = (props: RouteProps) => {
	const { isAuthenticated } = useAuth();
	if (isAuthenticated) return <Route {...props} />;
	else return <Redirect to="/login" />;
};

export const PublicRoute = (props: RouteProps) => {
	const { isAuthenticated } = useAuth();
	if (!isAuthenticated) return <Route {...props} />;
	else return <Redirect to="/" />;
};

export default App;
