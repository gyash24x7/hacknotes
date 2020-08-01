import is from "is_js";
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMount, useUnmount } from "react-use";
import { AppNav } from "../components/common/AppNav";
import { PageWrapper } from "../components/common/PageWrapper";
import { VerticalSpacer } from "../components/common/VerticalSpacer";
import { NoteList } from "../components/Home/NoteList";
import { AppStore } from "../store";
import { setArchiveFilter } from "../store/note";
import { fetchArchivedNotes } from "../store/note/thunks";
import { AsyncActionStatus, Note, NoteActions } from "../utils/types";
import { HelperText, HomeContainer } from "./Home";

export const ArchivePage = () => {
	const dispatch = useDispatch();
	const notes = useSelector<AppStore, Record<string, Note>>(
		(store) => store.notes.notes
	);
	const notesStatus = useSelector<AppStore, AsyncActionStatus>(
		(store) => store.notes.status[NoteActions.ARCHIVED_NOTES]
	);
	useMount(() => dispatch(setArchiveFilter(true)));
	useMount(() => dispatch(fetchArchivedNotes()));
	useUnmount(() => dispatch(setArchiveFilter(false)));

	return (
		<PageWrapper>
			<AppNav />
			<HomeContainer>
				<VerticalSpacer size={70} />
				{is.equal(notesStatus, AsyncActionStatus.SUCCEEDED) && (
					<Fragment>
						<NoteList notes={notes} />
						{Object.keys(notes).length === 0 && (
							<HelperText>No Notes in Archive</HelperText>
						)}
					</Fragment>
				)}
			</HomeContainer>
		</PageWrapper>
	);
};
