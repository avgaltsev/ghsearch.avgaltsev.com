import * as React from "react";
import {Component, ChangeEvent, KeyboardEvent, MouseEvent} from "react";
import {MapDispatchToProps, connect} from "react-redux";

import {State} from "../../modules/reducer";
import {Status, User} from "../../modules/result/actions";

import styles from "./styles.less";

interface ResultStateProps {
	status: Status;
	user: User;
	error: string;
}

interface ResultDispatchProps {}

interface ResultOwnProps {}

interface ResultProps extends ResultStateProps, ResultDispatchProps, ResultOwnProps {}

function mapStateToProps(state: State): ResultStateProps {
	return {
		status: state.result.status,
		user: state.result.user,
		error: state.result.error,
	};
}

const mapDispatchToProps: MapDispatchToProps<ResultDispatchProps, ResultOwnProps> = {};

class Result extends Component<ResultProps, any> {
	private getStatus() {
		const {status, error} = this.props;

		if (status === "loading") {
			return <div className={styles.status()}>Loading...</div>;
		}

		if (error) {
			return <div className={styles.status()}>{error}</div>
		}

		return null;
	}

	private getUser() {
		const {user} = this.props;

		if (user) {
			return <div className={styles.user()}>
				<a className={styles.profile()} href={user.url} target="_blank">
					<img className={styles.avatar()} src={user.avatar}></img>
					<div className={styles.name()}>{user.name || user.login}</div>
				</a>

				<div className={styles.list()}>
					<h3>{`${user.login}'s repositories`}</h3>

					{
						user.repos.length ?
						<ul>
							{user.repos.map((repo) => <li key={repo.url}><a href={repo.url} target="_blank">{repo.name}</a></li>)}
						</ul> :
						<p>No repos</p>
					}
				</div>

				<div className={styles.list()}>
					<h3>{`${user.login}'s gists`}</h3>

					{
						user.gists.length ?
						<ul>
							{user.gists.map((gist) => <li key={gist.url}><a href={gist.url} target="_blank">{gist.description || "No description"}</a></li>)}
						</ul> :
						<p>No gists</p>
					}
				</div>
			</div>;
		}

		return null;
	}

	public render() {
		const {status, user, error} = this.props;

		return <div className={styles.root()}>
			{this.getStatus()}
			{this.getUser()}
		</div>;
	}
}

export default connect<ResultStateProps, ResultDispatchProps, ResultOwnProps, State>(mapStateToProps, mapDispatchToProps)(Result);
