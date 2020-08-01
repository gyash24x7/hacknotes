import Tooltip from "@atlaskit/tooltip";
import is from "is_js";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "../../store";
import { updateNote } from "../../store/note/thunks";
import { AsyncActionStatus, Note, NoteActions } from "../../utils/types";
import { AppIconButton } from "../common/AppButton";
import PinIcon from "../common/PinIcon";
import UnpinIcon from "../common/UnpinIcon";

interface PinNoteProps {
	noteId: string;
}

export const PinNote = ({ noteId }: PinNoteProps) => {
	const { pinned } = useSelector<AppStore, Note>(
		(store) => store.notes.notes[noteId]
	);
	const dispatch = useDispatch();
	const status = useSelector<AppStore, AsyncActionStatus>(
		(store) => store.notes.status[NoteActions.UPDATE_NOTE]
	);

	const handleClick = () => dispatch(updateNote({ noteId, pinned: !pinned }));

	return (
		<Tooltip content={`${pinned ? "Unpin" : "Pin"} note`} position="bottom">
			<AppIconButton
				spacing="none"
				iconBefore={pinned ? <UnpinIcon /> : <PinIcon />}
				appearance="subtle"
				isLoading={is.equal(status, AsyncActionStatus.LOADING)}
				isDisabled={is.equal(status, AsyncActionStatus.LOADING)}
				onClick={handleClick}
			/>
		</Tooltip>
	);
};
