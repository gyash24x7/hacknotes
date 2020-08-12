import Popup from "@atlaskit/popup";
import { colors } from "@atlaskit/theme";
import Tooltip from "@atlaskit/tooltip";
import React, { useState } from "react";
import styled from "styled-components";
import { useFlag } from "../utils/context";
import { useUpdateNoteMutation } from "../utils/hooks";
import { NoteColors } from "../utils/types";
import { AppIconButton } from "./AppButton";
import PaletteIcon from "./icons/PaletteIcon";

export const Palette = styled.div`
	padding: 10px;
	display: flex;
	justify-content: space-between;
	width: 150px;
	flex-wrap: wrap;
`;

export const Color = styled.div`
	flex: 1;
	margin: 3px;
	border: 1px solid ${colors.N50};
	min-width: 20px;
	height: 20px;
	cursor: pointer;
`;

interface UpdateColorProps {
	noteId: string;
}

export const UpdateColor = ({ noteId }: UpdateColorProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const { addFlag } = useFlag();
	const [updateColor, { isLoading }] = useUpdateNoteMutation({
		onSuccess: () =>
			addFlag({ title: "Note Color Changed!", appearance: "success" })
	});

	const handleColorClick = (color: string) => () =>
		updateColor({ color, noteId });

	return (
		<Popup
			isOpen={isOpen}
			onClose={() => setIsOpen(false)}
			placement="top-start"
			content={() => (
				<Palette>
					{Object.keys(NoteColors).map((color) => (
						<Color
							key={color}
							style={{ backgroundColor: NoteColors[color] }}
							onClick={handleColorClick(color)}
						/>
					))}
				</Palette>
			)}
			trigger={({ ref, ...triggerProps }) => (
				<Tooltip content="Change Color" position="bottom">
					<AppIconButton
						{...triggerProps}
						innerRef={ref as any}
						onClick={() => setIsOpen(!isOpen)}
						iconBefore={<PaletteIcon />}
						appearance={isOpen ? "default" : "subtle"}
						isLoading={isLoading}
						isDisabled={isLoading}
					/>
				</Tooltip>
			)}
		/>
	);
};
