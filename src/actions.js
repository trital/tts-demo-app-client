const prefix = 'main';

export const SET_APP = `${prefix}/SET_APP`;
export const setApp = app => ({ type: SET_APP, payload: app });

export const FETCH_SPEECH_DATA = `${prefix}/FETCH_SPEECH_DATA`;
export const fetchSpeechData = () => ({
	type: FETCH_SPEECH_DATA,
});
