import React, { Fragment } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppContainer } from "../components/AppContainer";
import { AppLoader } from "../components/AppLoader";
import { TopNav } from "../components/AppNav";
import { ErrorText, HelperText } from "../components/AppTypography";
import { CreateNote } from "../components/CreateNote";
import { NoteList } from "../components/NoteList";
import { VerticalSpacer } from "../components/VerticalSpacer";
import { useAllNotesQuery } from "../utils/hooks";

export const HomeScreen = () => {
	const { error, data, isLoading } = useAllNotesQuery();

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
			<TopNav accessoryRight={CreateNote} />
			<AppContainer>
				<ScrollView style={{ width: "100%" }}>
					{data && (
						<Fragment>
							{data.filter((note) => note.pinned).length > 0 && (
								<NoteList notes={data} pinned />
							)}
							<NoteList notes={data} />
							{data.length === 0 && <HelperText>No Notes Available</HelperText>}
						</Fragment>
					)}
					{isLoading && <AppLoader />}
					{error && <ErrorText status="danger">{error.message}</ErrorText>}
					<VerticalSpacer />
				</ScrollView>
			</AppContainer>
		</SafeAreaView>
	);
};
