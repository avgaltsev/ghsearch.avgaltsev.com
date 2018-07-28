import {combineReducers} from "redux";

import {
	SEARCH_CHANGE, SearchChangeAction,
} from "./actions";

export interface SearchState {
	text: string;
}

function text(state: string = "", action: SearchChangeAction): string {
	switch (action.type) {
		case SEARCH_CHANGE:
			return action.text;

		default:
			return state;
	}
}

export default combineReducers<SearchState>({
	text,
});
