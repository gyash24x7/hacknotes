import React, { Fragment } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppContainer } from "../components/AppContainer";
import { AppLoader } from "../components/AppLoader";
import { TopNav } from "../components/AppNav";
import { ErrorText, HelperText } from "../components/AppTypography";
import { NoteList } from "../components/NoteList";
import { VerticalSpacer } from "../components/VerticalSpacer";
import { useDeletedNotesQuery } from "../utils/hooks";

export const TrashScreen = () => {
	const { error, data, isLoading } = useDeletedNotesQuery();

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
			<TopNav title="Trash" />
			<AppContainer>
				<ScrollView style={{ width: "100%" }}>
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
