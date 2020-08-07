import styled from "styled-components";

export const VerticalSpacer = styled.div<{ size?: number }>`
	width: 100%;
	margin: ${(props) => props.size || 15}px 0px;
`;
