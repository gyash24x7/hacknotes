import Tooltip from "@atlaskit/tooltip";
import React from "react";
import { useFlag } from "../utils/context";
import { useUpdateNoteMutation } from "../utils/hooks";
import { AppIconButton } from "./AppButton";
import RestoreIcon from "./icons/RestoreIcon";
import TrashIcon from "./icons/TrashIcon";

interface DeleteNoteProps {
	noteId: string;
	deleted: boolean;
}

export const DeleteNote = ({ noteId, deleted }: DeleteNoteProps) => {
	const { addFlag } = useFlag();
	const [toggleDelete, { isLoading }] = useUpdateNoteMutation({
		onSuccess: (data) =>
			addFlag({
				title: `Note ${data.deleted ? "moved to Trash" : "Restored"}!`,
				appearance: "success"
			})
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
