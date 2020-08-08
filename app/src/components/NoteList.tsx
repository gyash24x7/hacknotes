import { Layout, List, Text } from "@ui-kitten/components";
import React from "react";
import styled from "styled-components/native";
import { Note } from "../utils/types";
import { NoteCard } from "./NoteCard";
import { VerticalSpacer } from "./VerticalSpacer";

interface NoteListProps {
	notes: Note[];
	pinned?: boolean;
}

const NoteListContainer = styled(Layout)`
	flex: 1;
	width: 100%;
`;

export const NoteList = ({ notes, pinned }: NoteListProps) => {
	return (
		<NoteListContainer>
			{!!pinned && <Text>Pinned Notes</Text>}
			<List
				data={notes.filter((note) => note.pinned === !!pinned)}
				renderItem={({ item }) => <NoteCard note={item} />}
				style={{ backgroundColor: "#fff" }}
			/>
			{!!pinned && <VerticalSpacer />}
		</NoteListContainer>
	);
};
