import { Icon, TopNavigationAction } from "@ui-kitten/components";
import React from "react";
import { ImageProps } from "react-native";
import { queryCache, useMutation } from "react-query";
import { updateNote } from "../api/notes";
import { useActiveNote } from "../utils/context";
import { Note } from "../utils/types";

export const PinNote = () => {
	const { note, setNote } = useActiveNote();
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

	const renderNavigationActionIcon = () => (props?: Partial<ImageProps>) => (
		<Icon
			name={note.pinned ? "bookmark" : "bookmark-outline"}
			{...props}
			size="xlarge"
		/>
	);

	const handleOnPress = () =>
		togglePin({ noteId: note.id, pinned: !note.pinned });

	return (
		<TopNavigationAction
			icon={renderNavigationActionIcon()}
			onPress={handleOnPress}
		/>
	);
};
