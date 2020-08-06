// import ImageIcon from "@atlaskit/icon/glyph/image";
// import CollaboratorIcon from "@atlaskit/icon/glyph/invite-team";
// import LinkIcon from "@atlaskit/icon/glyph/link";
// import BellIcon from "@atlaskit/icon/glyph/notification";
import { convertFromRaw, Editor, EditorState } from "draft-js";
import React, { useRef } from "react";
import { useClickAway, useHover } from "react-use";
import styled from "styled-components";
import { Note, NoteColors } from "../../utils/types";
import { AppCard } from "../common/AppCard";
import { VerticalSpacer } from "../common/VerticalSpacer";
import { NoteCardFooter } from "./NoteCardFooter";

export const NoteTitle = styled.h3`
	font-weight: bold;
	font-size: 18px;
	font-family: "Montserrat";
`;

export const NoteBody = styled.div`
	font-size: 14px;
	word-break: break-word;
	display: -webkit-box;
	-webkit-line-clamp: 15;
	-webkit-box-orient: vertical;
	overflow: hidden;
`;

interface NoteProps {
	note: Note;
	openView?: () => void;
	onClickAway?: () => void;
}

export const NoteCard = ({ note, openView, onClickAway }: NoteProps) => {
	const appCardRef = useRef<HTMLDivElement>(null);

	useClickAway(appCardRef, () => {
		if (onClickAway) onClickAway();
	});

	const NoteCardElement = (hovered: boolean) => (
		<AppCard
			className="note-card"
			style={{ backgroundColor: NoteColors[note.color] }}
			innerRef={appCardRef as any}
		>
			<div onClick={openView}>
				{note.title && <NoteTitle>{note.title}</NoteTitle>}
				{note.title && note.content && <VerticalSpacer />}
				{note.content && (
					<NoteBody>
						<Editor
							readOnly
							onChange={() => {}}
							editorState={EditorState.createWithContent(
								convertFromRaw(JSON.parse(note.content))
							)}
							blockStyleFn={() => "noteContentText"}
						/>
					</NoteBody>
				)}
			</div>
			<VerticalSpacer size={20} />
			<NoteCardFooter isVisible={hovered} note={note} />
		</AppCard>
	);

	const [HoverableNoteCard] = useHover(NoteCardElement);

	return HoverableNoteCard;
};
