import React, { Fragment } from "react";
import { useQuery } from "react-query";
import { getAllNotes } from "../api/notes";
import { AppError } from "../components/common/AppError";
import AppLoader from "../components/common/AppLoader";
import { VerticalSpacer } from "../components/common/VerticalSpacer";
import { NoteList } from "../components/Home/NoteList";
import { HelperText, HomeContainer } from "./Home";

export const ArchivePage = () => {
	const { error, data, isLoading } = useQuery(
		["notes", { archived: true }],
		(_key, filters) => getAllNotes(filters),
		{ refetchOnWindowFocus: false }
	);

	return (
		<HomeContainer>
			<VerticalSpacer size={70} />
			{isLoading && <AppLoader />}
			{data && (
				<Fragment>
					<NoteList notes={data} />
					{data.length === 0 && <HelperText>No Notes in Archive</HelperText>}
				</Fragment>
			)}
			{error && <AppError>{error.message}</AppError>}
		</HomeContainer>
	);
};
