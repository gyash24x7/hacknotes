import { colors } from "@atlaskit/theme";
import styled from "styled-components";

export const FormCard = styled.div`
	min-width: 400px;
	height: calc(100vh - 60px);
	max-width: 500px;
	padding: 30px;
	border-left: 1px solid ${colors.N50};
	display: flex;
	flex-direction: column;
	justify-content: center;

	h1 {
		font-weight: 300;
		text-transform: uppercase;
		margin-bottom: 20px;
	}
`;
