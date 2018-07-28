import {spawn} from "redux-saga/effects";

import result from "./result/sagas";

export default function* () {
	yield spawn(result);
}
