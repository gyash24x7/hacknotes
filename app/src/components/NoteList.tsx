import { Layout } from "@ui-kitten/components";
import React from "react";
import { QueryKeyOrPredicateFn } from "react-query";
import styled from "styled-components/native";
import { Note } from "../utils/types";
import { BoldText } from "./AppTypography";
import { NoteCard } from "./NoteCard";
import { VerticalSpacer } from "./VerticalSpacer";

interface NoteListProps {
	notes: Note[];
	pinned?: boolean;
	queryKey: QueryKeyOrPredicateFn;
}

const NoteListContainer = styled(Layout)`
	width: 100%;
`;

const NoteListText = styled(BoldText)`
	margin-left: 10px;
	margin-bottom: 5px;
	text-transform: uppercase;
	text-align: center;
`;

export const NoteList = ({ notes, pinned, queryKey }: NoteListProps) => {
	return (
		<NoteListContainer>
			{!!pinned && <NoteListText category="label">Pinned Notes</NoteListText>}
			<Layout>
				{notes
					.filter((note) => note.pinned === !!pinned)
					.map((note) => (
						<NoteCard note={note} key={note.id} queryKey={queryKey} />
					))}
			</Layout>
			{!!pinned && <VerticalSpacer />}
			{!!pinned && <NoteListText category="label">Other Notes</NoteListText>}
		</NoteListContainer>
	);
};
