import React, { useState, useEffect } from 'react';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import { $api } from '../../http';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { useModal } from '../../hooks/useModal';
import { PostModal } from '../PostModal';

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
	SpanTag,
	PTag,
	PTime,
	PLiked,
	ImgTag,
	Posts,
	ProfileInfo,
	Profile,
	ProfileAvatar,
	ProfileText,
	Name,
	RedirectText,
	PostInstaContainer,
} from './PostInsta.style';

export const PostInsta = () => {
	const userData = useSelector((state) => state);
	const [posts, setPosts] = useState([]);
	const postControl = useModal();
	const [postId, setPostId] = useState('');

	const navigate = useNavigate();

	useEffect(async () => {
		const result = await $api.get(`/posts/you-following/${userData?.username}`);
		console.log(result.data);
		setPosts(result.data);
	}, []);

	const handleRedirect = async () => {
		navigate(userData.username);
	};

	const handleLike = async (postId, likeState) => {
		try {
			await $api.put(`/posts/${likeState}/${postId}`);
			const result = await $api.get(
				`/posts/you-following/${userData?.username}`
			);
			setPosts(result.data);
		} catch (err) {
			console.log(err);
		}
	};

	const handleSave = async (postId, saveState) => {
		try {
			await $api.put(`/posts/${saveState}/${postId}`);
			const result = await $api.get(
				`/posts/you-following/${userData?.username}`
			);
			console.log(userData.username);
			console.log(result.data);
			setPosts(result.data);
		} catch (err) {
			console.log(err);
		}
	};

	const handleOpenPost = (id) => {
		setPostId(id);
		postControl.handleOpenModal();
	};

	const handleUpdateHover = async () => {
		try {
			const result = await $api.get(
				`/posts/you-following/${userData?.username}`
			);
			setPosts(result.data);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<PostInstaContainer>
			<HomePage>
				<Posts>
					{posts.map((post) => (
						<PostInstagram key={post?._id}>
							<Card>
								<Link to={`/${post?.username}`}>
									<ImgTag src={post?.avatar} />
								</Link>
								<Link
									to={`/${post?.username}`}
									style={{ textDecoration: 'none', color: '#000' }}
								>
									<SpanTag>{post?.username}</SpanTag>
								</Link>
							</Card>
							<Post>
								<ImgPost src={post?.file?.fileLink} />
							</Post>
							<Icons>
								<LeftIcon>
									{post?.likes.some((like) => like.user === userData._id) ? (
										<FavoriteRoundedIcon
											onClick={() => handleLike(post?._id, 'unlike')}
											style={{ color: '#ED4956' }}
										/>
									) : (
										<FavoriteBorderRoundedIcon
											onClick={() => handleLike(post?._id, 'like')}
										/>
									)}
								</LeftIcon>
								<LeftIcon>
									<ChatBubbleOutlineRoundedIcon
										onClick={() => handleOpenPost(post?._id)}
									/>
								</LeftIcon>
								<RightIcon>
									{post?.saved.some((save) => save.user === userData._id) ? (
										<BookmarkIcon
											onClick={() => handleSave(post._id, 'unsave')}
										/>
									) : (
										<BookmarkBorderIcon
											onClick={() => handleSave(post._id, 'save')}
										/>
									)}
								</RightIcon>
							</Icons>
							<AboutPost>
								<PLiked>Liked {post?.likes.length}</PLiked>
								<PTag className='name_caption'>
									<SpanTag id='caption'>{post?.description}</SpanTag>
									<PTime>
										<Moment fromNow>{new Date(post?.date)}</Moment>
									</PTime>
								</PTag>
							</AboutPost>
						</PostInstagram>
					))}
				</Posts>
				<ProfileInfo>
					<Profile>
						<Link to={`/${userData?.username}`}>
							<ProfileAvatar>
								<ImgTag src={userData?.avatar} />
							</ProfileAvatar>
						</Link>

						<ProfileText>
							<Link
								to={`/${userData?.username}`}
								style={{
									textDecoration: 'none',
									color: '#000',
								}}
							>
								<Name>{userData?.username}</Name>
							</Link>
							<Name style={{ color: '#8e8e8e' }}>{userData?.fullName}</Name>
						</ProfileText>

						<RedirectText onClick={() => handleRedirect()}>
							Profile
						</RedirectText>
					</Profile>
				</ProfileInfo>
			</HomePage>

			<PostModal
				handleUpdateHover={handleUpdateHover}
				modalControl={postControl}
				postId={postId}
			/>
		</PostInstaContainer>
	);
};
