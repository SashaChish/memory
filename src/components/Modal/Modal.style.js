import styled from 'styled-components';

import { color2 } from '../../theme/colors';

export const ModalContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: 10px;
	width: 400px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background: ${color2};
	border-radius: 15px;

	@media (max-width: 735px) {
		width: max-content;
	}
`;
