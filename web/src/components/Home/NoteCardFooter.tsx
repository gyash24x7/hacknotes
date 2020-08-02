import { ButtonGroup } from "@atlaskit/button";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { AppStore } from "../../store";
import { Note } from "../../utils/types";
import { AppCardFooter } from "../common/AppCard";
import { ArchiveNote } from "./ArchiveNote";
import { DeleteNote } from "./DeleteNote";
import { PinNote } from "./PinNote";
import { UpdateColor } from "./UpdateColor";

interface NoteCardFooterProps {
	noteId: string;
	isVisible: boolean;
}

export const NoteCardFooter = ({ isVisible, noteId }: NoteCardFooterProps) => {
	const { deleted } = useSelector<AppStore, Note>(
		(store) => store.notes.notes[noteId]
	);

	return (
		<AppCardFooter>
			{isVisible && (
				<Fragment>
					{!deleted && (
						<ButtonGroup>
							<ArchiveNote noteId={noteId} />
							<UpdateColor noteId={noteId} />
							<PinNote noteId={noteId} />
						</ButtonGroup>
					)}
					<ButtonGroup>
						<DeleteNote noteId={noteId} />
					</ButtonGroup>
				</Fragment>
			)}
		</AppCardFooter>
	);
};
