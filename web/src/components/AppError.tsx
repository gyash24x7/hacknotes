import ErrorIcon from "@atlaskit/icon/glyph/editor/warning";
import { colors } from "@atlaskit/theme";
import React, { ReactNode } from "react";
import styled from "styled-components";
import { VerticalSpacer } from "./VerticalSpacer";

export const AppErrorContainer = styled.div`
	color: ${colors.R400};
	font-weight: bold;
	content: "hello";
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const AppError = (props: {
	children: ReactNode;
	withIcon?: boolean;
}) => (
	<AppErrorContainer>
		{props.withIcon && <ErrorIcon label="Error" size="xlarge" />}
		{props.withIcon && <VerticalSpacer size={5} />}
		{props.children}
	</AppErrorContainer>
);
