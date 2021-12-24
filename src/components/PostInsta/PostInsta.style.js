import styled from 'styled-components';

export const PostInstaContainer = styled.div`
	background-color: #fafafa;
	padding: 20px 0;
`;

export const HomePage = styled.div`
	max-width: 800px;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
`;
export const PostInstagram = styled.div`
	border: 1px solid #f1f1f1;
	border-radius: 2px;
	margin-bottom: 30px;
	background: #fff;
	display: flex;
	flex-direction: column;
`;
export const Card = styled.div`
	padding: 10px;
	display: flex;
	align-items: center;
`;
export const LeftIcon = styled.div`
	float: left;
	cursor: pointer;
`;
export const RightIcon = styled.div`
	float: right;
	cursor: pointer;
`;
export const Post = styled.div`
	width: 100;
	background-color: white;
	border-radius: 10px;
`;
export const Icons = styled.div`
	padding: 10px;
	height: 40px;
	svg {
		margin: 5px;
	}
`;
export const AboutPost = styled.div`
	padding: 5px 20px;
`;
export const SpanTag = styled.span`
	top: 0px;
	left: 200px;
`;
export const PTag = styled.p`
	font-size: 16px;
	margin-bottom: 10px;
`;
export const ImgTag = styled.img`
	height: 50px;
	width: 50px;
	border-radius: 50%;
	margin-right: 10px;
`;
export const ImgPost = styled.img`
	display: block;
	width: 100%;
`;
export const VideoPost = styled.video`
	width: 100%;
	height: 100%;
	max-height: 600px;
	background: #000;
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

export const Posts = styled.div`
	max-width: 600px;

	@media (max-width: 768px) {
		margin: 0 auto;
	}
`;
export const ProfileInfo = styled.div`
	margin-left: 20px;

	@media (max-width: 768px) {
		display: none;
	}
`;
export const Profile = styled.div`
	display: flex;
	align-items: center;
`;
export const ProfileAvatar = styled.div``;
export const ProfileText = styled.div``;
export const Name = styled.div``;
export const ProfileLink = styled.a``;
export const RedirectText = styled.a`
	cursor: pointer;
	color: #0095f6;
	margin-left: 50px;
`;
