import Tooltip from "@atlaskit/tooltip";
import React from "react";
import { useMutation } from "react-query";
import { updateNote } from "../../api/notes";
import { AppIconButton } from "../common/AppButton";
import BookmarkIcon from "../icons/BookmarkIcon";

interface PinNoteProps {
	noteId: string;
	pinned: boolean;
}

export const PinNote = ({ noteId, pinned }: PinNoteProps) => {
	const [togglePin, { isLoading }] = useMutation(updateNote);
	const handleClick = () => togglePin({ noteId, pinned: !pinned });

	return (
		<Tooltip content={`${pinned ? "Unpin" : "Pin"} note`} position="bottom">
			<AppIconButton
				spacing="none"
				iconBefore={<BookmarkIcon filled={pinned} />}
				appearance="subtle"
				isLoading={isLoading}
				isDisabled={isLoading}
				onClick={handleClick}
			/>
		</Tooltip>
	);
};
