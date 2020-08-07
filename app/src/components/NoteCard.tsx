import { Card, Layout, Text } from "@ui-kitten/components";
import React, { Fragment } from "react";
import styled from "styled-components/native";
import { Note, NoteColors } from "../utils/types";

const NoteCardContainer = styled(Card)`
	margin: 5px 10px;
	border-radius: 10px;
	border-width: 1px;
	border-color: #c1c7d0;
`;

const NoteTitle = styled(Text)`
	font-family: "montserrat-bold";
	font-size: 16px;
`;

interface NoteContentProps {
	content: string;
}

const NoteContent = ({ content }: NoteContentProps) => {
	const { blocks } = JSON.parse(content);

	return (
		<Fragment>
			{blocks.map(({ text, key }: any) => (
				<Text key={key}>{text}</Text>
			))}
		</Fragment>
	);
};

interface NoteCardProps {
	note: Note;
}

export const NoteCard = ({ note }: NoteCardProps) => {
	return (
		<NoteCardContainer
			appearance="filled"
			key={note.id}
			style={{ backgroundColor: NoteColors[note.color] }}
			header={
				note.title
					? (props) => {
							return (
								<Layout {...props}>
									<NoteTitle>{note.title}</NoteTitle>
								</Layout>
							);
					  }
					: undefined
			}
		>
			<NoteContent content={note.content} />
		</NoteCardContainer>
	);
};
