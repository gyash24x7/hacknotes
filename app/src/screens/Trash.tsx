import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "react-query";
import { getAllNotes } from "../api/notes";
import { AppContainer } from "../components/AppContainer";
import { AppLoader } from "../components/AppLoader";
import { TopNav } from "../components/AppNav";
import { ErrorText } from "../components/AppTypography";
import { NoteList } from "../components/NoteList";

export const TrashScreen = () => {
	const { error, data, isLoading } = useQuery(
		["notes", { deleted: true }],
		(_key, filters) => getAllNotes(filters),
		{ refetchOnWindowFocus: false }
	);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<TopNav />
			<AppContainer>
				{data && <NoteList notes={data} />}
				{error && <ErrorText status="danger">{error.message}</ErrorText>}
				{isLoading && <AppLoader />}
			</AppContainer>
		</SafeAreaView>
	);
};
