import is from "is_js";
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMount } from "react-use";
import styled from "styled-components";
import { CreateNote } from "../components/Home/CreateNote";
import { NoteList } from "../components/Home/NoteList";
import { AppStore } from "../store";
import { fetchNotes } from "../store/note/thunks";
import { AsyncActionStatus, Note, NoteActions } from "../utils/types";

export const HomeContainer = styled.div`
	width: 100vw;
	align-self: flex-start;
`;

export const HelperText = styled.div`
	text-align: center;
	text-transform: uppercase;
	font-weight: bold;
`;

export const HomePage = () => {
	const dispatch = useDispatch();
	const notes = useSelector<AppStore, Record<string, Note>>(
		(store) => store.notes.notes
	);
	const notesStatus = useSelector<AppStore, AsyncActionStatus>(
		(store) => store.notes.status[NoteActions.ALL_NOTES]
	);
	useMount(() => dispatch(fetchNotes()));

	return (
		<HomeContainer>
			<CreateNote />
			{is.equal(notesStatus, AsyncActionStatus.SUCCEEDED) && (
				<Fragment>
					{Object.keys(notes).filter((id) => notes[id].pinned).length > 0 && (
						<NoteList notes={notes} pinned />
					)}
					<NoteList notes={notes} pinned={false} />
					{Object.keys(notes).length === 0 && (
						<HelperText>No Notes Available</HelperText>
					)}
				</Fragment>
			)}
		</HomeContainer>
	);
};
