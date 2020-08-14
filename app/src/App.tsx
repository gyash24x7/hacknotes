import * as eva from "@eva-design/eva";
import { mapping } from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import React, { Fragment } from "react";
import { AppNavigation } from "./navigation";
import theme from "./theme";

const App = () => (
	<Fragment>
		<IconRegistry icons={EvaIconsPack} />
		<ApplicationProvider
			{...eva}
			theme={{ ...eva.light, ...theme }}
			customMapping={mapping as any}
		>
			<AppNavigation />
		</ApplicationProvider>
	</Fragment>
);

export default App;
