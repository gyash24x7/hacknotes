import { ButtonGroup } from "@atlaskit/button";
import React, { Fragment } from "react";
import { Note } from "../utils/types";
import { AppCardFooter } from "./AppCard";
import { ArchiveNote } from "./ArchiveNote";
import { DeleteNote } from "./DeleteNote";
import { PinNote } from "./PinNote";
import { UpdateColor } from "./UpdateColor";

interface NoteCardFooterProps {
	note: Note;
	isVisible: boolean;
}

export const NoteCardFooter = ({ isVisible, note }: NoteCardFooterProps) => (
	<AppCardFooter>
		{isVisible && (
			<Fragment>
				<ButtonGroup>
					<DeleteNote noteId={note.id} deleted={note.deleted} />
				</ButtonGroup>
				{!note.deleted && (
					<ButtonGroup>
						<ArchiveNote noteId={note.id} archived={note.archived} />
						<PinNote noteId={note.id} pinned={note.pinned} />
						<UpdateColor noteId={note.id} />
					</ButtonGroup>
				)}
			</Fragment>
		)}
	</AppCardFooter>
);
