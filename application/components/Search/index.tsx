import * as React from "react";
import {Component, ChangeEvent, KeyboardEvent, MouseEvent} from "react";
import {MapDispatchToProps, connect} from "react-redux";

import {searchChange} from "../../modules/search/actions";
import {resultSearchStart} from "../../modules/result/actions";

import {State} from "../../modules/reducer";

import styles from "./styles.less";

interface SearchStateProps {
	text: string;
}

interface SearchDispatchProps {
	searchChange: typeof searchChange;
	resultSearchStart: typeof resultSearchStart;
}

interface SearchOwnProps {}

interface SearchProps extends SearchStateProps, SearchDispatchProps, SearchOwnProps {}

function mapStateToProps(state: State): SearchStateProps {
	return {
		text: state.search.text,
	};
}

const mapDispatchToProps: MapDispatchToProps<SearchDispatchProps, SearchOwnProps> = {
	searchChange,
	resultSearchStart,
};

class Search extends Component<SearchProps, any> {
	public render() {
		const {text} = this.props;
		const disabled = !text.length;

		return <div className={styles.root()}>
			<input className={styles.input()} type="text" placeholder="Enter username" value={text} onChange={this.onInputChange} onKeyPress={this.onInputKeyPress}/>
			<button className={styles.button(disabled && "disabled")} disabled={disabled} onClick={this.onButtonClick}>search</button>
		</div>;
	}

	private onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		this.props.searchChange(event.target.value);
	}

	private onInputKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
		if ((event.charCode === 13) && event.currentTarget.value.length) {
			this.search();
		}
	}

	private onButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
		this.search();
	}

	private search() {
		this.props.resultSearchStart();
	}
}

export default connect<SearchStateProps, SearchDispatchProps, SearchOwnProps, State>(mapStateToProps, mapDispatchToProps)(Search);
