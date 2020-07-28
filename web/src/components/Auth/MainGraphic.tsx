import styled from "styled-components";
import BgImage from "../../assets/absbg.png";

export const MainGraphic = styled.div`
	height: 100vh;
	flex: 1;
	background-image: url(${BgImage});
	background-size: cover;
	background-repeat: no-repeat no-repeat;
	background-position: center center;
`;

export const MainGraphicIcon = styled.img`
	position: absolute;
	top: 20px;
	left: 20px;
	max-width: 60px;
`;
