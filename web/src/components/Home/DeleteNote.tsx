import Tooltip from "@atlaskit/tooltip";
import React from "react";
import { useMutation } from "react-query";
import { updateNote } from "../../api/notes";
import { AppIconButton } from "../common/AppButton";
import RestoreIcon from "../icons/RestoreIcon";
import TrashIcon from "../icons/TrashIcon";

interface DeleteNoteProps {
	noteId: string;
	deleted: boolean;
}

export const DeleteNote = ({ noteId, deleted }: DeleteNoteProps) => {
	const [toggleDelete, { isLoading }] = useMutation(updateNote);
	const handleClick = () => toggleDelete({ noteId, deleted: !deleted });

	return (
		<Tooltip
			content={`${deleted ? "Restore" : "Delete"} note`}
			position="bottom"
		>
			<AppIconButton
				spacing="none"
				iconBefore={deleted ? <RestoreIcon /> : <TrashIcon />}
				appearance="subtle"
				isLoading={isLoading}
				isDisabled={isLoading}
				onClick={handleClick}
			/>
		</Tooltip>
	);
};
