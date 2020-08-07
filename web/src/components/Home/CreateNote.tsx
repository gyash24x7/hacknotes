import { ButtonGroup } from "@atlaskit/button";
import { convertToRaw, Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { queryCache, useMutation } from "react-query";
import { useClickAway } from "react-use";
import styled from "styled-components";
import { createNote } from "../../api/notes";
import { useFlag } from "../../utils/context";
import { Note } from "../../utils/types";
import { AppButton } from "../common/AppButton";
import { AppCard, AppCardFooter } from "../common/AppCard";
import { AppError } from "../common/AppError";
import { VerticalSpacer } from "../common/VerticalSpacer";

export const CreateNoteWrapper = styled.div`
	width: calc(100vw - 40px);
	padding: 0px 20px;
	padding-top: 90px;
	display: flex;
	justify-content: center;
`;

export const NoteInputContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	max-width: 700px;
	align-self: center;
`;

const emptyEditorState = EditorState.createEmpty();

export const CreateNote = () => {
	const inputDivRef = useRef<HTMLDivElement>(null);
	const { addFlag } = useFlag();
	const [titleEditorState, setTitleEditorState] = useState(emptyEditorState);
	const [contentEditorState, setContentEditorState] = useState(
		emptyEditorState
	);
	const [isTitleVisible, setIsTitleVisible] = useState(false);
	const [errorMsg, setErrorMsg] = useState<string>();
	const titleEditorRef = useRef<Editor>(null);
	const [create, { isLoading }] = useMutation(createNote, {
		onError: (err) => setErrorMsg(err.message),
		onSuccess: (data) => {
			queryCache.setQueryData<Note[]>("notes", (notes) =>
				[data].concat(...(notes || []))
			);
			addFlag({ title: "Note Added!", appearance: "success" });
			reset();
		}
	});

	const titleBlockStyleFn = () => "noteTitleText";
	const contentBlockStyleFn = () => "noteContentText";

	const saveNote = () => {
		const titleContentState = titleEditorState.getCurrentContent();
		const title = titleContentState.getPlainText(" ");
		const contentContentState = contentEditorState.getCurrentContent();
		const contentStr = contentContentState.getPlainText("");
		if (!!title || !!contentStr) {
			const content = JSON.stringify(convertToRaw(contentContentState));
			create({ title, content });
		} else {
			setErrorMsg("Both Title and Content cannot be Empty!");
		}
	};

	const reset = () => {
		titleEditorRef.current?.focus();
		setTitleEditorState(emptyEditorState);
		setContentEditorState(emptyEditorState);
		setErrorMsg(undefined);
		setIsTitleVisible(false);
	};

	useClickAway(inputDivRef, () => {
		const title = titleEditorState.getCurrentContent().getPlainText("");
		const content = contentEditorState.getCurrentContent().getPlainText("");
		if (!title && !content) reset();
	});

	useEffect(() => {
		const elem = document.querySelector(
			"#contentEditor .public-DraftEditorPlaceholder-inner"
		);
		if (isTitleVisible) {
			elem?.classList.add("isFocused");
		} else {
			elem?.classList.remove("isFocused");
		}
	}, [isTitleVisible]);

	return (
		<CreateNoteWrapper>
			<NoteInputContainer>
				<div style={{ width: "inherit" }} ref={inputDivRef}>
					<AppCard style={{ cursor: "unset" }}>
						{isTitleVisible && (
							<div id="titleEditor">
								<Editor
									editorState={titleEditorState}
									onChange={setTitleEditorState}
									placeholder="Title"
									blockStyleFn={titleBlockStyleFn}
									ref={titleEditorRef}
									stripPastedStyles
								/>
								<VerticalSpacer />
							</div>
						)}
						<div id="contentEditor">
							<Editor
								editorState={contentEditorState}
								onChange={setContentEditorState}
								placeholder="Take a Note..."
								blockStyleFn={contentBlockStyleFn}
								onFocus={() => setIsTitleVisible(true)}
								stripPastedStyles
							/>
						</div>
						{isTitleVisible && (
							<Fragment>
								<VerticalSpacer />
								<AppCardFooter>
									<ButtonGroup>
										<AppButton
											spacing="compact"
											appearance="primary"
											onClick={saveNote}
											isLoading={isLoading}
											isDisabled={isLoading}
										>
											Save
										</AppButton>
										<AppButton spacing="compact" onClick={reset}>
											Cancel
										</AppButton>
									</ButtonGroup>
									{errorMsg && <AppError>{errorMsg}</AppError>}
								</AppCardFooter>
							</Fragment>
						)}
					</AppCard>
				</div>
			</NoteInputContainer>
		</CreateNoteWrapper>
	);
};
