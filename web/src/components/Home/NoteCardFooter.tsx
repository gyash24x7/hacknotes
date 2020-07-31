import { ButtonGroup } from "@atlaskit/button";
import React from "react";
import { AppCardFooter } from "../common/AppCard";
import { ArchiveNote } from "./ArchiveNote";
import { UpdateColor } from "./UpdateColor";

interface NoteCardFooterProps {
	noteId: string;
	isVisible: boolean;
}

export const NoteCardFooter = ({ isVisible, noteId }: NoteCardFooterProps) => {
	return (
		<AppCardFooter>
			{isVisible && (
				<ButtonGroup>
					{/* <AppIconButton
							spacing="none"
							iconBefore={<BellIcon label="reminder" />}
							appearance="subtle"
						/>
						<AppIconButton
							spacing="none"
							iconBefore={<CollaboratorIcon label="collaborators" />}
							appearance="subtle"
						/>
						<AppIconButton
							spacing="none"
							iconBefore={<ImageIcon label="image" />}
							appearance="subtle"
						/>
						<AppIconButton
							spacing="none"
							iconBefore={<LinkIcon label="links" />}
							appearance="subtle"
						/>
						<AppIconButton
							spacing="none"
							iconBefore={<PaletteIcon />}
							appearance="subtle"
						/> */}
					<ArchiveNote noteId={noteId} />
					<UpdateColor noteId={noteId} />
				</ButtonGroup>
			)}
		</AppCardFooter>
	);
};
