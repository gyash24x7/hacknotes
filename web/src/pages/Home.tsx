import React from "react";
import { PageWrapper } from "../components/common/PageWrapper";
import { Navbar } from "../components/Home/Navbar";
import { NoteList } from "../components/Home/NoteList";

export const HomePage = () => {
	return (
		<PageWrapper>
			<Navbar />
			<NoteList />
		</PageWrapper>
	);
};
