import React, { Fragment } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "react-query";
import { getAllNotes } from "../api/notes";
import { AppContainer } from "../components/AppContainer";
import { AppLoader } from "../components/AppLoader";
import { TopNav } from "../components/AppNav";
import { ErrorText, HelperText } from "../components/AppTypography";
import { NoteList } from "../components/NoteList";
import { VerticalSpacer } from "../components/VerticalSpacer";

export const TrashScreen = () => {
	const { error, data, isLoading } = useQuery(
		["notes", { deleted: true }],
		(_key, filters) => getAllNotes(filters),
		{ refetchOnWindowFocus: false }
	);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<TopNav title="Trash" screen="Trash" />
			<AppContainer>
				<ScrollView>
					{data && (
						<Fragment>
							{data.length > 0 ? (
								<NoteList notes={data} />
							) : (
								<HelperText>No Notes in Trash</HelperText>
							)}
						</Fragment>
					)}
					{error && <ErrorText status="danger">{error.message}</ErrorText>}
					{isLoading && <AppLoader />}
					<VerticalSpacer />
				</ScrollView>
			</AppContainer>
		</SafeAreaView>
	);
};
