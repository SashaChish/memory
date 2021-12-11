import {
	PostsContainer,
	PostsWrapper,
	PostItem,
	PostLinks,
} from './Posts.style';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

import { nanoid } from 'nanoid';

export const Posts = ({ type, imgs }) => {
	return (
		<PostsWrapper>
			<PostsContainer>
				{imgs.map((img) => (
					<PostItem key={nanoid()}>
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
	);
};
