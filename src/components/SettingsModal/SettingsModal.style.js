import styled from 'styled-components';

import { color5 } from '../../theme/colors';

export const Row = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 10px 0;
	border-bottom: 1px solid ${color5};

	button {
		text-transform: capitalize;
		text-align: center;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
			'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
			'Helvetica Neue', sans-serif;
		letter-spacing: 1px;
	}
`;
