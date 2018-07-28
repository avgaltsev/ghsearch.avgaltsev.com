import {Action} from "redux";

export type Status = "notLoaded" | "loading" | "loaded" | "error";

export interface Repo {
	name: string;
	url: string;
}

export interface Gist {
	description: string;
	url: string;
}

export interface User {
	login: string;
	url: string;
	name: string;
	avatar: string;
	repos: Repo[];
	gists: Gist[];
}

export const RESULT_SEARCH_START = "result/search:start";
export interface ResultSearchStartAction extends Action {}

export function resultSearchStart(): ResultSearchStartAction {
	return {
		type: RESULT_SEARCH_START,
	};
}

export const RESULT_SEARCH_SUCCESS = "result/search:success";
export interface ResultSearchSuccessAction extends Action {
	user: User;
}

export function resultSearchSuccess(user: User): ResultSearchSuccessAction {
	return {
		type: RESULT_SEARCH_SUCCESS,
		user,
	};
}

export const RESULT_SEARCH_FAIL = "result/search:fail";
export interface ResultSearchFailAction extends Action {
	error: string;
}

export function resultSearchFail(error: string): ResultSearchFailAction {
	return {
		type: RESULT_SEARCH_FAIL,
		error,
	};
}
