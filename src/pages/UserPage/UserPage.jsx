import { Link, Routes, Route } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import AppsIcon from '@mui/icons-material/Apps';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';

import { useModal } from '../../hooks/useModal';

import { Posts } from '../../components/Posts';
import { Modal } from '../../components/Modal';
import { AvatarModal } from '../../components/AvatarModal';
import { SettingsModal } from '../../components/SettingsModal';

import {
	Main,
	PageWrapper,
} from '../../theme/GlobalComponents/GlobalComponents.style';

import {
	Avatar,
	AvatarContainer,
	AvatarWrapper,
	BtnEdit,
	BtnWrapper,
	ContentContainer,
	ContentHeader,
	FullNameBlock,
	IconContainer,
	Navigation,
	TitleMobile,
	UlMobile,
	UserInfoContainer,
	UsernameBlock,
} from './UserPage.style';

export const UserPage = () => {
	const avatar = useModal();
	const settings = useModal();

	return (
		<PageWrapper>
			<Main>
				<ContentContainer>
					<ContentHeader>
						<AvatarWrapper>
							<div>
								<AvatarContainer>
									<button onClick={avatar.handleOpenModal}>
										<Avatar src='https://cdn.pixabay.com/photo/2021/11/11/20/49/sauerland-6787215_960_720.jpg' />
									</button>
									<Modal modalControl={avatar}>
										<AvatarModal modalControl={avatar} />
									</Modal>
								</AvatarContainer>
							</div>
						</AvatarWrapper>
						<UserInfoContainer>
							<UsernameBlock>
								<h2>Username</h2>
								<BtnWrapper>
									<BtnEdit>Edit Profile</BtnEdit>
								</BtnWrapper>
								<IconContainer>
									<SettingsIcon
										onClick={settings.handleOpenModal}
										fontSize='large'
									/>
									<Modal modalControl={settings}>
										<SettingsModal modalControl={settings} />
									</Modal>
								</IconContainer>
							</UsernameBlock>
							<ul>
								<li>
									<span>9 posts</span>
								</li>
								<li>
									<span>165 followers</span>
								</li>
								<li>
									<span>118 following</span>
								</li>
							</ul>
							<FullNameBlock>
								<h1>Full name</h1>
							</FullNameBlock>
						</UserInfoContainer>
					</ContentHeader>
					<TitleMobile>
						<h1>Full name</h1>
					</TitleMobile>
					<UlMobile>
						<li>
							<span>9</span>
							<span>posts</span>
						</li>
						<li>
							<span>165</span>
							<span>followers</span>
						</li>
						<li>
							<span>118</span>
							<span>following</span>
						</li>
					</UlMobile>
					<Navigation>
						<Link to='/username/'>
							<span>
								<AppsIcon />
								<span>Posts</span>
							</span>
						</Link>
						<Link to='/username/saved/'>
							<span>
								<BookmarkBorderOutlinedIcon />
								<span>Saved</span>
							</span>
						</Link>
					</Navigation>

					<Routes>
						<Route
							path='/'
							element={
								<Posts
									text='post'
									src='https://cdn.pixabay.com/photo/2021/11/11/20/49/sauerland-6787215_960_720.jpg'
								/>
							}
						/>
						<Route
							path='saved'
							element={
								<Posts
									text='saved'
									src='https://media.istockphoto.com/photos/snow-covered-christmas-tree-plantation-picture-id1295331937?b=1&k=20&m=1295331937&s=170667a&w=0&h=owYa_ihglG6FIaR5CNqIPFQ6IQFr0EYDXo2IgqhvIKA='
								/>
							}
						/>
					</Routes>
				</ContentContainer>
			</Main>
		</PageWrapper>
	);
};
