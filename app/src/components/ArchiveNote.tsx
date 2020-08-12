import { Icon, TopNavigationAction } from "@ui-kitten/components";
import React from "react";
import { ImageProps } from "react-native";
import { useUpdateNoteMutation } from "../utils/hooks";
import { NoteActionProps } from "../utils/types";

export const ArchiveNote = ({ note, setNote }: NoteActionProps) => {
	const [toggleArchive] = useUpdateNoteMutation({
		onSuccess: (data) => setNote(data)
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
