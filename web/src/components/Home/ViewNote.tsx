import { colors } from "@atlaskit/theme";
import React, { useRef } from "react";
import styled from "styled-components";
import { NoteCard } from "./NoteCard";

interface ViewNoteProps {
	noteId: string;
	onClose: () => void;
}

const ViewNoteWrapper = styled.div`
	position: fixed;
	z-index: 200;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${colors.N900}88;
`;

const NoteCardContainer = styled.div`
	max-width: 600px;
`;

export const ViewNote = ({ noteId, onClose }: ViewNoteProps) => {
	const noteCardContainerRef = useRef<HTMLDivElement>(null);

	const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.persist();
		const rect = noteCardContainerRef.current!.getBoundingClientRect();
		const { top, bottom, left, right } = rect;
		if (
			!(top < e.pageY && bottom > e.pageY && left < e.pageX && right > e.pageX)
		) {
			onClose();
		}
	};

	return (
		<ViewNoteWrapper onClick={handleClick}>
			<NoteCardContainer innerRef={noteCardContainerRef as any}>
				<NoteCard noteId={noteId} />
			</NoteCardContainer>
		</ViewNoteWrapper>
	);
};
