import { Injectable, PipeTransform } from "@nestjs/common";
import { GetNotesInput } from "./note.inputs";

@Injectable()
export class ValidateNoteFiltersPipe implements PipeTransform {
	transform({ archived, deleted }: any) {
		let options: GetNotesInput = { archived: false, deleted: false };
		if (!!archived && archived === "true") options.archived = true;
		if (!!deleted && deleted === "true") options.deleted = true;

		return options;
	}
}
