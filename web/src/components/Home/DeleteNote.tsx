import Tooltip from "@atlaskit/tooltip";
import React from "react";
import { queryCache, useMutation } from "react-query";
import { updateNote } from "../../api/notes";
import { Note } from "../../utils/types";
import { AppIconButton } from "../common/AppButton";
import RestoreIcon from "../icons/RestoreIcon";
import TrashIcon from "../icons/TrashIcon";

interface DeleteNoteProps {
	noteId: string;
	deleted: boolean;
}

export const DeleteNote = ({ noteId, deleted }: DeleteNoteProps) => {
	const [toggleDelete, { isLoading }] = useMutation(updateNote, {
		onSuccess: (data) => {
			queryCache.setQueryData<Note[]>(
				data.deleted ? ["notes", { deleted: true }] : "notes",
				(notes) => [data].concat(...(notes || []))
			);
			queryCache.setQueryData<Note[]>(
				data.deleted ? "notes" : ["notes", { deleted: true }],
				(notes) => notes?.filter(({ id }) => id !== data.id) || []
			);
		}
	});

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
