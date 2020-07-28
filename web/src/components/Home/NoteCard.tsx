import BellIcon from "@atlaskit/icon/glyph/notification";
import React from "react";
import styled from "styled-components";
import { Note } from "../../utils/types";
import { AppCard } from "../common/AppCard";
import { VerticalSpacer } from "../common/VerticalSpacer";

export const NoteTitle = styled.h3`
	font-weight: bold;
	font-size: 18px;
`;

export const NoteBody = styled.p`
	font-size: 14px;
`;

export const BellIconStyled = styled(BellIcon)`
	width: 20px;
`;

interface NoteProps {
	note: Note;
}

export const NoteCard = ({ note }: NoteProps) => {
	return (
		<AppCard className="note-card">
			{note.title && <NoteTitle>{note.title}</NoteTitle>}
			{note.title && note.content && <VerticalSpacer />}
			{note.content && <NoteBody>{note.content}</NoteBody>}
			{/* <VerticalSpacer />
			<AppCardFooter>
				<BellIconStyled label="reminder" />
				<CollaboratorIcon label="collaborator" size="small" />
				<ImageIcon label="image" size="small" />
				<ColorIcon label="color" size="small" />
				<LinkIcon label="link" size="small" />
				<ArchiveIcon label="arhive" size="small" />
			</AppCardFooter> */}
		</AppCard>
	);
};
