import Tooltip from "@atlaskit/tooltip";
import is from "is_js";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "../../store";
import { deleteNote, restoreNote } from "../../store/note/thunks";
import { AsyncActionStatus, Note, NoteActions } from "../../utils/types";
import { AppIconButton } from "../common/AppButton";
import RestoreIcon from "../icons/RestoreIcon";
import TrashIcon from "../icons/TrashIcon";

interface DeleteNoteProps {
	noteId: string;
}

export const DeleteNote = ({ noteId }: DeleteNoteProps) => {
	const { deleted } = useSelector<AppStore, Note>(
		(store) => store.notes.notes[noteId]
	);
	const dispatch = useDispatch();
	const status = useSelector<AppStore, AsyncActionStatus>(
		(store) => store.notes.status[NoteActions.UPDATE_NOTE]
	);

	const handleClick = () => {
		if (deleted) dispatch(restoreNote(noteId));
		else dispatch(deleteNote(noteId));
	};

	return (
		<Tooltip
			content={`${deleted ? "Restore" : "Delete"} note`}
			position="bottom"
		>
			<AppIconButton
				spacing="none"
				iconBefore={deleted ? <RestoreIcon /> : <TrashIcon />}
				appearance="subtle"
				isLoading={is.equal(status, AsyncActionStatus.LOADING)}
				isDisabled={is.equal(status, AsyncActionStatus.LOADING)}
				onClick={handleClick}
			/>
		</Tooltip>
	);
};
