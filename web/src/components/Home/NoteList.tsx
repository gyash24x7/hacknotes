import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { AppStore, INote } from "../../utils/interface";
import { Note } from "./Note";

export const NoteListWrapper = styled.div`
	padding-top: 56px;
	width: 100vw;
	align-self: flex-start;
`;

const listStyles = {
	padding: 20,
	display: "grid",
	gridGap: 10,
	gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
	gridAutoRows: 0,
	width: "calc(100vw - 40px)"
};

export const ListItem = styled.div`
	position: relative;
	overflow: hidden;
`;

export const NoteList = () => {
	const gridRef = useRef<HTMLDivElement>(null);
	const notes = useSelector<AppStore, Record<string, INote>>(
		(store) => store.notes
	);

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
		console.log(gridRef.current?.children);
		Array.from(gridRef.current?.children || []).forEach((elem) =>
			resizeMasonryItem(elem as HTMLDivElement)
		);
	};

	useEffect(resizeAllMasonryItems);

	return (
		<NoteListWrapper>
			<div style={listStyles} ref={gridRef}>
				{Object.keys(notes).map((id) => (
					<ListItem key={id}>
						<Note note={notes[id]} />
					</ListItem>
				))}
			</div>
		</NoteListWrapper>
	);
};
