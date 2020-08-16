import { TopNavigationAction } from "@ui-kitten/components";
import React from "react";
import { Platform, ToastAndroid } from "react-native";
import { useUpdateNoteMutation } from "../utils/hooks";
import { NoteActionProps } from "../utils/types";
import { renderNavigationActionIcon } from "./AppNav";

export const DeleteNote = ({ note, setNote }: NoteActionProps) => {
	const [toggleDelete] = useUpdateNoteMutation({
		onSuccess: (data) => {
			setNote(data);
			if (Platform.OS === "android")
				ToastAndroid.show(
					data.deleted ? "Note Deleted!" : "Note Restored!",
					ToastAndroid.LONG
				);
		}
	});

	const handleOnPress = () =>
		toggleDelete({ noteId: note.id, deleted: !note.deleted });

	return (
		<TopNavigationAction
			icon={renderNavigationActionIcon(
				note.deleted ? "refresh-outline" : "trash-outline"
			)}
			onPress={handleOnPress}
		/>
	);
};
