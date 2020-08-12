import Tooltip from "@atlaskit/tooltip";
import React from "react";
import { useFlag } from "../utils/context";
import { useUpdateNoteMutation } from "../utils/hooks";
import { AppIconButton } from "./AppButton";
import BookmarkIcon from "./icons/BookmarkIcon";

interface PinNoteProps {
	noteId: string;
	pinned: boolean;
}

export const PinNote = ({ noteId, pinned }: PinNoteProps) => {
	const { addFlag } = useFlag();
	const [togglePin, { isLoading }] = useUpdateNoteMutation({
		onSuccess: (data) =>
			addFlag({
				title: `Note ${data.pinned ? "Pinned" : "Unpinned"}!`,
				appearance: "success"
			})
	});

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
