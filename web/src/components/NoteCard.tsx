import React, { useRef } from "react";
import { useClickAway, useHover } from "react-use";
import styled from "styled-components";
import { Note, NoteColors } from "../utils/types";
import { AppCard } from "./AppCard";
import { NoteCardFooter } from "./NoteCardFooter";
import { VerticalSpacer } from "./VerticalSpacer";

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
						{note.content.split("\n").map((text, i) => (
							<p key={i}>{text}</p>
						))}
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
