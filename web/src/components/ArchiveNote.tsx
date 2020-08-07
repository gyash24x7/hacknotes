import Tooltip from "@atlaskit/tooltip";
import React from "react";
import { queryCache, useMutation } from "react-query";
import { updateNote } from "../api/notes";
import { useFlag } from "../utils/context";
import { Note } from "../utils/types";
import { AppIconButton } from "./AppButton";
import ArchiveIcon from "./icons/ArchiveIcon";

interface ArchiveNoteProps {
	noteId: string;
	archived: boolean;
}

export const ArchiveNote = ({ noteId, archived }: ArchiveNoteProps) => {
	const { addFlag } = useFlag();
	const [toggleArchive, { isLoading }] = useMutation(updateNote, {
		onSuccess: (data) => {
			queryCache.setQueryData<Note[]>(
				data.archived ? ["notes", { archived: true }] : "notes",
				(notes) => [data].concat(...(notes || []))
			);
			queryCache.setQueryData<Note[]>(
				data.archived ? "notes" : ["notes", { archived: true }],
				(notes) => notes?.filter(({ id }) => id !== data.id) || []
			);
			addFlag({
				title: `Note ${data.archived ? "Archived" : "Unarchived"}!`,
				appearance: "success"
			});
		}
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
