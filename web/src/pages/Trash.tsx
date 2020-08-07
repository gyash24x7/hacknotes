import React, { Fragment } from "react";
import { useQuery } from "react-query";
import { getAllNotes } from "../api/notes";
import { AppError } from "../components/AppError";
import AppLoader from "../components/AppLoader";
import { NoteList } from "../components/NoteList";
import { VerticalSpacer } from "../components/VerticalSpacer";
import { HelperText, HomeContainer } from "./Home";

export const TrashPage = () => {
	const { error, data, isLoading } = useQuery(
		["notes", { deleted: true }],
		(_key, filters) => getAllNotes(filters),
		{ refetchOnWindowFocus: false }
	);

	return (
		<HomeContainer>
			<VerticalSpacer size={90} />
			<HelperText>Notes in trash will be deleted after 30 days</HelperText>
			<VerticalSpacer size={10} />
			{isLoading && <AppLoader />}
			{data && (
				<Fragment>
					<NoteList notes={data} />
					{data.length === 0 && <HelperText>No Notes in Trash</HelperText>}
				</Fragment>
			)}
			{error && <AppError>{error.message}</AppError>}
		</HomeContainer>
	);
};
