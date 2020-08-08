import { DrawerScreenProps } from "@react-navigation/drawer";
import { Layout, LayoutProps } from "@ui-kitten/components";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { AppContainer } from "../components/AppContainer";
import { TopNav } from "../components/AppNav";
import { NoteContent, NoteTitle } from "../components/NoteCard";
import { VerticalSpacer } from "../components/VerticalSpacer";
import { AppScreenParamList, NoteColors } from "../utils/types";

const ViewNoteCardContainer = styled(Layout)<LayoutProps & { color: string }>`
	flex: 1;
	background-color: ${({ color }) => color};
	padding: 10px 20px;
	width: 100%;
`;

export const NoteScreen = ({
	route: {
		params: { note }
	}
}: DrawerScreenProps<AppScreenParamList, "Note">) => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<TopNav title=" " isNoteScreen color={note.color} />
			<AppContainer>
				<ViewNoteCardContainer color={NoteColors[note.color]}>
					<NoteTitle>{note.title}</NoteTitle>
					<VerticalSpacer />
					<NoteContent content={note.content} />
				</ViewNoteCardContainer>
			</AppContainer>
		</SafeAreaView>
	);
};
