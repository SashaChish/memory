import {
	PostsContainer,
	PostsWrapper,
	PostItem,
	PostLinks,
} from './Posts.style';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

export const Posts = ({ type, imgs }) => {
	console.log(imgs);
	return (
		<PostsWrapper>
			<PostsContainer>
				{imgs.map((img) => (
					<PostItem>
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
