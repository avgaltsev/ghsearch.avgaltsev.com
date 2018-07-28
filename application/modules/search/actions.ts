import {Action} from "redux";

export const SEARCH_CHANGE = "search/change";
export interface SearchChangeAction extends Action {
	text: string;
}

export function searchChange(text: string): SearchChangeAction {
	return {
		type: SEARCH_CHANGE,
		text,
	};
}
