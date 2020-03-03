import React from 'react';

import Error from './Error';

export default class extends React.Component {
	state = {
		hasError: false,
		message: null,
	};

	static getDerivedStateFromError(error) {
		return {
			hasError: true,
			message: error.message,
		};
	}

	render() {
		if (this.state.hasError) {
			return <Error title="Oops!" message={this.state.message} />;
		}

		return this.props.children;
	}
}
