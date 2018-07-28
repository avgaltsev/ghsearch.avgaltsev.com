import {takeLatest, select, all, call, put} from "redux-saga/effects";

import {State} from "../reducer";

import {getUserByName, getReposByName, getGistsByName} from "../../api";

import {
	RESULT_SEARCH_START,
	resultSearchSuccess,
	resultSearchFail,
} from "./actions";

function* getUser() {
	const text = yield select((state: State) => state.search.text);

	try {
		const user = yield call(getUserByName, text);

		const [repos, gists] = yield all([
			call(getReposByName, text),
			call(getGistsByName, text),
		]);

		yield put(resultSearchSuccess({
			login: user.login,
			url: user.html_url,
			name: user.name,
			avatar: user.avatar_url,
			repos: repos.map((repo: any) => ({name: repo.name, url: repo.html_url})),
			gists: gists.map((gist: any) => ({description: gist.description, url: gist.html_url})),
		}));
	} catch (reason) {
		yield put(resultSearchFail(reason.message));
	}
}

export default function* () {
	yield takeLatest(RESULT_SEARCH_START, getUser);
}
