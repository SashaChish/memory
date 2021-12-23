import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import useMediaQuery from '@mui/material/useMediaQuery';
import './PostModal.css';

import { nanoid } from 'nanoid';

import { Link } from 'react-router-dom';

import { transformError } from '../../helpers';

import {
	DialogInfo,
	PostImg,
	PostUsername,
	DialogComment,
	CommentDate,
	CommentForm,
	PostIcon,
	PostSaved,
} from './PostModal.style';

import { $api } from '../../http';

const BootstrapDialogTitle = (props) => {
	const { children, onClose, ...other } = props;

	return (
		<DialogTitle sx={{ m: 0, p: 2 }} {...other}>
			{children}
			{onClose ? (
				<IconButton
					aria-label='close'
					onClick={onClose}
					sx={{
						position: 'absolute',
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
					}}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</DialogTitle>
	);
};

export const PostModal = ({ handleUpdateHover, modalControl, postId }) => {
	const [postInfo, setPostInfo] = useState({});
	const [commentText, setCommentText] = useState('');
	const [liked, setLiked] = useState(false);
	const [saved, setSaved] = useState(false);
	const [mediaComments, setMediaComments] = useState(false);
	const matches = useMediaQuery('(max-width:426px)');

	useEffect(() => {
		setPostInfo({});
		setCommentText('');

		const fetchData = async () => {
			const result = await $api.get(`/posts/${postId}`);
			console.log(result.data);
			setPostInfo(result.data);

			try {
				await $api.put(`/posts/like/${postId}`);
				await $api.put(`/posts/unlike/${postId}`);
				setLiked(false);
			} catch (err) {
				err = transformError(err);
				if (err.status === 400) {
					setLiked(true);
				}
			}

			try {
				await $api.put(`/posts/save/${postId}`);
				await $api.put(`/posts/unsave/${postId}`);
				setSaved(false);
			} catch (err) {
				err = transformError(err);
				if (err.status === 400) {
					setSaved(true);
				}
			}
		};

		postId !== '' && fetchData();
	}, [postId]);

	useEffect(() => {
		matches === false && setMediaComments(false);
	}, [matches]);

	const handleSendComment = async (e) => {
		e.preventDefault();

		try {
			const result = await $api.post(`/posts/comment/${postId}`, {
				text: commentText,
			});

			setPostInfo({ ...postInfo, comments: result.data });
			handleUpdateHover();

			setCommentText('');
		} catch (err) {
			console.log(err);
		}
	};

	const handleLike = async () => {
		try {
			await $api.put(`/posts/${liked ? 'unlike' : 'like'}/${postId}`);
			setLiked(!liked);
			handleUpdateHover();

			const result = await $api.get(`/posts/${postId}`);
			setPostInfo({ ...postInfo, likes: result.data.likes });
		} catch (err) {
			console.log(err);
		}
	};

	const handleSave = async () => {
		try {
			await $api.put(`/posts/${saved ? 'unsave' : 'save'}/${postId}`);
			handleUpdateHover();
			setSaved(!saved);
		} catch (err) {
			console.log(err);
		}
	};

	const handleShowMediaComments = () => {
		matches === true && setMediaComments(true);
	};

	return (
		<div className='postModal'>
			<Dialog
				onClose={() => modalControl.handleCloseModal()}
				aria-labelledby='post-popup'
				open={modalControl.open}
				className='postModalDialog'
			>
				<PostImg
					src={postInfo?.file?.fileLink}
					alt={`${postInfo?.username}'s picture`}
				/>

				<DialogInfo>
					<BootstrapDialogTitle
						id='customized-dialog-title'
						onClose={() => modalControl.handleCloseModal()}
						sx={{ display: 'flex', alignItems: 'center' }}
					>
						<Link to={`/${postInfo?.username}`}>
							<Avatar
								sx={{ width: 40, height: 40, marginRight: '20px' }}
								alt={postInfo?.username}
								src={postInfo?.avatar}
							/>
						</Link>
						<Link
							to={`/${postInfo?.username}`}
							style={{ textDecoration: 'none', display: 'flex' }}
						>
							<PostUsername>{postInfo?.username}</PostUsername>
						</Link>
					</BootstrapDialogTitle>
					{matches && mediaComments && (
						<IconButton
							aria-label='close'
							onClick={() => setMediaComments(false)}
							sx={{
								position: 'absolute',
								zIndex: 1,
								right: 8,
								top: 8,
								color: (theme) => theme.palette.grey[500],
							}}
						>
							<CloseIcon />
						</IconButton>
					)}
					<DialogContent
						dividers
						className='postComments'
						style={{
							display: `${
								matches ? (mediaComments ? 'block' : 'none') : 'block'
							}`,
						}}
					>
						<DialogComment>
							<Link
								to={`/${postInfo?.username}`}
								style={{ textDecoration: 'none' }}
							>
								<Avatar
									sx={{ width: 40, height: 40, marginRight: '20px' }}
									alt={postInfo?.username}
									src={postInfo?.avatar}
								/>
							</Link>
							<Typography
								gutterBottom
								sx={{ position: 'relative', width: '100%' }}
							>
								<Link
									to={`/${postInfo?.username}`}
									style={{ textDecoration: 'none' }}
								>
									<PostUsername>{postInfo?.username}</PostUsername>
								</Link>
								{'  '}
								{postInfo?.description}
								<CommentDate>
									<Moment fromNow>{new Date(postInfo?.date)}</Moment>
								</CommentDate>
							</Typography>
						</DialogComment>
						{postInfo?.comments?.map((comment) => (
							<DialogComment key={nanoid()}>
								<Link
									to={`/${comment.username}`}
									style={{ textDecoration: 'none' }}
								>
									<Avatar
										sx={{ width: 40, height: 40, marginRight: '20px' }}
										alt={comment.username}
										src={comment.avatar}
									/>
								</Link>
								<Typography
									gutterBottom
									sx={{ position: 'relative', width: '100%' }}
								>
									<Link
										to={`/${comment.username}`}
										style={{ textDecoration: 'none' }}
									>
										<PostUsername>{comment.username}</PostUsername>
									</Link>
									{'  '}
									{comment.text}
									<CommentDate>
										<Moment fromNow>{new Date(comment.date)}</Moment>
									</CommentDate>
								</Typography>
							</DialogComment>
						))}
					</DialogContent>
					<DialogContent className='postActions'>
						<PostIcon onClick={() => handleLike()}>
							{liked ? (
								<FavoriteIcon
									style={{ color: '#ED4956', marginRight: '5px' }}
								/>
							) : (
								<FavoriteBorderIcon style={{ marginRight: '5px' }} />
							)}
							{postInfo?.likes?.length > 0 && postInfo?.likes?.length}
						</PostIcon>
						<PostIcon onClick={() => handleShowMediaComments()}>
							<ChatBubbleOutlineIcon />
						</PostIcon>
						<PostSaved onClick={() => handleSave()}>
							{saved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
						</PostSaved>
					</DialogContent>
					<DialogActions
						sx={{
							height: 'auto',
							borderTop: '1px solid #E0E0E0',
							display: `${
								matches
									? mediaComments
										? 'block !important'
										: 'none !important'
									: 'block'
							}`,
						}}
						className='postForm'
					>
						<CommentForm onSubmit={(e) => handleSendComment(e)}>
							<TextField
								variant='standard'
								margin='normal'
								fullWidth
								name='comment'
								autoFocus
								placeholder='Write a comment...'
								value={commentText}
								onChange={(e) => setCommentText(e.target.value)}
								InputProps={{
									disableUnderline: true,
								}}
							/>
							<Button
								variant='text'
								type='submit'
								disabled={commentText.trim() === ''}
								style={{ backgroundColor: 'transparent' }}
							>
								Publish
							</Button>
						</CommentForm>
					</DialogActions>
				</DialogInfo>
			</Dialog>
		</div>
	);
};

PostModal.propTypes = {
	modalControl: PropTypes.shape({
		open: PropTypes.bool.isRequired,
		handleCloseModal: PropTypes.func.isRequired,
	}).isRequired,
	postId: PropTypes.string,
	handleUpdateHover: PropTypes.func,
};
