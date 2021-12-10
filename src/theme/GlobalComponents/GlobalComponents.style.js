import styled from 'styled-components';

import { color1 } from '../colors';

export const PageWrapper = styled.section`
	display: flex;
	align-items: stretch;
	min-height: 100vh;
	flex-grow: 1;
	flex-direction: column;
	background: ${color1};
`;

export const Main = styled.main`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
`;
