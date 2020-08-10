import { useNavigation } from "@react-navigation/native";
import { Card, Layout, Text } from "@ui-kitten/components";
import React, { Fragment } from "react";
import { ViewProps } from "react-native";
import styled from "styled-components/native";
import { Note, NoteColors } from "../utils/types";

const NoteCardContainer = styled(Card)`
	margin: 5px 10px;
	border-radius: 10px;
	border-width: 1px;
	border-color: #c1c7d0;
`;

export const NoteTitle = styled(Text)`
	font-family: "montserrat-bold";
	font-size: 16px;
`;

interface NoteContentProps {
	content: string;
}

export const NoteContent = ({ content }: NoteContentProps) => {
	const { blocks } = JSON.parse(content);

	return (
		<Fragment>
			{blocks.map((text: string, i: number) => (
				<Text key={i}>{text}</Text>
			))}
		</Fragment>
	);
};

interface NoteCardProps {
	note: Note;
}

export const NoteCard = ({ note }: NoteCardProps) => {
	const navigation = useNavigation();

	const renderCardHeader = (title?: string) => {
		if (title)
			return (props?: ViewProps) => (
				<Layout {...props}>
					<NoteTitle>{note.title}</NoteTitle>
				</Layout>
			);
		else return;
	};

	return (
		<NoteCardContainer
			appearance="filled"
			key={note.id}
			onPress={() => navigation.navigate("ViewNote", { note })}
			style={{ backgroundColor: NoteColors[note.color] }}
			header={renderCardHeader(note.title)}
		>
			<NoteContent content={note.content} />
		</NoteCardContainer>
	);
};
