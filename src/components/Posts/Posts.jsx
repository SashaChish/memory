import React, { useState } from 'react';
import {
	PostsContainer,
	PostsWrapper,
	PostItem,
	PostLinks,
} from './Posts.style';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

import { useModal } from '../../hooks/useModal';

import { PostModal } from '../PostModal';

export const Posts = ({ type, imgs }) => {
	const postControl = useModal();
	const [postId, setPostId] = useState('');

	const handleOpenPost = (post_id) => {
		setPostId(post_id);
		postControl.handleOpenModal();
	};

	return (
		<>
			<PostsWrapper>
				<PostsContainer>
					{imgs.map((img) => (
						<PostItem key={img._id} onClick={() => handleOpenPost(img._id)}>
							<img src={img?.picture} alt={type} />
							<PostLinks>
								<span>
									<FavoriteIcon /> {img.likes}
								</span>
								<span>
									<ChatBubbleIcon /> {img.comments}
								</span>
							</PostLinks>
						</PostItem>
					))}
				</PostsContainer>
			</PostsWrapper>
			<PostModal modalControl={postControl} postId={postId} />
		</>
	);
};
