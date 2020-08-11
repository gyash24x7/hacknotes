import { Icon, TopNavigationAction } from "@ui-kitten/components";
import React from "react";
import { ImageProps } from "react-native";
import { queryCache, useMutation } from "react-query";
import { updateNote } from "../api/notes";
import { useActiveNote } from "../utils/context";
import { Note } from "../utils/types";

export const ArchiveNote = () => {
	const { note, setNote } = useActiveNote();
	const [toggleArchive] = useMutation(updateNote, {
		onSuccess: (data) => {
			queryCache.setQueryData<Note[]>(
				data.archived ? ["notes", { archived: true }] : "notes",
				(notes) => [data].concat(...(notes || []))
			);
			queryCache.setQueryData<Note[]>(
				data.archived ? "notes" : ["notes", { archived: true }],
				(notes) => notes?.filter(({ id }) => id !== data.id) || []
			);
			setNote(data);
		}
	});

	const renderNavigationActionIcon = () => (props?: Partial<ImageProps>) => (
		<Icon
			name={note.archived ? "archive" : "archive-outline"}
			{...props}
			size="xlarge"
		/>
	);

	const handleOnPress = () =>
		toggleArchive({ noteId: note.id, archived: !note.archived });

	return (
		<TopNavigationAction
			icon={renderNavigationActionIcon()}
			onPress={handleOnPress}
		/>
	);
};
