import React, { useState, useEffect } from 'react';
import {
	Wrapper,
	Image,
	Photos,
	Div,
	Info,
	Ul,
	Li,
	Video,
} from './Explore.style';
import { $api } from '../../http';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';

import { useModal } from '../../hooks/useModal';
import { PostModal } from '../PostModal';

export const Explore = () => {
	const [posts, setPosts] = useState([]);

	useEffect(async () => {
		const posts = await $api.get(`/posts`);
		posts.status === 200 && setPosts(posts.data);
	}, []);

	const postControl = useModal();
	const [postId, setPostId] = useState('');

	const handleOpenPost = (post_id) => {
		setPostId(post_id);
		postControl.handleOpenModal();
	};

	const handleUpdateHover = async () => {
		try {
			const posts = await $api.get(`/posts`);
			setPosts(posts.data);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<Wrapper>
				<Photos>
					{posts.map((post) => (
						<Div key={post._id} onClick={() => handleOpenPost(post._id)}>
							{post?.file?.fileType === 'mp4' ? (
								<>
									<Video src={post?.file?.fileLink}></Video>
									<PlayArrowRoundedIcon
										style={{
											position: 'absolute',
											top: '5px',
											right: '5px',
											color: 'white',
											fontSize: '40px',
											zIndex: '0',
										}}
									/>
								</>
							) : (
								<Image src={post?.file?.fileLink}></Image>
							)}
							<Info>
								<Ul>
									<Li style={{ marginRight: '30px' }}>
										<FavoriteIcon style={{ marginRight: '10px' }} />
										{post.likes.length}
									</Li>
									<Li>
										<ModeCommentIcon style={{ marginRight: '10px' }} />
										{post.comments.length}
									</Li>
								</Ul>
							</Info>
						</Div>
					))}
				</Photos>
			</Wrapper>
			<PostModal
				handleUpdateHover={handleUpdateHover}
				modalControl={postControl}
				postId={postId}
			/>
		</>
	);
};
