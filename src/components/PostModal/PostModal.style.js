import styled from 'styled-components';

export const DialogInfo = styled.div`
	width: 40%;
	max-height: 100%;
	overflow: hidden;
`;

export const PostImg = styled.img`
	width: 60%;
	object-fit: contain;
	background: #000;
`;

export const PostUsername = styled.span`
	font-weight: 600;
	font-size: 17px;
	text-decoration: none;
	color: #000;

	:hover {
		text-decoration: underline;
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
`;

export const CommentForm = styled.form`
	display: flex;
	width: 100%;
	height: 60px;
	align-items: center;
`;

export const PostIcon = styled.span`
	cursor: pointer;
	margin-right: 20px;

	svg {
		font-size: 30px;
	}
`;

export const PostSaved = styled(PostIcon)`
	float: right;
	margin-right: 0;
`;
