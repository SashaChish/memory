import styled from 'styled-components';

export const HomePage = styled.div`
	max-width: 600px;
	margin: 100px auto;
`;
export const PostInstagram = styled.div`
	border: 1px solid #f1f1f1;
	border-radius: 2px;
	margin-bottom: 30px;
`;
export const Card = styled.div`
	padding: 10px;
	display: flex;
	align-items: center;
`;
export const LeftIcon = styled.div``;
export const RightIcon = styled.div``;
export const Post = styled.div`
	width: 100;
	background-color: white;
	border-radius: 10px;
`;
export const Icons = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 10px;
	svg {
		margin: 5px;
	}
`;
export const AboutPost = styled.div`
	padding: 5px 20px;
`;
export const Span = styled.span`
	top: 0px;
	left: 200px;
`;
export const P = styled.p`
	font-size: 16px;
	margin-bottom: 10px;
`;
export const Img = styled.img`
	height: 50px;
	width: 50px;
	border-radius: 50%;
	margin-right: 10px;
`;
export const ImgPost = styled.img`
	display: block;
	width: 100%;
`;
export const PLiked = styled.p`
	font-weight: 600;
`;
export const CommentBlock = styled.div`
	display: flex;
	align-items: center;
	border-top: 1px solid #f1f1f1;
	padding: 10px;
	input {
		margin-left: 20px;
		border: none;
		font-size: 18px;
	}
	input:focus {
		border: none;
	}
`;

export const PTime = styled.div`
	font-size: 12px;
	color: #a2a2a2;
	margin-top: 10px;
`;
