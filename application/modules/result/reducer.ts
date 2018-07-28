import {combineReducers, Action} from "redux";

import {Status, User} from "./actions";

import {
	RESULT_SEARCH_START, ResultSearchStartAction,
	RESULT_SEARCH_SUCCESS, ResultSearchSuccessAction,
	RESULT_SEARCH_FAIL, ResultSearchFailAction,
} from "./actions";

export interface ResultState {
	status: Status;
	user: User;
	error: string;
}

function status(state: Status = "notLoaded", action: Action): Status {
	switch (action.type) {
		case RESULT_SEARCH_START:
			return "loading";

		case RESULT_SEARCH_SUCCESS:
			return "loaded";

		case RESULT_SEARCH_FAIL:
			return "error";

		default:
			return state;
	}
}

function user(state: User = null, action: Action): User {
	switch (action.type) {
		case RESULT_SEARCH_START:
			return null;

		case RESULT_SEARCH_SUCCESS:
			return (action as ResultSearchSuccessAction).user;

		case RESULT_SEARCH_FAIL:
			return null;

		default:
			return state;
	}
}

function error(state: string = null, action: Action): string {
	switch (action.type) {
		case RESULT_SEARCH_START:
			return null;

		case RESULT_SEARCH_SUCCESS:
			return null;

		case RESULT_SEARCH_FAIL:
			return (action as ResultSearchFailAction).error;

		default:
			return state;
	}
}

export default combineReducers<ResultState>({
	status,
	user,
	error,
});
