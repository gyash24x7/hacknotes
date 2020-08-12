import { Layout, LayoutProps, Text } from "@ui-kitten/components";
import formatDistance from "date-fns/formatDistance";
import React, { Fragment, useEffect, useState } from "react";
import { TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { queryCache, useMutation } from "react-query";
import styled from "styled-components/native";
import { updateNote } from "../api/notes";
import { AppContainer } from "../components/AppContainer";
import {
	FocusAwareStatusBar,
	renderBackButton,
	TopNav
} from "../components/AppNav";
import { ArchiveNote } from "../components/ArchiveNote";
import { PinNote } from "../components/PinNote";
import { UpdateColor } from "../components/UpdateColor";
import { VerticalSpacer } from "../components/VerticalSpacer";
import { defaultNote, Note, NoteColors, NoteScreenProps } from "../utils/types";

const ViewNoteContainer = styled(Layout)<LayoutProps & { color: string }>`
	flex: 1;
	background-color: ${({ color }) => color};
	padding: 10px 20px;
	width: 100%;
`;

const ViewNoteFooter = styled(Layout)`
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

export const ViewNoteScreen = ({ route, navigation }: NoteScreenProps) => {
	const [title, setTitle] = useState("");
	const [note, setNote] = useState<Note>(defaultNote);
	const [content, setContent] = useState("");
	const [update] = useMutation(updateNote, {
		onSuccess(data) {
			queryCache.setQueryData<Note[]>(
				note?.archived ? ["notes", { archived: true }] : "notes",
				(notes) => notes?.map((note) => (note.id === data.id ? data : note))
			);
			setTitle("");
			setContent("");
		}
	});

	useEffect(() => {
		const unsubscribe = navigation.addListener("focus", () => {
			setNote(route.params.note);
			setTitle(route.params.note.title);
			setContent(JSON.parse(route.params.note.content).blocks.join("\n"));
		});

		return () => unsubscribe();
	}, [route.params.note, navigation]);

	useEffect(() => {
		const unsubscribe = navigation.addListener("blur", () => {
			const oldContent = JSON.parse(note!.content).blocks.join("\n");
			if (title !== note!.title || content !== oldContent)
				update({
					title,
					content: JSON.stringify({ blocks: content.split("\n") }),
					noteId: note.id
				});
		});

		return () => unsubscribe();
	}, [navigation, title, content]);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: NoteColors[note.color] }}>
			<FocusAwareStatusBar
				backgroundColor={NoteColors[note.color]}
				barStyle="dark-content"
			/>
			<TopNav
				title=" "
				accessoryRight={() => (
					<Fragment>
						<ArchiveNote note={note} setNote={setNote} />
						<PinNote note={note} setNote={setNote} />
						<UpdateColor note={note} setNote={setNote} />
					</Fragment>
				)}
				accessoryLeft={renderBackButton()}
			/>
			<AppContainer>
				<ViewNoteContainer color={NoteColors[note.color]}>
					<NoteTitleInput
						value={title}
						placeholder="Title"
						placeholderTextColor="#14141466"
						onChangeText={setTitle}
						multiline
					/>
					<VerticalSpacer />
					<NoteContentInput
						value={content}
						onChangeText={setContent}
						placeholder="Content"
						placeholderTextColor="#14141466"
						multiline
					/>
				</ViewNoteContainer>
				<ViewNoteFooter>
					<Text category="label">
						Edited {formatDistance(new Date(note.updatedAt), new Date())} ago
					</Text>
				</ViewNoteFooter>
			</AppContainer>
		</SafeAreaView>
	);
};
