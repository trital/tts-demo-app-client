import * as actions from './actions';
import * as services from './services';

export default (state, dispatch) => action => {
	switch (action.type) {
		case actions.FETCH_SPEECH_DATA:
			{
				dispatch(actions.setApp({ processing: true }));

				const { text, languageCode, voiceId } = state;
				services
					.fetchSpeechData({
						text,
						languageCode,
						voiceId,
					})
					.then(({ data }) => {
						dispatch(
							actions.setApp({
								speechData: data,
								processing: false,
							}),
						);
					})
					.catch(error => {
						dispatch(
							actions.setApp({
								error,
								processing: false,
							}),
						);
					});
			}
			break;
		default:
			return dispatch(action);
	}
};
