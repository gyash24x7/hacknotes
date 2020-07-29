import React from "react";
import styled from "styled-components";
import { AppNav } from "../components/common/AppNav";
import { PageWrapper } from "../components/common/PageWrapper";
import { CreateNote } from "../components/Home/CreateNote";
import { NoteList } from "../components/Home/NoteList";

export const HomeContainer = styled.div`
	width: 100vw;
	align-self: flex-start;
`;

export const HomePage = () => {
	return (
		<PageWrapper>
			<AppNav />
			<HomeContainer>
				<CreateNote />
				<NoteList />
			</HomeContainer>
		</PageWrapper>
	);
};
