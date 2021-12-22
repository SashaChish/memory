import React, { useState, useEffect } from 'react';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import SentimentSatisfiedRoundedIcon from '@mui/icons-material/SentimentSatisfiedRounded';

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
	Span,
	CommentBlock,
	P,
	PTime,
	PLiked,
	Img,
	Posts,
	ProfileInfo,
	Profile,
	ProfileAvatar,
	ProfileText,
	Name,
	ProfileLink,
} from './PostInsta.style';

export const PostInsta = () => {
	return (
		<HomePage>
			<Posts>
				<PostInstagram>
					<Card>
						<Img src='https://picsum.photos/200/300' />
						<Span>Oleksandra Somewhere</Span>
					</Card>
					<Post>
						<ImgPost src='https://picsum.photos/400/400' />
					</Post>
					<Icons>
						<LeftIcon>
							<FavoriteBorderRoundedIcon />
							<ChatBubbleOutlineRoundedIcon />
							<SendRoundedIcon />
						</LeftIcon>
						<RightIcon>
							<BookmarkBorderRoundedIcon />
						</RightIcon>
					</Icons>
					<AboutPost>
						<PLiked>Liked by Ilona and 104,424 others</PLiked>
						<P className='name_caption'>
							Tejash Vaishnav
							<Span id='caption'>
								The real test is not whether you avoid this failure, because you
								won't.....
							</Span>
							<PTime>30 minutes ago</PTime>
						</P>
					</AboutPost>
					<CommentBlock>
						<SentimentSatisfiedRoundedIcon />
						<input type='text' placeholder='add a comment' />
					</CommentBlock>
				</PostInstagram>
				<PostInstagram>
					<Card>
						<Img src='https://picsum.photos/200/300' />
						<Span>Oleksandra Somewhere</Span>
					</Card>
					<Post>
						<ImgPost src='https://picsum.photos/400/400' />
					</Post>
					<Icons>
						<LeftIcon>
							<FavoriteBorderRoundedIcon />
							<ChatBubbleOutlineRoundedIcon />
							<SendRoundedIcon />
						</LeftIcon>
						<RightIcon>
							<BookmarkBorderRoundedIcon />
						</RightIcon>
					</Icons>
					<AboutPost>
						<PLiked>Liked by Igor and 104,424 others</PLiked>
						<P className='name_caption'>
							Tejash Vaishnav
							<Span id='caption'>
								The real test is not whether you avoid this failure, because you
								won't.....
							</Span>
							<PTime>45 minutes ago</PTime>
						</P>
					</AboutPost>
					<CommentBlock>
						<SentimentSatisfiedRoundedIcon />
						<input type='text' placeholder='add a comment' />
					</CommentBlock>
				</PostInstagram>
				<PostInstagram>
					<Card>
						<Img src='https://picsum.photos/200/300' />
						<Span>Oleksandra Somewhere</Span>
					</Card>
					<Post>
						<ImgPost src='https://picsum.photos/400/400' />
					</Post>
					<Icons>
						<LeftIcon>
							<FavoriteBorderRoundedIcon />
							<ChatBubbleOutlineRoundedIcon />
							<SendRoundedIcon />
						</LeftIcon>
						<RightIcon>
							<BookmarkBorderRoundedIcon />
						</RightIcon>
					</Icons>
					<AboutPost>
						<PLiked>Liked by Alya and 10 others</PLiked>
						<P className='name_caption'>
							Tejash Vaishnav
							<Span id='caption'>
								The real test is not whether you avoid this failure, because you
								won't.....
							</Span>
							<PTime>26 minutes ago</PTime>
						</P>
					</AboutPost>
					<CommentBlock>
						<SentimentSatisfiedRoundedIcon />
						<input type='text' placeholder='add a comment' />
					</CommentBlock>
				</PostInstagram>
				<PostInstagram>
					<Card>
						<Img src='https://picsum.photos/200/300' />
						<Span>Oleksandra Somewhere</Span>
					</Card>
					<Post>
						<ImgPost src='https://picsum.photos/400/400' />
					</Post>
					<Icons>
						<LeftIcon>
							<FavoriteBorderRoundedIcon />
							<ChatBubbleOutlineRoundedIcon />
							<SendRoundedIcon />
						</LeftIcon>
						<RightIcon>
							<BookmarkBorderRoundedIcon />
						</RightIcon>
					</Icons>
					<AboutPost>
						<PLiked>Liked by Olena and 104 others</PLiked>
						<P className='name_caption'>
							Tejash Vaishnav
							<Span id='caption'>
								The real test is not whether you avoid this failure, because you
								won't.....
							</Span>
							<PTime>26 minutes ago</PTime>
						</P>
					</AboutPost>
					<CommentBlock>
						<SentimentSatisfiedRoundedIcon />
						<input type='text' placeholder='add a comment' />
					</CommentBlock>
				</PostInstagram>
				<PostInstagram>
					<Card>
						<Img src='https://picsum.photos/200/300' />
						<Span>Oleksandra Somewhere</Span>
					</Card>
					<Post>
						<ImgPost src='https://picsum.photos/400/400' />
					</Post>
					<Icons>
						<LeftIcon>
							<FavoriteBorderRoundedIcon />
							<ChatBubbleOutlineRoundedIcon />
							<SendRoundedIcon />
						</LeftIcon>
						<RightIcon>
							<BookmarkBorderRoundedIcon />
						</RightIcon>
					</Icons>
					<AboutPost>
						<PLiked>Liked by Viktor and 424 others</PLiked>
						<P className='name_caption'>
							Tejash Vaishnav
							<Span id='caption'>
								The real test is not whether you avoid this failure, because you
								won't.....
							</Span>
							<PTime>26 minutes ago</PTime>
						</P>
					</AboutPost>
					<CommentBlock>
						<SentimentSatisfiedRoundedIcon />
						<input type='text' placeholder='add a comment' />
					</CommentBlock>
				</PostInstagram>
			</Posts>
			<ProfileInfo>
				<Profile>
					<ProfileAvatar>
						<Img src='https://picsum.photos/200/300' />
					</ProfileAvatar>
					<ProfileText>
						<Name>Test Name</Name>
					</ProfileText>
				</Profile>
			</ProfileInfo>
		</HomePage>
	);
};
