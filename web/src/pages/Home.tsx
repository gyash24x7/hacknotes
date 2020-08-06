import React, { Fragment } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getAllNotes } from "../api/notes";
import { AppError } from "../components/common/AppError";
import AppLoader from "../components/common/AppLoader";
import { VerticalSpacer } from "../components/common/VerticalSpacer";
import { CreateNote } from "../components/Home/CreateNote";
import { NoteList } from "../components/Home/NoteList";

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
