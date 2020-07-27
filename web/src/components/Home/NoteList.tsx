import Spinner from "@atlaskit/spinner";
import is from "is_js";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMount, useUpdateEffect, useWindowSize } from "react-use";
import styled from "styled-components";
import { AppStore } from "../../store";
import { fetchNotes, INote, NotesStatus } from "../../store/noteSlice";
import { AppError } from "../common/AppError";
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
		(store) => store.notes.notes
	);
	const { width } = useWindowSize();
	const dispatch = useDispatch();
	const notesStatus = useSelector<AppStore, NotesStatus>(
		(store) => store.notes.status
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
		Array.from(gridRef.current?.children || []).forEach((elem) =>
			resizeMasonryItem(elem as HTMLDivElement)
		);
	};

	useMount(() => dispatch(fetchNotes()));
	useUpdateEffect(resizeAllMasonryItems, [width, notes]);

	if (is.inArray(notesStatus, [NotesStatus.IDLE, NotesStatus.SUCCEEDED])) {
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
	}

	if (is.equal(notesStatus, NotesStatus.FAILED)) {
		return <AppError>SOME ERROR OCCURRED!</AppError>;
	}

	return <Spinner />;
};
