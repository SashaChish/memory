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

import { Link } from 'react-router-dom';

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

export const PostModal = ({ modalControl, postId }) => {
	const [postInfo, setPostInfo] = useState({});
	const [commentText, setCommentText] = useState('');

	useEffect(() => {
		setPostInfo({});
		setCommentText('');

		const fetchData = async () => {
			const result = await $api.get(`/posts/${postId}`);
			setPostInfo(result.data);
			console.log(result);
		};

		postId !== '' && fetchData();
	}, [postId]);

	const handleSendComment = async (e) => {
		e.preventDefault();

		try {
			const result = await $api.post(`/posts/comment/${postId}`, {
				text: commentText,
			});

			setPostInfo({ ...postInfo, comments: result.data });

			setCommentText('');
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Dialog
			onClose={() => modalControl.handleCloseModal()}
			aria-labelledby='post-popup'
			open={modalControl.open}
			PaperProps={{
				style: {
					borderRadius: '0 5px 5px 0',
					display: 'flex',
					flexDirection: 'row',
					width: '90vw',
					maxWidth: '100vw',
					minHeight: '90vh',
				},
			}}
		>
			<PostImg src={postInfo?.avatar} alt={`${postInfo?.username}'s picture`} />

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
						style={{ textDecoration: 'none' }}
					>
						<PostUsername>{postInfo?.username}</PostUsername>
					</Link>
				</BootstrapDialogTitle>
				<DialogContent
					dividers
					sx={{ height: 'calc(100% - 65px - 70px - 75px)' }}
				>
					{postInfo?.comments?.map((comment) => (
						<DialogComment>
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
				<DialogContent>
					<PostIcon>
						<FavoriteBorderIcon />
					</PostIcon>
					<PostIcon>
						<ChatBubbleOutlineIcon />
					</PostIcon>
					<PostSaved>
						<BookmarkBorderIcon />
					</PostSaved>
				</DialogContent>
				<DialogActions sx={{ height: '60px', borderTop: '1px solid #E0E0E0' }}>
					<CommentForm onSubmit={(e) => handleSendComment(e)}>
						<TextField
							variant='standard'
							margin='normal'
							fullWidth
							multiline
							name='comment'
							autoFocus
							placeholder='Write a comment...'
							style={{ marginLeft: '20px' }}
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
	);
};

PostModal.propTypes = {
	modalControl: PropTypes.shape({
		open: PropTypes.bool.isRequired,
		handleCloseModal: PropTypes.func.isRequired,
	}).isRequired,
	postId: PropTypes.string,
};
