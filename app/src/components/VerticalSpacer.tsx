import { Layout } from "@ui-kitten/components";
import styled from "styled-components/native";

export const VerticalSpacer = styled(Layout)<{ size?: number }>`
	margin: ${({ size }) => size || 10}px 0px;
`;
