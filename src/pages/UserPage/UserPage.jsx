import React, { useState, useEffect } from 'react';
import { Link, Routes, Route, useParams, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SettingsIcon from '@mui/icons-material/Settings';
import AppsIcon from '@mui/icons-material/Apps';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { $api } from '../../http';

import { useModal } from '../../hooks/useModal';

import { Posts } from '../../components/Posts';
import { Modal } from '../../components/Modal';
import { NotFoundPage } from '../NotFoundPage';
import { AvatarModal } from '../../components/AvatarModal';
import { SettingsModal } from '../../components/SettingsModal';

import { transformError } from '../../helpers';

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
	const { username } = useParams();
	const location = useLocation();
	const [profileInfo, setProfileInfo] = useState({});
	const [profilePosts, setProfilePosts] = useState([]);
	const [profileSaved, setProfileSaved] = useState([]);
	const [usersProfile, setUsersProfile] = useState(false);
	const userData = useSelector((state) => state);
	const [notFoundError, setNotFoundError] = useState(false);

	useEffect(() => {
		async function fetchData() {
			setUsersProfile(username === userData.username);

			try {
				const profile = await $api.get(`/profile/${username}`);
				setProfileInfo(profile.data);
			} catch (err) {
				err = transformError(err);
				if (err.status === 404) {
					setNotFoundError(true);
				}
			}

			const posts = await $api.get(`/profile/posts/${username}`);
			const saved = await $api.get(`/profile/saved/me`);

			posts.status === 200 && setProfilePosts(posts.data);
			saved.status === 200 &&
				username === userData.username &&
				setProfileSaved(saved.data);
		}

		fetchData();
	}, [location]);

	const handleUpdateHover = async () => {
		try {
			const posts = await $api.get(`/profile/posts/${username}`);
			console.log(posts);
			setProfilePosts(posts.data);

			const saved = await $api.get(`/profile/saved/me`);
			setProfileSaved(saved.data);
		} catch (err) {
			console.log(err);
		}
	};

	return !notFoundError ? (
		<PageWrapper>
			<Main>
				<ContentContainer>
					<ContentHeader>
						<AvatarWrapper>
							<div>
								<AvatarContainer>
									<button onClick={avatar.handleOpenModal}>
										<Avatar src={profileInfo?.avatar} />
									</button>
									<Modal modalControl={avatar}>
										<AvatarModal modalControl={avatar} />
									</Modal>
								</AvatarContainer>
							</div>
						</AvatarWrapper>
						<UserInfoContainer>
							<UsernameBlock>
								<h2>{profileInfo?.username}</h2>
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
									<span>{profileInfo?.posts?.length} posts</span>
								</li>
								<li>
									<span>{profileInfo?.followers?.length} followers</span>
								</li>
								<li>
									<span>{profileInfo?.following?.length} following</span>
								</li>
							</ul>
							<FullNameBlock>
								<h1>{profileInfo?.fullName}</h1>
							</FullNameBlock>
						</UserInfoContainer>
					</ContentHeader>
					<TitleMobile>
						<h1>{profileInfo?.fullName}</h1>
					</TitleMobile>
					<UlMobile>
						<li>
							<span>{profileInfo?.posts?.length}</span>
							<span>posts</span>
						</li>
						<li>
							<span>{profileInfo?.followers?.length}</span>
							<span>followers</span>
						</li>
						<li>
							<span>{profileInfo?.following?.length}</span>
							<span>following</span>
						</li>
					</UlMobile>
					<Navigation>
						<Link
							to={`/${username}`}
							className={location.pathname === `/${username}` ? 'active' : ''}
						>
							<span>
								<AppsIcon />
								<span>Posts</span>
							</span>
						</Link>
						{usersProfile && (
							<Link
								to={`/${username}/saved`}
								className={
									location.pathname === `/${username}/saved` ? 'active' : ''
								}
							>
								<span>
									<BookmarkBorderOutlinedIcon />
									<span>Saved</span>
								</span>
							</Link>
						)}
					</Navigation>

					<Routes>
						<Route
							path='/'
							element={
								<Posts
									handleUpdateHover={handleUpdateHover}
									type='post'
									files={profilePosts}
								/>
							}
						/>
						<Route
							path='/saved/'
							element={
								usersProfile && (
									<Posts
										handleUpdateHover={handleUpdateHover}
										type='saved'
										files={profileSaved}
									/>
								)
							}
						/>
					</Routes>
				</ContentContainer>
			</Main>
		</PageWrapper>
	) : (
		<NotFoundPage />
	);
};
