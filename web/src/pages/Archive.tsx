import React, { Fragment } from "react";
import { AppError } from "../components/AppError";
import AppLoader from "../components/AppLoader";
import { NoteList } from "../components/NoteList";
import { VerticalSpacer } from "../components/VerticalSpacer";
import { useArchivedNotesQuery } from "../utils/hooks";
import { HelperText, HomeContainer } from "./Home";

export const ArchivePage = () => {
	const { error, data, isLoading } = useArchivedNotesQuery();

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
