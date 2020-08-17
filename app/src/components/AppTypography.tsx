import { Text } from "@ui-kitten/components";
import styled from "styled-components/native";

export const BoldText = styled(Text)`
	font-family: "Montserrat-Bold";
	font-weight: bold;
`;

export const Heading = styled(Text)`
	font-family: "Montserrat-Light";
	text-transform: uppercase;
	font-size: 30px;
`;

export const ButtonText = styled(Text)`
	font-family: "Montserrat-Bold";
	text-transform: uppercase;
	color: white;
`;

export const ErrorText = styled(Text)`
	font-family: "Montserrat-Bold";
	text-transform: uppercase;
	text-align: center;
	font-weight: bold;
`;

export const LinkText = styled(Text)`
	color: #0052cc;
	font-family: "Montserrat-Bold";
	font-weight: bold;
`;

export const AppTitle = styled(Text)`
	text-transform: uppercase;
	font-family: "Montserrat-Bold";
	font-size: 24px;
`;

export const HelperText = styled(Text)`
	text-transform: uppercase;
	font-size: 13px;
	font-family: "Montserrat-Bold";
	text-align: center;
`;
