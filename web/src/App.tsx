import "@atlaskit/css-reset/dist/bundle.css";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { me } from "./api/user";
import AppLoader from "./components/AppLoader";
import { AppNav } from "./components/AppNav";
import { FlagProvider } from "./components/FlagProvider";
import { MainGraphic } from "./components/MainGraphic";
import { PageWrapper } from "./components/PageWrapper";
import { AppRoutes } from "./routes";
import { AuthProvider } from "./utils/context";

export const App = () => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>();
	const { error, data } = useQuery("me", me, {
		retry: false,
		refetchOnWindowFocus: false
	});

	useEffect(() => {
		if (error) setIsAuthenticated(false);
		if (data) setIsAuthenticated(true);
	}, [error, data]);

	if (typeof isAuthenticated !== "undefined") {
		return (
			<BrowserRouter>
				<PageWrapper>
					<FlagProvider>
						{isAuthenticated ? <AppNav /> : <MainGraphic />}
						<AuthProvider value={{ isAuthenticated, setIsAuthenticated }}>
							<AppRoutes />
						</AuthProvider>
					</FlagProvider>
				</PageWrapper>
			</BrowserRouter>
		);
	} else return <AppLoader />;
};
