import styled from 'styled-components';

import { color5 } from '../../theme/colors';

export const TitleRow = styled.div`
	padding: 20px;
	border-bottom: 1px solid ${color5};
	display: flex;
	align-items: center;
	justify-content: center;

	h3 {
		text-align: center;
		font-size: 18px;
		line-height: 24px;
		font-weight: 600;
	}
`;

export const Row = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 10px 0;
	border-bottom: 1px solid ${color5};

	button,
	label {
		text-transform: capitalize;
		text-align: center;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
			'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
			'Helvetica Neue', sans-serif;
		letter-spacing: 1px;
	}
`;
