import Tooltip from "@atlaskit/tooltip";
import React from "react";
import { queryCache, useMutation } from "react-query";
import { updateNote } from "../api/notes";
import { useFlag } from "../utils/context";
import { Note } from "../utils/types";
import { AppIconButton } from "./AppButton";
import BookmarkIcon from "./icons/BookmarkIcon";

interface PinNoteProps {
	noteId: string;
	pinned: boolean;
}

export const PinNote = ({ noteId, pinned }: PinNoteProps) => {
	const { addFlag } = useFlag();
	const [togglePin, { isLoading }] = useMutation(updateNote, {
		onSuccess: (data) => {
			queryCache.setQueryData<Note[]>("notes", (oldNotes) => {
				const newNotes = oldNotes?.map((note) => {
					if (note.id === data.id) return data;
					return note;
				});

				return newNotes || [];
			});
			addFlag({
				title: `Note ${data.pinned ? "Pinned" : "Unpinned"}!`,
				appearance: "success"
			});
		}
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
