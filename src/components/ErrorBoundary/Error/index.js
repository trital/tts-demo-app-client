import React from 'react';

import './styles.scss';

export default ({ title, message }) => (
	<div className="error-boundary-error">
		<div className="error-boundary-error__title">{title}</div>
		<div className="error-boundary-error__message">{message}</div>
	</div>
);
