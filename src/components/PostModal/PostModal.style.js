import styled from 'styled-components';

export const DialogInfo = styled.div`
	width: 40%;
	max-height: 100%;
	overflow: hidden;

	.css-1t4vnk2-MuiDialogContent-root {
		height: calc(100% - 65px - 70px - 75px);
	}

	@media (max-width: 1024px) {
		.MuiAvatar-root {
			width: 25px;
			height: 25px;
		}

		.MuiTypography-root {
			font-size: 14px;
		}

		.css-1t4vnk2-MuiDialogContent-root {
			height: calc(100% - 66px - 57px - 60px);
		}
	}

	@media (max-width: 426px) {
		width: 100%;

		.css-1t4vnk2-MuiDialogContent-root {
			display: none;
			position: absolute;
			top: 0;
			background-color: #fff;
			width: inherit;
			height: -webkit-fill-available;
		}

		.css-1pf00k0-MuiDialogActions-root {
			display: none;
			position: absolute;
			bottom: 0;
			background-color: #fff;
			width: inherit;
			height: auto;
			margin-top: 10px;
		}

		.css-ypiqx9-MuiDialogContent-root {
			border-top: 1px solid #e0e0e0;
		}
	}
`;

export const PostImg = styled.img`
	width: 60%;
	object-fit: contain;
	background: #000;

	@media (max-width: 426px) {
		width: 100%;
		height: 85vh;
	}
`;

export const PostUsername = styled.span`
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

export const DialogComment = styled.div`
	display: flex;
	margin-bottom: 45px;
`;

export const CommentDate = styled.div`
	position: absolute;
	bottom: -25px;
	color: #8e8e8e;

	@media (max-width: 1024px) {
		font-size: 12px;
		bottom: -22px;
	}
`;

export const CommentForm = styled.form`
	display: flex;
	width: 100%;
	height: 60px;
	align-items: center;
	padding: 12px;

	@media (max-width: 1024px) {
		input {
			font-size: 13px;
		}
		button {
			font-size: 11px;
		}
	}

	@media (max-width: 426px) {
		height: 35px;
		padding: 0 12px;
	}
`;

export const PostIcon = styled.span`
	cursor: pointer;
	margin-right: 20px;

	svg {
		font-size: 30px;

		@media (max-width: 1024px) {
			font-size: 22px;
		}
	}
`;

export const PostSaved = styled(PostIcon)`
	float: right;
	margin-right: 0;
`;
