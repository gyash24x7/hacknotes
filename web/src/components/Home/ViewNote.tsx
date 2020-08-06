import { colors } from "@atlaskit/theme";
import {
	ContentState,
	convertFromRaw,
	convertToRaw,
	Editor,
	EditorState
} from "draft-js";
import React, { useRef, useState } from "react";
import { useWindowSize } from "react-use";
import styled from "styled-components";
import { useUpdateNoteMutation } from "../../hooks/useUpdateNoteMutation";
import { Note, NoteColors } from "../../utils/types";
import { AppCard } from "../common/AppCard";
import AppLoader from "../common/AppLoader";
import { VerticalSpacer } from "../common/VerticalSpacer";
import { NoteTitle } from "./NoteCard";
import { NoteCardFooter } from "./NoteCardFooter";

interface ViewNoteProps {
	note: Note;
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

const ViewNoteBody = styled.div`
	font-size: 14px;
	overflow: scroll;
	max-height: 70vh;
	display: flex;
	flex-direction: column-reverse;
`;

const NoteCardContainer = styled.div<{ width: number }>`
	width: ${({ width }) => (width > 620 ? "600px" : "95vw")};
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const ViewNote = ({ note, onClose }: ViewNoteProps) => {
	const noteCardContainerRef = useRef<HTMLDivElement>(null);
	const { width } = useWindowSize();
	const [updateNote, { isLoading }] = useUpdateNoteMutation();

	const [titleEditorState, setTitleEditorState] = useState(
		EditorState.createWithContent(ContentState.createFromText(note.title))
	);
	const [contentEditorState, setContentEditorState] = useState(
		EditorState.createWithContent(convertFromRaw(JSON.parse(note.content)))
	);

	const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.persist();
		const rect = noteCardContainerRef.current!.getBoundingClientRect();
		const { top, bottom, left, right } = rect;
		if (
			!(top < e.pageY && bottom > e.pageY && left < e.pageX && right > e.pageX)
		) {
			const title = titleEditorState.getCurrentContent().getPlainText();
			const content = JSON.stringify(
				convertToRaw(contentEditorState.getCurrentContent())
			);
			updateNote({ title, content, noteId: note.id });
			onClose();
		}
	};

	return (
		<ViewNoteWrapper onClick={handleClick}>
			<NoteCardContainer innerRef={noteCardContainerRef as any} width={width}>
				<AppCard
					className="note-card"
					style={{ backgroundColor: NoteColors[note.color], cursor: "unset" }}
				>
					<NoteTitle>
						<Editor
							editorState={titleEditorState}
							onChange={setTitleEditorState}
							placeholder="Title"
							blockStyleFn={() => "noteTitleText"}
							stripPastedStyles
						/>
						<VerticalSpacer />
					</NoteTitle>
					{note.title && note.content && <VerticalSpacer />}
					{note.content && (
						<ViewNoteBody>
							<Editor
								editorState={contentEditorState}
								onChange={setContentEditorState}
								placeholder="Content..."
								blockStyleFn={() => "noteContentText"}
								stripPastedStyles
							/>
						</ViewNoteBody>
					)}
					{isLoading && <AppLoader />}
					<VerticalSpacer />
					<NoteCardFooter isVisible note={note} />
				</AppCard>
			</NoteCardContainer>
		</ViewNoteWrapper>
	);
};
