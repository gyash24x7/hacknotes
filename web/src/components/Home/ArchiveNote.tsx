import Tooltip from "@atlaskit/tooltip";
import is from "is_js";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "../../store";
import { updateNote } from "../../store/note/thunks";
import { AsyncActionStatus, NoteActions } from "../../utils/types";
import { AppIconButton } from "../common/AppButton";
import ArchiveIcon from "../common/ArchiveIcon";

interface ArchiveNoteProps {
	noteId: string;
}

export const ArchiveNote = ({ noteId }: ArchiveNoteProps) => {
	const dispatch = useDispatch();
	const status = useSelector<AppStore, AsyncActionStatus>(
		(store) => store.notes.status[NoteActions.UPDATE_NOTE]
	);

	const handleClick = () => dispatch(updateNote({ noteId, archived: true }));

	return (
		<Tooltip content="Archive note" position="bottom">
			<AppIconButton
				spacing="none"
				iconBefore={<ArchiveIcon />}
				appearance="subtle"
				isLoading={is.equal(status, AsyncActionStatus.LOADING)}
				isDisabled={is.equal(status, AsyncActionStatus.LOADING)}
				onClick={handleClick}
			/>
		</Tooltip>
	);
};
