import styled from 'styled-components';

export const CreateInfo = styled.div`
	width: 40%;
	max-height: 100%;
	overflow: hidden;
	border-left: 1px solid #968d8d;

	.postComments {
		height: calc(100% - 65px - 77px - 75px);
	}

	#outbox-close {
		font-size: 30px;
	}

	@media (max-width: 1024px) {
		.MuiAvatar-root {
			width: 25px;
			height: 25px;
		}

		.MuiTypography-root {
			font-size: 14px;
		}

		.postComments {
			height: calc(100% - 66px - 57px - 60px);
		}
	}

	@media (max-width: 426px) {
		width: 100%;
		overflow: unset;

		.postComments {
			display: none;
			position: absolute;
			top: 0;
			background-color: #fff;
			width: inherit;
			height: -webkit-fill-available;
		}

		.postForm {
			position: unset;
			bottom: 0;
			background-color: #fff;
			width: inherit;
			height: auto;
			margin-top: 10px;
		}

		.postActions {
			border-top: 1px solid #e0e0e0;
		}
	}
`;

export const CreateFile = styled.img`
	width: 100%;
	object-fit: contain;
	background: #000;
	height: 100%;
`;

export const CreateUsername = styled.span`
	font-weight: 600;
	font-size: 17px;
	text-decoration: none;
	color: #000;

	:hover {
		text-decoration: underline;
	}

	@media (max-width: 1024px) {
		font-size: 14px;
	}
`;

export const CreateForm = styled.form`
	display: flex;
	width: 100%;
	align-items: center;
	padding: 0 12px;
	flex-direction: column;

	> div {
		margin-top: 10px;
	}

	@media (max-width: 1024px) {
		height: 45px;

		input {
			font-size: 13px;
		}
		button {
			font-size: 11px;
		}
	}

	@media (max-width: 426px) {
		height: auto;
		padding: 0 12px;
	}
`;

export const PickFile = styled.div`
	display: grid;
	place-items: center;
	width: 60%;

	@media (max-width: 426px) {
		width: 100%;
		height: 75vh;
	}
`;

export const PickBtn = styled.button`
	padding: 8px 15px;
	background-color: #0095f6;
	color: #fff;
	font-weight: 600;
	border: none;
	font-size: 18px;
	border-radius: 5px;
	cursor: pointer;

	&:active {
		background-color: #33acfc;
	}

	@media (max-width: 426px) {
		font-size: 15px;
	}
`;

export const CreateImgContainer = styled.div`
	position: relative;
	width: 60%;
	height: 75vh;

	@media (max-width: 426px) {
		width: 100%;
		min-height: 82vh;
	}
`;

export const CreateVideo = styled.video`
	width: 100%;
	height: inherit;
`;
