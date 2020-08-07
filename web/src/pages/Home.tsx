import React, { Fragment } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getAllNotes } from "../api/notes";
import { AppError } from "../components/AppError";
import AppLoader from "../components/AppLoader";
import { CreateNote } from "../components/CreateNote";
import { NoteList } from "../components/NoteList";
import { VerticalSpacer } from "../components/VerticalSpacer";

export const HomeContainer = styled.div`
	width: 100vw;
	align-self: flex-start;
`;

export const HelperText = styled.div`
	text-align: center;
	text-transform: uppercase;
	font-weight: bold;
`;

export const HomePage = () => {
	const { error, data, isLoading } = useQuery("notes", () => getAllNotes(), {
		refetchOnWindowFocus: false
	});

	return (
		<HomeContainer>
			<CreateNote />
			{isLoading && <AppLoader />}
			{data && (
				<Fragment>
					<VerticalSpacer />
					{data.filter((note) => note.pinned).length > 0 && (
						<NoteList notes={data} pinned />
					)}
					<NoteList notes={data} pinned={false} />
					{data.length === 0 && <HelperText>No Notes Available</HelperText>}
				</Fragment>
			)}
			{error && <AppError>{error.message}</AppError>}
		</HomeContainer>
	);
};
