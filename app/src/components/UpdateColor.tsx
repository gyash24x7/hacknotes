import {
	Icon,
	Layout,
	Modal,
	TopNavigationAction
} from "@ui-kitten/components";
import React, { Fragment, useState } from "react";
import { ImageProps, View } from "react-native";
import { queryCache, useMutation } from "react-query";
import styled from "styled-components/native";
import { updateNote } from "../api/notes";
import { useActiveNote } from "../utils/context";
import { Note, NoteColors } from "../utils/types";

const Color = styled(View)`
	border-width: 1px;
	border-color: #dfe1e6;
	width: 35px;
	height: 35px;
	border-radius: 3px;
	margin: 5px;
`;

const Palette = styled(Layout)`
	width: 275px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	flex-wrap: wrap;
	padding: 20px;
	border-radius: 5px;
	border-width: 1px;
	border-color: #dfe1e6;
`;

export const UpdateColor = () => {
	const [modalVisible, setModalVisible] = useState(false);
	const { note, setNote } = useActiveNote();
	const [updateColor] = useMutation(updateNote, {
		onSuccess: (data) => {
			queryCache.setQueryData<Note[]>(
				data.archived ? ["notes", { archived: true }] : "notes",
				(oldNotes) => {
					const newNotes = oldNotes?.map((note) => {
						if (note.id === data.id) return data;
						return note;
					});

					return newNotes || [];
				}
			);
			setNote(data);
		}
	});

	const handleColorClick = (color: string) => () =>
		updateColor({ color, noteId: note.id });

	const toggleMenu = () => setModalVisible(!modalVisible);

	const renderNavigationActionIcon = () => (props?: Partial<ImageProps>) => (
		<Icon name="color-palette-outline" {...props} size="xlarge" />
	);

	return (
		<Fragment>
			<TopNavigationAction
				icon={renderNavigationActionIcon()}
				onPress={toggleMenu}
			/>
			<Modal
				visible={modalVisible}
				backdropStyle={{ backgroundColor: "#14141466" }}
				onBackdropPress={() => setModalVisible(false)}
			>
				<Palette>
					{Object.keys(NoteColors).map((color) => (
						<Color
							key={color}
							style={{ backgroundColor: NoteColors[color] }}
							onTouchEnd={handleColorClick(color)}
						/>
					))}
				</Palette>
			</Modal>
		</Fragment>
	);
};
