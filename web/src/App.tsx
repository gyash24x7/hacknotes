import "@atlaskit/css-reset/dist/bundle.css";
import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppLoader from "./components/AppLoader";
import { AppNav } from "./components/AppNav";
import { FlagProvider } from "./components/FlagProvider";
import { MainGraphic } from "./components/MainGraphic";
import { PageWrapper } from "./components/PageWrapper";
import { AppRoutes } from "./routes";
import { AuthProvider } from "./utils/context";
import { useMeQuery } from "./utils/hooks";

export const App = () => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>();
	useMeQuery({
		onSuccess: () => setIsAuthenticated(true),
		onError: () => setIsAuthenticated(false)
	});

	if (typeof isAuthenticated !== "undefined") {
		return (
			<BrowserRouter>
				<PageWrapper>
					<FlagProvider>
						<AuthProvider value={{ isAuthenticated, setIsAuthenticated }}>
							{isAuthenticated ? <AppNav /> : <MainGraphic />}
							<AppRoutes />
						</AuthProvider>
					</FlagProvider>
				</PageWrapper>
			</BrowserRouter>
		);
	} else return <AppLoader />;
};
