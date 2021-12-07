import styled from 'styled-components';
import { color5 } from '../../theme/colors';

export const PostsWrapper = styled.div`
	@media (max-width: 735px) {
		border-top: ${color5};
	}
`;

export const PostsContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 5px;

	img {
		max-width: 100%;
		height: auto;
		object-fit: cover;
	}
`;
