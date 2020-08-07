import React, { Fragment, useEffect, useRef, useState } from "react";
import { useWindowSize } from "react-use";
import styled from "styled-components";
import { Note } from "../utils/types";
import { NoteCard } from "./NoteCard";
import { ViewNote } from "./ViewNote";

const listStyles = {
	padding: 20,
	display: "grid",
	gridGap: 10,
	gridTemplateColumns: "repeat(auto-fill, minmax(275px, 1fr))",
	gridAutoRows: 0,
	width: "calc(100vw - 40px)"
};

export const ListItem = styled.div`
	position: relative;
	overflow: hidden;
`;

export const ListLabel = styled.div`
	padding-left: 20px;
	font-weight: bold;
	text-transform: uppercase;
`;

interface NoteListProps {
	notes: Note[];
	pinned?: boolean;
}

export const NoteList = ({ notes, pinned }: NoteListProps) => {
	const [selectedNote, setselectedNote] = useState<Note>();
	const gridRef = useRef<HTMLDivElement>(null);
	const { width } = useWindowSize();

	const resizeMasonryItem = (item: HTMLDivElement) => {
		let grid = gridRef.current!;
		let rowGap = parseInt(
			window.getComputedStyle(grid).getPropertyValue("grid-row-gap")
		);
		let rowHeight = parseInt(
			window.getComputedStyle(grid).getPropertyValue("grid-auto-rows")
		);

		let noteCard = item.querySelector<HTMLDivElement>(".note-card")!;
		let rowSpan = Math.ceil(
			(noteCard.getBoundingClientRect().height + rowGap) / (rowHeight + rowGap)
		);

		item.style.gridRowEnd = `span ${rowSpan}`;
	};

	const resizeAllMasonryItems = () => {
		Array.from(gridRef.current?.children || []).forEach((elem) =>
			resizeMasonryItem(elem as HTMLDivElement)
		);
	};

	useEffect(resizeAllMasonryItems, [width, notes]);

	return (
		<Fragment>
			{!!pinned && <ListLabel>Pinned Notes</ListLabel>}
			<div style={listStyles} ref={gridRef}>
				{notes
					.filter((note) => note.pinned === !!pinned)
					.map((note) => (
						<ListItem key={note.id}>
							<NoteCard note={note} openView={() => setselectedNote(note)} />
						</ListItem>
					))}
			</div>
			{!!pinned && <ListLabel>Other Notes</ListLabel>}
			{selectedNote && (
				<ViewNote
					note={selectedNote}
					onClose={() => setselectedNote(undefined)}
				/>
			)}
		</Fragment>
	);
};
