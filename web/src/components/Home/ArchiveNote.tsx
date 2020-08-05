import Tooltip from "@atlaskit/tooltip";
import is from "is_js";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "../../store";
import { archiveNote, unarchiveNote } from "../../store/note/thunks";
import { AsyncActionStatus, Note, NoteActions } from "../../utils/types";
import { AppIconButton } from "../common/AppButton";
import ArchiveIcon from "../icons/ArchiveIcon";

interface ArchiveNoteProps {
	noteId: string;
}

export const ArchiveNote = ({ noteId }: ArchiveNoteProps) => {
	const dispatch = useDispatch();
	const status = useSelector<AppStore, AsyncActionStatus>(
		(store) => store.notes.status[NoteActions.UPDATE_NOTE]
	);
	const { archived } = useSelector<AppStore, Note>(
		(store) => store.notes.notes[noteId]
	);

	const handleClick = () => {
		if (archived) dispatch(unarchiveNote(noteId));
		else dispatch(archiveNote(noteId));
	};

	return (
		<Tooltip
			content={`${archived ? "Unarchive" : "Archive"} note`}
			position="bottom"
		>
			<AppIconButton
				spacing="none"
				iconBefore={<ArchiveIcon filled={archived} />}
				appearance="subtle"
				isLoading={is.equal(status, AsyncActionStatus.LOADING)}
				isDisabled={is.equal(status, AsyncActionStatus.LOADING)}
				onClick={handleClick}
			/>
		</Tooltip>
	);
};
