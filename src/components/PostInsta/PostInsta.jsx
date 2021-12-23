import React, { useState, useEffect } from 'react';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import SentimentSatisfiedRoundedIcon from '@mui/icons-material/SentimentSatisfiedRounded';
import { $api } from '../../http';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import {
	HomePage,
	PostInstagram,
	Card,
	Post,
	LeftIcon,
	RightIcon,
	ImgPost,
	Icons,
	AboutPost,
	Span,
	CommentBlock,
	P,
	PTime,
	PLiked,
	Img,
	Posts,
	ProfileInfo,
	Profile,
	ProfileAvatar,
	ProfileText,
	Name,
	ProfileLink,
	RedirectText,
	PostInstaContainer,
} from './PostInsta.style';

export const PostInsta = () => {
	const userData = useSelector((state) => state);
	const [usersProfile, setUsersProfile] = useState(false);
	const [posts, setPosts] = useState([]);

	const { username } = useParams();

	const navigate = useNavigate();

	useEffect(async () => {
		setUsersProfile(username === userData.username);
		const result = await $api.get(`/posts/you-following/${userData.username}`);
		setPosts(result.data);
	}, []);
	console.log(posts);

	const handleRedirect = async () => {
		navigate(userData.username);
	};

	return (
		<PostInstaContainer>
			<HomePage>
				<Posts>
					{posts.map((post) => (
						<PostInstagram>
							<Card>
								<Img src='https://picsum.photos/200/300' />
								<Span>{post.username}</Span>
							</Card>
							<Post>
								<ImgPost src={post?.file?.fileLink} />
							</Post>
							<Icons>
								<LeftIcon>
									<FavoriteBorderRoundedIcon />
									<ChatBubbleOutlineRoundedIcon />
									<SendRoundedIcon />
								</LeftIcon>
								<RightIcon>
									<BookmarkBorderRoundedIcon />
								</RightIcon>
							</Icons>
							<AboutPost>
								<PLiked>Liked {post.likes.length}</PLiked>
								<P className='name_caption'>
									<Span id='caption'>{post.description}</Span>
									<PTime>30 minutes ago</PTime>
								</P>
							</AboutPost>
							<CommentBlock>
								<SentimentSatisfiedRoundedIcon />
								<input type='text' placeholder='add a comment' />
							</CommentBlock>
						</PostInstagram>
					))}
				</Posts>
				<ProfileInfo>
					<Profile>
						<ProfileAvatar>
							<Img src='https://picsum.photos/200/300' />
						</ProfileAvatar>
						<ProfileText onClick={() => handleRedirect()}>
							<Name>{userData.username}</Name>
						</ProfileText>
						<RedirectText onClick={() => handleRedirect()}>
							Profile
						</RedirectText>
					</Profile>
				</ProfileInfo>
			</HomePage>
		</PostInstaContainer>
	);
};
