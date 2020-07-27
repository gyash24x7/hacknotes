import { colors } from "@atlaskit/theme";
import React from "react";
import styled from "styled-components";
import { INote } from "../../store/noteSlice";
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

interface NoteProps {
	note: INote;
}

export const Note = ({ note }: NoteProps) => {
	return (
		<NoteCard className="note-card">
			<NoteTitle>{note.title}</NoteTitle>
			<VerticalSpacer />
			<NoteBody>{note.content}</NoteBody>
		</NoteCard>
	);
};
