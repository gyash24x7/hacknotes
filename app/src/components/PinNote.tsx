import { TopNavigationAction } from "@ui-kitten/components";
import React from "react";
import { queryCache, useMutation } from "react-query";
import { updateNote } from "../api/notes";
import { Note, NoteActionProps } from "../utils/types";
import { renderNavigationActionIcon } from "./AppNav";

export const PinNote = ({ note, setNote }: NoteActionProps) => {
	const [togglePin] = useMutation(updateNote, {
		onSuccess: (data) => {
			queryCache.setQueryData<Note[]>("notes", (oldNotes) => {
				const newNotes = oldNotes?.map((note) => {
					if (note.id === data.id) return data;
					return note;
				});

				return newNotes || [];
			});

			setNote(data);
		}
	});

	const handleOnPress = () =>
		togglePin({ noteId: note.id, pinned: !note.pinned });

	return (
		<TopNavigationAction
			icon={renderNavigationActionIcon(
				note.pinned ? "bookmark" : "bookmark-outline"
			)}
			onPress={handleOnPress}
		/>
	);
};
