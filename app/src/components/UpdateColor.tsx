import { Layout, Modal, TopNavigationAction } from "@ui-kitten/components";
import React, { Fragment, useRef } from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { useUpdateNoteMutation } from "../utils/hooks";
import { NoteActionProps, NoteColors } from "../utils/types";
import { renderNavigationActionIcon } from "./AppNav";

const Color = styled(View)`
	border-width: 1px;
	border-color: #dfe1e6;
	width: 35px;
	height: 35px;
	border-radius: 3px;
	margin: 5px;
`;

const Palette = styled(Layout)`
	width: 275px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	flex-wrap: wrap;
	padding: 20px;
	border-radius: 5px;
	border-width: 1px;
	border-color: #dfe1e6;
`;

export const UpdateColor = ({ note, setNote }: NoteActionProps) => {
	const modalRef = useRef<Modal>(null);
	const [updateColor] = useUpdateNoteMutation({
		onSuccess(data) {
			setNote(data);
			modalRef.current?.hide();
		}
	});

	const handleColorClick = (color: string) => () => {
		updateColor({ color, noteId: note.id });
	};

	return (
		<Fragment>
			<TopNavigationAction
				icon={renderNavigationActionIcon("color-palette-outline")}
				onPress={() => modalRef.current?.show()}
			/>
			<Modal
				ref={modalRef}
				backdropStyle={{ backgroundColor: "#14141466" }}
				onBackdropPress={() => modalRef.current?.hide()}
			>
				<Palette>
					{Object.keys(NoteColors).map((color) => (
						<Color
							key={color}
							style={{ backgroundColor: NoteColors[color] }}
							onTouchEnd={handleColorClick(color)}
						/>
					))}
				</Palette>
			</Modal>
		</Fragment>
	);
};
