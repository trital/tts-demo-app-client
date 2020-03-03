import React, { useContext } from 'react';
import cn from 'src/utils/bem-cn';

import {
	Container,
	Header,
	Form,
	TextArea,
	Grid,
	Dropdown,
	Button,
} from 'semantic-ui-react';

import context from './context';
import * as actions from './actions';

import './styles/global.scss';

const className = 'app-main-container';
const el = name => cn(className, name);

const languageOptions = [
	{
		id: 1,
		text: 'Arabic',
		value: 'arb',
	},
	{
		id: 2,
		text: 'English - US',
		value: 'en-US',
	},
	{
		id: 3,
		text: 'Hindi',
		value: 'hi-IN',
	},
];

const voiceOptions = [
	{
		id: 1,
		text: 'Aditi',
		value: 'Aditi',
	},
	{
		id: 2,
		text: 'Emma',
		value: 'Emma',
	},
	{
		id: 3,
		text: 'Maja',
		value: 'Maja',
	},
];

export default () => {
	const { state, dispatch } = useContext(context);
	const {
		text,
		languageCode,
		voiceId,
		error,
		processing,
		speechData,
	} = state;

	if (error !== null) {
		throw new Error(error);
	}

	const changeText = (event, data) => {
		dispatch(actions.setApp({ text: data.value }));
	};

	const changeLanguage = (event, data) => {
		dispatch(actions.setApp({ languageCode: data.value }));
	};

	const changeVoice = (event, data) => {
		dispatch(actions.setApp({ voiceId: data.value }));
	};

	const synthesizeSpeech = () => {
		dispatch(actions.fetchSpeechData());
	};

	const isPlayDisabled = processing || !(text && languageCode && voiceId);

	if (speechData) {
		const uInt8Array = new Uint8Array(speechData.AudioStream.data);
		const arrayBuffer = uInt8Array.buffer;
		const blob = new Blob([arrayBuffer]);

		const url = URL.createObjectURL(blob);

		const audio = new Audio(url);

		audio.addEventListener('ended', () =>
			dispatch(actions.setApp({ speechData: null, processing: false })),
		);

		audio.play();
	}

	return (
		<Container fluid>
			<div className={className}>
				<Header size="large">
					Create realistic voice from text...
				</Header>

				<Form>
					<TextArea
						placeholder="Write something..."
						rows={5}
						onChange={changeText}
						value={text || ''}
					/>
				</Form>

				<div className={el('controls')}>
					<Grid columns={3}>
						<Grid.Row>
							<Grid.Column>
								<Dropdown
									placeholder="Language"
									search
									selection
									options={languageOptions}
									onChange={changeLanguage}
								/>
							</Grid.Column>
							<Grid.Column>
								<Dropdown
									placeholder="Voice"
									search
									selection
									options={voiceOptions}
									onChange={changeVoice}
								/>
							</Grid.Column>
							<Grid.Column>
								<Button
									content="Play"
									icon="play"
									fluid
									disabled={isPlayDisabled}
									onClick={synthesizeSpeech}
								/>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</div>
			</div>
		</Container>
	);
};
