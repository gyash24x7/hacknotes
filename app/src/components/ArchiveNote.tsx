import { TopNavigationAction } from "@ui-kitten/components";
import React from "react";
import { Platform, ToastAndroid } from "react-native";
import { useUpdateNoteMutation } from "../utils/hooks";
import { NoteActionProps } from "../utils/types";
import { renderNavigationActionIcon } from "./AppNav";

export const ArchiveNote = ({ note, setNote }: NoteActionProps) => {
	const [toggleArchive] = useUpdateNoteMutation({
		onSuccess: (data) => {
			setNote(data);
			if (Platform.OS === "android")
				ToastAndroid.show(
					data.archived ? "Note Archived!" : "Note Unarchived!",
					ToastAndroid.LONG
				);
		}
	});

	const handleOnPress = () =>
		toggleArchive({ noteId: note.id, archived: !note.archived });

	return (
		<TopNavigationAction
			icon={renderNavigationActionIcon(
				note.archived ? "archive" : "archive-outline"
			)}
			onPress={handleOnPress}
		/>
	);
};
