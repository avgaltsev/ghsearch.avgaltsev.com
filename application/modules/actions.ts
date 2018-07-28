import {Action} from "redux";

export const SET_TITLE = "setTitle";
export interface SetTitleAction extends Action {
	title: string;
}

export function setTitle(title: string): SetTitleAction {
	return {
		type: SET_TITLE,
		title,
	};
}
