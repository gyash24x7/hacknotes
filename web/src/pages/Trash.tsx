import is from "is_js";
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMount, useUnmount } from "react-use";
import { VerticalSpacer } from "../components/common/VerticalSpacer";
import { NoteList } from "../components/Home/NoteList";
import { AppStore } from "../store";
import { setDeleteFilter } from "../store/note";
import { fetchDeletedNotes } from "../store/note/thunks";
import { AsyncActionStatus, Note, NoteActions } from "../utils/types";
import { HelperText, HomeContainer } from "./Home";

export const TrashPage = () => {
	const dispatch = useDispatch();
	const notes = useSelector<AppStore, Record<string, Note>>(
		(store) => store.notes.notes
	);
	const notesStatus = useSelector<AppStore, AsyncActionStatus>(
		(store) => store.notes.status[NoteActions.GET_DELETED_NOTES]
	);
	useMount(() => dispatch(setDeleteFilter(true)));
	useMount(() => dispatch(fetchDeletedNotes()));
	useUnmount(() => dispatch(setDeleteFilter(false)));

	return (
		<HomeContainer>
			<VerticalSpacer size={90} />
			<HelperText>Notes in trash will be deleted after 30 days</HelperText>
			<VerticalSpacer size={10} />
			{is.equal(notesStatus, AsyncActionStatus.SUCCEEDED) && (
				<Fragment>
					<NoteList notes={notes} />
					{Object.keys(notes).length === 0 && (
						<HelperText>No Notes in Trash</HelperText>
					)}
				</Fragment>
			)}
		</HomeContainer>
	);
};
