import { Icon, TopNavigationAction } from "@ui-kitten/components";
import React, { useState } from "react";
import { ImageProps } from "react-native";
import { queryCache, useMutation } from "react-query";
import { updateNote } from "../api/notes";
import { Note } from "../utils/types";

interface PinNoteProps {
	noteId: string;
	pinned: boolean;
}

export const PinNote = ({ noteId, pinned }: PinNoteProps) => {
	const [isPinned, setIsPinned] = useState(pinned);
	const [togglePin] = useMutation(updateNote, {
		onSuccess: (data) => {
			queryCache.setQueryData<Note[]>("notes", (oldNotes) => {
				const newNotes = oldNotes?.map((note) => {
					if (note.id === data.id) return data;
					return note;
				});

				return newNotes || [];
			});

			setIsPinned(!isPinned);
		}
	});

	const renderNavigationActionIcon = () => (props?: Partial<ImageProps>) => (
		<Icon
			name={isPinned ? "bookmark" : "bookmark-outline"}
			{...props}
			size="xlarge"
		/>
	);

	const handleOnPress = () => togglePin({ noteId, pinned: !isPinned });

	return (
		<TopNavigationAction
			icon={renderNavigationActionIcon()}
			onPress={handleOnPress}
		/>
	);
};
