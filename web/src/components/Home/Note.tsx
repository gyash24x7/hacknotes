import { colors } from "@atlaskit/theme";
import React from "react";
import styled from "styled-components";
import lorem from "../../utils/lorem";
import { VerticalSpacer } from "../common/VerticalSpacer";

export const NoteCard = styled.div`
	width: calc(100% - 52px);
	border: 1px solid ${colors.N50};
	padding: 25px;
	border-radius: 5px;
`;

export const NoteTitle = styled.h3`
	font-weight: bold;
`;

export const NoteBody = styled.p``;

export const Note = () => {
	return (
		<NoteCard className="note-card">
			<NoteTitle>{lorem.generateWords(3)}</NoteTitle>
			<VerticalSpacer />
			<NoteBody>
				{lorem.generateParagraphs(Math.ceil(3 * Math.random()))}
			</NoteBody>
		</NoteCard>
	);
};
