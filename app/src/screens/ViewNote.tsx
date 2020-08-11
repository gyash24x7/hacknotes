import { DrawerScreenProps } from "@react-navigation/drawer";
import { Layout, LayoutProps } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { queryCache, useMutation } from "react-query";
import styled from "styled-components/native";
import { updateNote } from "../api/notes";
import { AppContainer } from "../components/AppContainer";
import { TopNav } from "../components/AppNav";
import { VerticalSpacer } from "../components/VerticalSpacer";
import { ActiveNoteProvider } from "../utils/context";
import {
	AppScreenParamList,
	defaultNote,
	Note,
	NoteColors
} from "../utils/types";

const ViewNoteContainer = styled(Layout)<LayoutProps & { color: string }>`
	flex: 1;
	background-color: ${({ color }) => color};
	padding: 10px 20px;
	width: 100%;
`;

// const ViewNoteFooter = styled(Layout)`
// 	width: 100%;
// 	display: flex;
// 	flex-direction: row;
// 	justify-content: center;
// 	align-items: center;
// 	height: 30px;
// 	position: absolute;
// 	bottom: 0;
// 	background-color: transparent;
// `;

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

export const ViewNoteScreen = ({
	route: {
		params: { noteId, queryKey }
	},
	navigation
}: DrawerScreenProps<AppScreenParamList, "ViewNote">) => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [note, setNote] = useState(defaultNote);
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
			const notes = queryCache.getQueryData<Note[]>(queryKey);
			const foundNote = notes?.find((note) => note.id === noteId);
			setNote(foundNote || defaultNote);
			setTitle(foundNote?.title || "");
			setContent(
				JSON.parse(foundNote?.content || "{blocks:[]}").blocks.join("\n")
			);
		});

		return () => unsubscribe();
	}, [noteId, navigation]);

	useEffect(() => {
		const unsubscribe = navigation.addListener("blur", () => {
			const oldContent = JSON.parse(note!.content).blocks.join("\n");
			if (title !== note!.title || content !== oldContent)
				update({
					title,
					content: JSON.stringify({ blocks: content.split("\n") }),
					noteId
				});
		});

		return () => unsubscribe();
	}, [navigation, title, content]);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ActiveNoteProvider value={{ note, setNote }}>
				<TopNav title=" " screen="ViewNote" noteColor={note.color} />
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
					{/* <ViewNoteFooter>
					<Text category="label">
						Edited {formatDistance(updatedAt, new Date())} ago
					</Text>
				</ViewNoteFooter> */}
				</AppContainer>
			</ActiveNoteProvider>
		</SafeAreaView>
	);
};
