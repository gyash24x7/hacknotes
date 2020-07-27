import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import React, { Fragment, useRef, useState } from "react";
import { useClickAway } from "react-use";
import styled from "styled-components";
import { AppCard } from "../common/AppCard";
import { VerticalSpacer } from "../common/VerticalSpacer";

export const CreateNoteWrapper = styled.div`
	width: calc(100vw - 40px);
	padding: 0px 20px;
	padding-top: 76px;
	display: flex;
	justify-content: center;
`;

export const NoteInputContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	max-width: 500px;
	align-self: center;
`;

export const CreateNote = () => {
	const emptyEditorState = EditorState.createEmpty();
	const inputDivRef = useRef<HTMLDivElement>(null);
	const [title, setTitle] = useState(() => emptyEditorState);
	const [content, setContent] = useState(() => emptyEditorState);
	const [isTitleVisible, setIsTitleVisible] = useState(false);

	useClickAway(inputDivRef, () => setIsTitleVisible(false));

	return (
		<CreateNoteWrapper>
			<NoteInputContainer>
				<div style={{ width: "inherit" }} ref={inputDivRef}>
					<AppCard>
						{isTitleVisible && (
							<Fragment>
								<Editor
									editorState={title}
									onChange={setTitle}
									placeholder="Title"
								/>
								<VerticalSpacer />
							</Fragment>
						)}
						<Editor
							editorState={content}
							onChange={setContent}
							placeholder="Take a Note..."
							onFocus={() => setIsTitleVisible(true)}
						/>
					</AppCard>
				</div>
			</NoteInputContainer>
		</CreateNoteWrapper>
	);
};
