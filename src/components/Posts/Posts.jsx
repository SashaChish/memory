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

export const Posts = ({ handleUpdateHover, type, files }) => {
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
					{files.map((file) => (
						<PostItem key={file._id} onClick={() => handleOpenPost(file._id)}>
							{/* {file?.file?.fileType === 'png' ? ( */}
							<img src={file?.file?.fileLink} alt={type} />
							{/* ) : (
								<video src={file?.file?.fileLink}></video>
							)} */}
							<PostLinks>
								<span>
									<FavoriteIcon /> {file.likes}
								</span>
								<span>
									<ChatBubbleIcon /> {file.comments}
								</span>
							</PostLinks>
						</PostItem>
					))}
				</PostsContainer>
			</PostsWrapper>
			<PostModal
				handleUpdateHover={handleUpdateHover}
				modalControl={postControl}
				postId={postId}
			/>
		</>
	);
};
