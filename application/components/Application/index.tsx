import * as React from "react";
import {Component} from "react";
import {MapDispatchToProps, connect} from "react-redux";

import {State} from "../../modules/reducer";

import Search from "../Search";
import Result from "../Result";

import styles from "./styles.less";

interface ApplicationStateProps {
	title: string;
	initial: boolean;
}

interface ApplicationDispatchProps {}

interface ApplicationOwnProps {}

interface ApplicationProps extends ApplicationStateProps, ApplicationDispatchProps, ApplicationOwnProps {}

function mapStateToProps(state: State): ApplicationStateProps {
	return {
		title: state.title,
		initial: state.result.status === "notLoaded",
	};
}

const mapDispatchToProps: MapDispatchToProps<ApplicationDispatchProps, ApplicationOwnProps> = {};

class Application extends Component<ApplicationProps, any> {
	public render() {
		const {title, initial} = this.props;

		if (typeof document !== "undefined") {
			document.title = title ? `${title} - GitHub Search` : "GitHub Search";
		}

		return <div className={styles.root()}>
			<h1 className={styles.title(initial && "initial")}>Github Search</h1>

			<div className={styles.search()}>
				<Search/>
			</div>

			<div className={styles.result(initial && "initial")}>
				<Result/>
			</div>
		</div>;
	}
}

export default connect<ApplicationStateProps, ApplicationDispatchProps, ApplicationOwnProps, State>(mapStateToProps, mapDispatchToProps)(Application);
