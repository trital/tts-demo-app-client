import axios from 'axios';

const API_PATH = `${process.env.API_PATH}/tts`;

export const fetchSpeechData = params => {
	return axios.post(`${API_PATH}/synthesize-speech`, { ...params });
};
