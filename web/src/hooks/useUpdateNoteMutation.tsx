import { useMutation } from "react-query";
import { updateNote } from "../api/notes";
import { UpdateNoteInput } from "../utils/types";

interface UpdateNoteMutationOptions {
	variables: UpdateNoteInput;
}

export const useUpdateNoteMutation = (data?: UpdateNoteMutationOptions) => {
	return useMutation((variables?: UpdateNoteInput) =>
		updateNote((variables || data?.variables)!)
	);
};
