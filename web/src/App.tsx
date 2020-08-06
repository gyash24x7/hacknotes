import "@atlaskit/css-reset/dist/bundle.css";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
	BrowserRouter,
	Redirect,
	Route,
	RouteProps,
	Switch
} from "react-router-dom";
import { me } from "./api/user";
import LogoIcon from "./assets/icon.svg";
import { MainGraphic, MainGraphicIcon } from "./components/Auth/MainGraphic";
import AppLoader from "./components/common/AppLoader";
import { AppNav } from "./components/common/AppNav";
import { PageWrapper } from "./components/common/PageWrapper";
import { ArchivePage } from "./pages/Archive";
import { HomePage } from "./pages/Home";
import { LoginPage } from "./pages/Login";
import { SignupPage } from "./pages/Signup";
import { TrashPage } from "./pages/Trash";
import { AuthContext } from "./utils/context";

function App() {
	const { error, data } = useQuery("me", me, {
		retry: false,
		refetchOnWindowFocus: false
	});
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>();

	useEffect(() => {
		if (error) setIsAuthenticated(false);
		if (data) setIsAuthenticated(true);
	}, [error, data]);

	if (typeof isAuthenticated !== "undefined") {
		return (
			<BrowserRouter>
				<PageWrapper>
					{isAuthenticated ? (
						<AppNav />
					) : (
						<MainGraphic>
							<MainGraphicIcon src={LogoIcon} />
						</MainGraphic>
					)}
					<AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
						<Switch>
							<PublicRoute path="/login" component={LoginPage} exact />
							<PublicRoute path="/signup" component={SignupPage} exact />
							<PrivateRoute path="/archive" component={ArchivePage} exact />
							<PrivateRoute path="/trash" component={TrashPage} exact />
							<PrivateRoute path="/" component={HomePage} exact />
						</Switch>
					</AuthContext.Provider>
				</PageWrapper>
			</BrowserRouter>
		);
	} else return <AppLoader />;
}

export const PrivateRoute = (props: RouteProps) => {
	const { isAuthenticated } = useContext(AuthContext);
	if (isAuthenticated) return <Route {...props} />;
	else return <Redirect to="/login" />;
};

export const PublicRoute = (props: RouteProps) => {
	const { isAuthenticated } = useContext(AuthContext);
	if (!isAuthenticated) return <Route {...props} />;
	else return <Redirect to="/" />;
};

export default App;
