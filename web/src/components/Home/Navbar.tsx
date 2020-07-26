import {
	AtlassianNavigation,
	CustomProductHome
} from "@atlaskit/atlassian-navigation";
import React from "react";
import styled from "styled-components";
import LogoIcon from "../../assets/icon.svg";
import WordMark from "../../assets/wordmark.svg";

const NavContainer = styled.div`
	position: fixed;
	width: 100vw;
	top: 0;
`;

export const Navbar = () => {
	return (
		<NavContainer>
			<AtlassianNavigation
				label="site"
				primaryItems={[]}
				renderProductHome={() => (
					<CustomProductHome
						iconUrl={LogoIcon}
						logoUrl={WordMark}
						iconAlt="Hacknotes"
						logoAlt="Hacknotes"
						href="#"
					/>
				)}
			/>
		</NavContainer>
	);
};
