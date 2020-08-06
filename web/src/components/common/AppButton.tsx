import { PrimaryButton } from "@atlaskit/atlassian-navigation";
import Button from "@atlaskit/button";
import styled from "styled-components";

export const AppButton = styled(Button)`
	text-transform: uppercase;
	display: flex;
	justify-content: center;
	font-weight: bold !important;
	height: 40px ${({ spacing }) => spacing !== "compact" && "!important"};
`;

export const AppIconButton = styled(AppButton)`
	height: 30px !important;
	width: 30px !important;
	border-radius: 50% !important;

	& svg {
		width: 20px;
	}
`;

export const NavButton = styled(PrimaryButton)`
	text-transform: uppercase;
	display: flex;
	justify-content: center;
	font-weight: bold !important;
	margin-right: 10px !important;

	& svg {
		width: 20px;
	}
`;
