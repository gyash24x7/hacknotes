import { colors } from "@atlaskit/theme";
import React, { useRef, useState } from "react";
import { queryCache, useMutation } from "react-query";
import useWindowSize from "react-use/lib/useWindowSize";
import styled from "styled-components";
import { updateNote } from "../api/notes";
import { useFlag } from "../utils/context";
import { Note, NoteColors } from "../utils/types";
import { AppCard } from "./AppCard";
import AppLoader from "./AppLoader";
import { ContentTextArea, TitleTextInput } from "./CreateNote";
import { NoteCardFooter } from "./NoteCardFooter";
import { VerticalSpacer } from "./VerticalSpacer";

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

const NoteCardContainer = styled.div<{ width: number }>`
	width: ${({ width }) => (width > 620 ? "600px" : "95vw")};
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const ViewNote = ({ note, onClose }: ViewNoteProps) => {
	const noteCardContainerRef = useRef<HTMLDivElement>(null);
	const { width } = useWindowSize();
	const { addFlag } = useFlag();
	const [update, { isLoading }] = useMutation(updateNote, {
		onSuccess(data) {
			queryCache.setQueryData<Note[]>(
				note.archived ? ["notes", { archived: true }] : "notes",
				(notes) => notes?.map((note) => (note.id === data.id ? data : note))
			);

			addFlag({ title: "Note Updated!", appearance: "success" });
		}
	});

	const [title, setTitle] = useState(note.title);
	const [content, setContent] = useState<string>(
		JSON.parse(note.content).blocks.join("\n")
	);

	const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.persist();
		const { pageX, pageY } = e;
		const rect = noteCardContainerRef.current!.getBoundingClientRect();
		const { top, bottom, left, right } = rect;
		if (!(top < pageY && bottom > pageY && left < pageX && right > pageX)) {
			const oldContent = JSON.parse(note.content).blocks.join("\n");
			if (title !== note.title || content !== oldContent)
				update({
					title,
					content: JSON.stringify({ blocks: content.split("\n") }),
					noteId: note.id
				});

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
					<TitleTextInput
						placeholder="Title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					{note.title && note.content && <VerticalSpacer />}
					{note.content && (
						<ContentTextArea
							value={content}
							onChange={(e) => setContent(e.target.value)}
							placeholder="Take a Note..."
							className="withTitle"
						/>
					)}
					{isLoading && <AppLoader />}
					<VerticalSpacer />
					<NoteCardFooter isVisible note={note} />
				</AppCard>
			</NoteCardContainer>
		</ViewNoteWrapper>
	);
};
