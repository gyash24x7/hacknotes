import Button from "@atlaskit/button";
import is from "is_js";
import styled from "styled-components";

export const AppButton = styled(Button)`
	text-transform: uppercase;
	display: flex;
	justify-content: center;
	font-weight: bold !important;
	height: 40px
		${({ spacing }) => is.not.equal(spacing, "compact") && "!important"};
`;

export const AppIconButton = styled(AppButton)`
	height: 30px !important;
	width: 30px !important;
	border-radius: 50% !important;

	& svg {
		width: 20px;
	}
`;
