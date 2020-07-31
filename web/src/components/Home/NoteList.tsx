import Spinner from "@atlaskit/spinner";
import is from "is_js";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMount, useUpdateEffect, useWindowSize } from "react-use";
import styled from "styled-components";
import { AppStore } from "../../store";
import { fetchNotes } from "../../store/note/thunks";
import { AsyncActionStatus, Note, NoteActions } from "../../utils/types";
import { AppError } from "../common/AppError";
import { AppLoader } from "../common/AppLoader";
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

export const NoteList = () => {
	const [selectedNoteId, setselectedNoteId] = useState<string>();
	const gridRef = useRef<HTMLDivElement>(null);
	const notes = useSelector<AppStore, Record<string, Note>>(
		(store) => store.notes.notes
	);
	const { width } = useWindowSize();
	const dispatch = useDispatch();
	const notesStatus = useSelector<AppStore, AsyncActionStatus>(
		(store) => store.notes.status[NoteActions.ALL_NOTES]
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

	if (
		is.inArray(notesStatus, [
			AsyncActionStatus.IDLE,
			AsyncActionStatus.SUCCEEDED
		])
	) {
		return (
			<div style={listStyles} ref={gridRef}>
				{Object.keys(notes).map((id) => (
					<ListItem key={id}>
						<NoteCard noteId={id} openView={() => setselectedNoteId(id)} />
					</ListItem>
				))}
				{selectedNoteId && (
					<ViewNote
						noteId={selectedNoteId}
						onClose={() => setselectedNoteId(undefined)}
					/>
				)}
			</div>
		);
	}

	if (is.equal(notesStatus, AsyncActionStatus.FAILED)) {
		return <AppError>SOME ERROR OCCURRED!</AppError>;
	}

	return (
		<AppLoader>
			<Spinner />
		</AppLoader>
	);
};
