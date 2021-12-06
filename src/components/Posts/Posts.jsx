import { PostsContainer, PostsWrapper } from './Posts.style';

export const Posts = ({ text, src }) => {
	return (
		<PostsWrapper>
			<PostsContainer>
				<img src={src} alt='default' />
				<img src={src} alt='default' />
				<img src={src} alt='default' />
				<img src={src} alt='default' />
				<img src={src} alt='default' />
				<img src={src} alt='default' />
			</PostsContainer>
		</PostsWrapper>
	);
};
