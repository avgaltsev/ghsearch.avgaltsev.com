import {combineReducers} from "redux";

import {
	SET_TITLE, SetTitleAction,
} from "./actions";

import search, {SearchState} from "./search/reducer";
import result, {ResultState} from "./result/reducer";

export interface State {
	title: string;

	search: SearchState;
	result: ResultState;
}

function title(state = "", action: SetTitleAction): string {
	switch (action.type) {
		case SET_TITLE:
			return action.title;

		default:
			return state;
	}
}

export default combineReducers<State>({
	title,

	search,
	result,
});
