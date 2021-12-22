import React from 'react';
import { Link } from 'react-router-dom';

import {
	NotFoundContainer,
	NotFoundTitle,
	NotFoundParagraph,
} from './NotFoundPage.style';

export function NotFoundPage() {
	return (
		<NotFoundContainer>
			<NotFoundTitle>Sorry, but this page isn't available.</NotFoundTitle>
			<NotFoundParagraph>
				The link you followed may be broken or the page deleted.{' '}
				<Link to='/'>Back to Instagram.</Link>
			</NotFoundParagraph>
		</NotFoundContainer>
	);
}
