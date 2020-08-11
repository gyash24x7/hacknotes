import { Icon, TopNavigationAction } from "@ui-kitten/components";
import React, { useState } from "react";
import { ImageProps } from "react-native";
import { queryCache, useMutation } from "react-query";
import { updateNote } from "../api/notes";
import { Note } from "../utils/types";

interface ArchiveNoteProps {
	noteId: string;
	archived: boolean;
}

export const ArchiveNote = ({ noteId, archived }: ArchiveNoteProps) => {
	const [isArchived, setIsArchived] = useState(archived);
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
			setIsArchived(!isArchived);
		}
	});

	const renderNavigationActionIcon = () => (props?: Partial<ImageProps>) => (
		<Icon
			name={isArchived ? "archive" : "archive-outline"}
			{...props}
			size="xlarge"
		/>
	);

	const handleOnPress = () => toggleArchive({ noteId, archived: !isArchived });

	return (
		<TopNavigationAction
			icon={renderNavigationActionIcon()}
			onPress={handleOnPress}
		/>
	);
};
