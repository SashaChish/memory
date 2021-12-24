import { fontSize } from '@mui/system';
import styled from 'styled-components';

import { color5 } from '../../theme/colors';

export const Row = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 10px 0;
	border-bottom: 1px solid ${color5};
	margin-top: -10px;
	font-weight: 500;

	button {
		text-transform: capitalize;
		text-align: center;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
			'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
			'Helvetica Neue', sans-serif;
		letter-spacing: 1px;
	}
`;

export const CloseIcon = styled.i`
    FontSize: large,
    display: flex,
    align-item: top,
}
`;
export const ImgTag = styled.img`
	height: 50px;
	width: 50px;
	border-radius: 50%;
	margin-right: 10px;
`;
export const FollowerInfo = styled.div``;

export const ProfileInfo = styled.div`
	margin-left: 20px;
`;
export const Profile = styled.div`
	display: flex;
	align-items: center;
	padding: 15px 0px 0;
`;
export const ProfileAvatar = styled.div``;
export const ProfileText = styled.div`
	width: -webkit-fill-available;
`;
export const Name = styled.div``;

export const Cansel = styled.span`
	cursor: pointer;
	color: #0095f6;
	margin-right: 10px;
`;
export const Link = styled.a``;
