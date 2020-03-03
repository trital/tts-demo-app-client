import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';

import App from './app';
import ErrorBoundary from './components/ErrorBoundary';

import reducer from './reducer';
import AppContext, { initialState } from './context';

import dispatchMiddleware from './effects';

import 'semantic-ui-css/semantic.min.css';

const Index = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<ErrorBoundary>
			<AppContext.Provider
				value={{ state, dispatch: dispatchMiddleware(state, dispatch) }}
			>
				<App />
			</AppContext.Provider>
		</ErrorBoundary>
	);
};

ReactDOM.render(<Index />, document.getElementById('root'));
