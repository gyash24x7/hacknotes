import React from "react";
import styled from "styled-components";
import { INote } from "../../store/noteSlice";
import { AppCard } from "../common/AppCard";
import { VerticalSpacer } from "../common/VerticalSpacer";

export const NoteTitle = styled.h3`
	font-weight: bold;
`;

export const NoteBody = styled.p``;

interface NoteProps {
	note: INote;
}

export const Note = ({ note }: NoteProps) => {
	return (
		<AppCard className="note-card">
			<NoteTitle>{note.title}</NoteTitle>
			<VerticalSpacer />
			<NoteBody>{note.content}</NoteBody>
		</AppCard>
	);
};
