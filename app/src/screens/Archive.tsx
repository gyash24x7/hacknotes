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

export const ArchiveScreen = () => {
	const { error, data, isLoading } = useQuery(
		["notes", { archived: true }],
		(_key, filters) => getAllNotes(filters),
		{ refetchOnWindowFocus: false }
	);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<TopNav title="Archive" screen="Archive" />
			<AppContainer>
				<ScrollView>
					{data && (
						<Fragment>
							{data.length > 0 ? (
								<NoteList
									notes={data}
									queryKey={["notes", { archived: true }]}
								/>
							) : (
								<HelperText>No Notes in Archive</HelperText>
							)}
						</Fragment>
					)}
					{error && <ErrorText>{error.message}</ErrorText>}
					{isLoading && <AppLoader />}
					<VerticalSpacer />
				</ScrollView>
			</AppContainer>
		</SafeAreaView>
	);
};
