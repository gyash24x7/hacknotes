import { Layout, LayoutProps, Text } from "@ui-kitten/components";
import formatDistance from "date-fns/formatDistance";
import React, { Fragment, useEffect, useState } from "react";
import { TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { AppContainer } from "../components/AppContainer";
import { renderBackButton, TopNav } from "../components/AppNav";
import { ArchiveNote } from "../components/ArchiveNote";
import { PinNote } from "../components/PinNote";
import { UpdateColor } from "../components/UpdateColor";
import { VerticalSpacer } from "../components/VerticalSpacer";
import { useCreateNoteMutation, useUpdateNoteMutation } from "../utils/hooks";
import {
	defaultNote,
	Note,
	NoteActionProps,
	NoteColors,
	NoteScreenProps
} from "../utils/types";

const NoteContainer = styled(Layout)<LayoutProps & { color: string }>`
	flex: 1;
	background-color: ${({ color }) => color};
	padding: 10px 20px;
	width: 100%;
`;

const NoteFooter = styled(Layout)`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	height: 30px;
	position: absolute;
	bottom: 0;
	background-color: transparent;
`;

const NoteTitleInput = styled(TextInput)`
	color: #141414;
	font-size: 18px;
	font-family: "montserrat-bold";
	font-weight: normal;
`;

const NoteContentInput = styled(TextInput)`
	color: #141414;
	font-size: 14px;
	font-family: "montserrat-regular";
	flex: 1;
	text-align-vertical: top;
`;

const renderNoteActions = ({ note, setNote }: NoteActionProps) => () => (
	<Fragment>
		<ArchiveNote note={note} setNote={setNote} />
		<PinNote note={note} setNote={setNote} />
		<UpdateColor note={note} setNote={setNote} />
	</Fragment>
);

export const NoteScreen = ({ route, navigation }: NoteScreenProps) => {
	const [note, setNote] = useState<Note>(defaultNote);
	const [updateNote] = useUpdateNoteMutation();
	const [createNote] = useCreateNoteMutation();

	useEffect(() => {
		const unsubscribe = navigation.addListener("focus", () => {
			if (route.params.note) setNote(route.params.note);
			else setNote(defaultNote);
		});

		return () => unsubscribe();
	}, [route.params.note, navigation]);

	useEffect(() => {
		const unsubscribe = navigation.addListener("blur", () => {
			const oldNote = route.params.note;
			if (oldNote) {
				if (note.title !== oldNote.title || note.content !== oldNote.content)
					updateNote({
						title: note.title,
						content: note.content,
						noteId: note.id
					});
			} else createNote({ title: note.title, content: note.content });
		});

		return () => unsubscribe();
	}, [navigation, note]);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: NoteColors[note.color] }}>
			<TopNav
				title=" "
				accessoryRight={
					route.params.note ? renderNoteActions({ note, setNote }) : undefined
				}
				accessoryLeft={renderBackButton()}
			/>
			<AppContainer>
				<NoteContainer color={NoteColors[note.color]}>
					<NoteTitleInput
						value={note.title}
						placeholder="Title"
						placeholderTextColor="#14141466"
						onChangeText={(title) => setNote((note) => ({ ...note, title }))}
						multiline
					/>
					<VerticalSpacer />
					<NoteContentInput
						value={note.content}
						onChangeText={(content) =>
							setNote((note) => ({ ...note, content }))
						}
						placeholder="Content"
						placeholderTextColor="#14141466"
						multiline
					/>
				</NoteContainer>
				<NoteFooter>
					<Text category="label">
						Edited {formatDistance(new Date(note.updatedAt), new Date())} ago
					</Text>
				</NoteFooter>
			</AppContainer>
		</SafeAreaView>
	);
};
