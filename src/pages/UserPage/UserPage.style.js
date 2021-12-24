import styled from 'styled-components';

import { color1, color2, color3, color5 } from '../../theme/colors';

export const ContentContainer = styled.div`
	max-width: 935px;
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	margin: 0 auto;

	@media (min-width: 736px) {
		padding: 30px 20px 0;
		width: calc(100% - 40px);
	}

	@media (max-width: 735px) {
		width: 100%;
	}
`;

export const ContentHeader = styled.header`
	display: flex;
	align-items: stretch;

	@media (min-width: 736px) {
		margin-bottom: 44px;
	}

	@media (max-width: 735px) {
		margin: 16px 16px 24px;
	}
`;

export const AvatarWrapper = styled.div`
	display: flex;
	align-items: stretch;

	& > div {
		margin: 0 auto;
		@media (min-width: 736px) {
			height: 150px;
			width: 150px;
		}

		@media (max-width: 735px) {
			height: 77px;
			width: 77px;
		}
	}

	@media (min-width: 736px) {
		flex: 1 0 0;
		margin-right: 30px;
	}

	@media (max-width: 735px) {
		margin-right: 28px;
		justify-content: center;
	}
`;

export const AvatarContainer = styled.div`
	background: ${color1};
	border-radius: 50%;
	height: 100%;
	width: 100%;
	margin: 0 auto;

	button {
		border: 0;
		cursor: pointer;
		height: 100%;
		padding: 0;
		width: 100%;
		background: ${color1};
	}
`;

export const Avatar = styled.img`
	border-radius: 50%;
	height: 100%;
	width: 100%;
	object-fit: cover;
`;

export const UserInfoContainer = styled.section`
	display: flex;
	flex-direction: column;

	ul {
		margin-bottom: 20px;
		display: flex;
		list-style: none;

		@media (max-width: 735px) {
			display: none;
		}
	}

	ul > li {
		margin: 0 40px 0 0;
		font-size: 16px;
	}

	li > span {
	}

	@media (min-width: 736px) {
		flex: 2 1 30px;
		margin-right: 30px;
	}

	@media (max-width: 735px) {
		position: relative;
		flex: 1 1 0;
		justify-content: center;
	}
`;

export const UsernameBlock = styled.div`
	display: flex;
	justify-content: flex-start;

	h2 {
		font-weight: 300;
		font-size: 28px;
		line-height: 32px;
		margin: 0 20px 20px 0;
	}

	@media (max-width: 735px) {
		flex-direction: column;
		align-items: flex-start;
		margin-bottom: 20px;
	}
`;

export const IconContainer = styled.div`
	cursor: pointer;
	margin: 0 0 0 10px;
	transition: transform 1s ease-in-out 0s;

	& > svg {
		transition: transform 0.5s ease-in-out 0s;
	}

	&:hover > svg {
		transform: rotate(95deg);
	}

	@media (max-width: 735px) {
		position: absolute;
		top: 2px;
		left: 125px;
	}
`;

export const BtnWrapper = styled.div`
	@media (max-width: 735px) {
		max-width: 300px;
		width: 100%;
	}
`;

export const BtnFollow = styled.a`
	background: #0095f6;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	display: block;
	font-weight: 600;
	letter-spacing: 1px;
	padding: 7px 30px;
	text-align: center;
	transition: all 0.3s ease-in-out 0s;
	color: white;
`;

export const BtnUnfollow = styled.a`
	background: ${color2};
	border: 1px solid ${color5};
	border-radius: 4px;
	cursor: pointer;
	display: block;
	font-weight: 600;
	letter-spacing: 1px;
	padding: 7px 30px;
	text-align: center;
	transition: all 0.3s ease-in-out 0s;

	&:hover {
		background: transparent;
	}
`;

export const FullNameBlock = styled.div`
	display: inline;
	font-weight: 600;

	h1 {
		display: inline;
		font-weight: 600;
	}

	@media (max-width: 735px) {
		display: none;
	}
`;

export const TitleMobile = styled.div`
	display: none;

	@media (max-width: 735px) {
		display: flex;
		padding: 0 16px 21px;
		line-height: 20px;
		font-size: 14px;
	}

	h1 {
		display: inline;
		font-weight: 600;
	}
`;

export const UlMobile = styled.ul`
	display: none;

	li {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		text-align: center;
		width: 33.3%;
	}

	@media (max-width: 735px) {
		display: flex;
		justify-content: space-around;
		padding: 12px 0;
		list-style: none;
		border-top: 1px solid ${color5};
	}
`;

export const Navigation = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	border-top: 1px solid ${color5};
	font-size: 12px;
	font-weight: 600;
	text-align: center;
	text-transform: uppercase;
	letter-spacing: 1px;

	a {
		display: flex;
		cursor: pointer;
		color: ${color3};
		text-decoration: none;
		border-top: 1px solid transparent;
	}

	a.active {
		border-top: 1px solid #000000;
	}

	a + a {
		margin-left: 60px;
	}

	a > span {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 20px 0;
	}

	span > svg {
		color: #000000;
	}

	span > span {
		margin: 5px 0 0;
	}
`;
