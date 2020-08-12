import Tooltip from "@atlaskit/tooltip";
import React from "react";
import { useFlag } from "../utils/context";
import { useUpdateNoteMutation } from "../utils/hooks";
import { AppIconButton } from "./AppButton";
import ArchiveIcon from "./icons/ArchiveIcon";

interface ArchiveNoteProps {
	noteId: string;
	archived: boolean;
}

export const ArchiveNote = ({ noteId, archived }: ArchiveNoteProps) => {
	const { addFlag } = useFlag();
	const [toggleArchive, { isLoading }] = useUpdateNoteMutation({
		onSuccess: (data) =>
			addFlag({
				title: `Note ${data.archived ? "Archived" : "Unarchived"}!`,
				appearance: "success"
			})
	});

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
