import React, { useState, useEffect } from 'react';
import { Wrapper, Image, Photos, Div, Info, Ul, Li } from './Explore.style';
import { $api } from '../../http';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentIcon from '@mui/icons-material/ModeComment';

import { useModal } from '../../hooks/useModal';
import { PostModal } from '../PostModal';

export const Explore = () => {
	const [posts, setPosts] = useState([]);

	useEffect(async () => {
		const posts = await $api.get(`/posts`);
		posts.status === 200 && setPosts(posts.data);
	});

	const postControl = useModal();
	const [postId, setPostId] = useState('');

	const handleOpenPost = (post_id) => {
		setPostId(post_id);
		postControl.handleOpenModal();
	};

	return (
		<>
			<Wrapper>
				<Photos>
					{posts.map((post) => (
						<Div key={post._id} onClick={() => handleOpenPost(post._id)}>
							<Image src={post.avatar}></Image>
							<Info>
								<Ul>
									<Li>
										<FavoriteIcon />
										{post.likes.length}
									</Li>
									<Li>
										<ModeCommentIcon />
										{post.comments.length}
									</Li>
								</Ul>
							</Info>
						</Div>
					))}
				</Photos>
			</Wrapper>
			<PostModal modalControl={postControl} postId={postId} />
		</>
	);
};
