import Spinner from "@atlaskit/spinner";
import React from "react";
import styled from "styled-components";

const AppLoader = styled.div`
	width: inherit;
	display: flex;
	justify-content: center;
	padding: 20px 0px;
`;

export default () => (
	<AppLoader>
		<Spinner />
	</AppLoader>
);
