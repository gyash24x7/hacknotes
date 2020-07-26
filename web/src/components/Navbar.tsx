import {
	AtlassianNavigation,
	PrimaryButton
} from "@atlaskit/atlassian-navigation";
import Logo from "@atlaskit/icon/glyph/canvas";
import React from "react";

export const Navbar = () => {
	return (
		<AtlassianNavigation
			label="site"
			primaryItems={[<PrimaryButton>Issues</PrimaryButton>]}
			renderProductHome={() => <Logo label="Logo" />}
		/>
	);
};
