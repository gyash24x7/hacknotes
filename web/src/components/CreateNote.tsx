import { ButtonGroup } from "@atlaskit/button";
import React, { Fragment, useRef, useState } from "react";
import { queryCache, useMutation } from "react-query";
import TextArea from "react-textarea-autosize";
import { useClickAway } from "react-use";
import styled from "styled-components";
import { createNote } from "../api/notes";
import { useFlag } from "../utils/context";
import { Note } from "../utils/types";
import { AppButton } from "./AppButton";
import { AppCard, AppCardFooter } from "./AppCard";
import { AppError } from "./AppError";
import { VerticalSpacer } from "./VerticalSpacer";

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

export const ContentTextArea = styled(TextArea)`
	background-color: transparent;
	border-color: transparent;
	width: 100%;
	font-size: 18px;
	font-family: "Montserrat";
	resize: none;

	&:focus {
		outline-style: unset;
	}

	&.withTitle {
		font-size: 14px;
	}
`;

export const TitleTextInput = styled.input`
	background-color: transparent;
	border-color: transparent;
	width: 100%;
	font-size: 18px;
	font-family: "Montserrat";
	font-weight: bold;

	&:focus {
		outline-style: unset;
	}
`;

export const CreateNote = () => {
	const inputDivRef = useRef<HTMLDivElement>(null);
	const { addFlag } = useFlag();
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [isTitleVisible, setIsTitleVisible] = useState(false);
	const [errorMsg, setErrorMsg] = useState<string>();

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

	const saveNote = () => {
		if (!!title || !!content) {
			create({
				title,
				content: JSON.stringify({ blocks: content.split("\n") })
			});
		} else {
			setErrorMsg("Both Title and Content cannot be Empty!");
		}
	};

	const reset = () => {
		setTitle("");
		setContent("");
		setErrorMsg(undefined);
		setIsTitleVisible(false);
	};

	useClickAway(inputDivRef, () => {
		if (!title && !content) reset();
	});

	return (
		<CreateNoteWrapper>
			<NoteInputContainer>
				<div style={{ width: "inherit" }} ref={inputDivRef}>
					<AppCard style={{ cursor: "unset" }}>
						{isTitleVisible && (
							<Fragment>
								<TitleTextInput
									placeholder="Title"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
								/>
								<VerticalSpacer size={10} />
							</Fragment>
						)}
						<ContentTextArea
							value={content}
							onChange={(e) => setContent(e.target.value)}
							placeholder="Take a Note..."
							onFocus={() => setIsTitleVisible(true)}
							className={isTitleVisible ? "withTitle" : ""}
						/>
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
