import { ButtonGroup } from "@atlaskit/button";
import ImageIcon from "@atlaskit/icon/glyph/image";
import CollaboratorIcon from "@atlaskit/icon/glyph/invite-team";
import LinkIcon from "@atlaskit/icon/glyph/link";
import BellIcon from "@atlaskit/icon/glyph/notification";
import React, { Fragment } from "react";
import { useHover } from "react-use";
import styled from "styled-components";
import { Note } from "../../utils/types";
import { AppButton } from "../common/AppButton";
import { AppCard, AppCardFooter } from "../common/AppCard";
import ArchiveIcon from "../common/ArchiveIcon";
import PaletteIcon from "../common/PaletteIcon";
import { VerticalSpacer } from "../common/VerticalSpacer";

export const NoteTitle = styled.h3`
	font-weight: bold;
	font-size: 18px;
`;

export const NoteBody = styled.p`
	font-size: 14px;
`;

interface NoteProps {
	note: Note;
}

export const AppIconButton = styled(AppButton)`
	height: 30px !important;
	width: 30px !important;
	border-radius: 50% !important;

	& svg {
		width: 20px;
	}
`;

export const NoteCard = ({ note }: NoteProps) => {
	const NoteCardElement = (hovered: boolean) => (
		<AppCard className="note-card">
			{note.title && <NoteTitle>{note.title}</NoteTitle>}
			{note.title && note.content && <VerticalSpacer />}
			{note.content && <NoteBody>{note.content}</NoteBody>}
			<VerticalSpacer />
			<AppCardFooter>
				{hovered && (
					<ButtonGroup>
						<AppIconButton
							spacing="none"
							iconBefore={<BellIcon label="reminder" />}
							appearance="subtle"
						/>
						<AppIconButton
							spacing="none"
							iconBefore={<CollaboratorIcon label="collaborators" />}
							appearance="subtle"
						/>
						<AppIconButton
							spacing="none"
							iconBefore={<ImageIcon label="image" />}
							appearance="subtle"
						/>
						<AppIconButton
							spacing="none"
							iconBefore={<LinkIcon label="links" />}
							appearance="subtle"
						/>
						<AppIconButton
							spacing="none"
							iconBefore={<PaletteIcon />}
							appearance="subtle"
						/>
						<AppIconButton
							spacing="none"
							iconBefore={<ArchiveIcon />}
							appearance="subtle"
						/>
					</ButtonGroup>
				)}
			</AppCardFooter>
		</AppCard>
	);

	const [HoverableNoteCard] = useHover(NoteCardElement);

	return <Fragment>{HoverableNoteCard}</Fragment>;
};
