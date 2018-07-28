import * as React from "react";
import {Store, createStore, applyMiddleware} from "redux";
import sagaMiddlewareFactory from "redux-saga";
import {Provider} from "react-redux";
import {render} from "react-dom";

import "./reset.less";
import "./default.less";
import "./main.less";

import Application from "./components/Application";
import reducer, {State} from "./modules/reducer";
import saga from "./modules/sagas";

if (typeof window !== "undefined") {
	window.addEventListener("load", (event) => {
		const sagaMiddleware = sagaMiddlewareFactory();
		const store = createStore<State, any, any, any>(reducer, applyMiddleware(sagaMiddleware));
		const application = <Provider store={store}><Application/></Provider>;

		sagaMiddleware.run(saga);

		render(application, document.getElementById("application"));
	});
}
