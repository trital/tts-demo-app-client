import React from 'react';

export const initialState = {
	text: null,
	languageCode: null,
	voiceId: null,
	speechData: null,

	processing: false,
	error: null,
};

const AppContext = React.createContext(initialState);

export default AppContext;
