import Tooltip from "@atlaskit/tooltip";
import React from "react";
import { useUpdateNoteMutation } from "../../hooks/useUpdateNoteMutation";
import { AppIconButton } from "../common/AppButton";
import ArchiveIcon from "../icons/ArchiveIcon";

interface ArchiveNoteProps {
	noteId: string;
	archived: boolean;
}

export const ArchiveNote = ({ noteId, archived }: ArchiveNoteProps) => {
	const [toggleArchive, { isLoading }] = useUpdateNoteMutation();

	return (
		<Tooltip
			content={`${archived ? "Unarchive" : "Archive"} note`}
			position="bottom"
		>
			<AppIconButton
				spacing="none"
				iconBefore={<ArchiveIcon filled={archived} />}
				appearance="subtle"
				isLoading={isLoading}
				isDisabled={isLoading}
				onClick={() => toggleArchive({ noteId, archived: !archived })}
			/>
		</Tooltip>
	);
};
