import React, { useState, useEffect } from 'react';
import {
	Link,
	Routes,
	Route,
	useParams,
	useLocation,
	useNavigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppsIcon from '@mui/icons-material/Apps';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { $api } from '../../http';

import { useModal } from '../../hooks/useModal';

import { Posts } from '../../components/Posts';
import { Modal } from '../../components/Modal';
import { NotFoundPage } from '../NotFoundPage';
import { AvatarModal } from '../../components/AvatarModal';
import { FollowerModal } from '../../components/FollowerModal';
import { FollowingModal } from '../../components/FollowingModal';

import { transformError } from '../../helpers';

import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/User/userActions';

import {
	Main,
	PageWrapper,
} from '../../theme/GlobalComponents/GlobalComponents.style';

import {
	Avatar,
	AvatarContainer,
	AvatarWrapper,
	BtnUnfollow,
	BtnFollow,
	BtnWrapper,
	ContentContainer,
	ContentHeader,
	FullNameBlock,
	Navigation,
	TitleMobile,
	UlMobile,
	UserInfoContainer,
	UsernameBlock,
} from './UserPage.style';

export const UserPage = () => {
	const avatar = useModal();
	const followers = useModal();
	const followingModal = useModal();
	const { username } = useParams();
	const location = useLocation();
	const navigate = useNavigate();
	const [profileInfo, setProfileInfo] = useState({});
	const [profilePosts, setProfilePosts] = useState([]);
	const [profileSaved, setProfileSaved] = useState([]);
	const [usersProfile, setUsersProfile] = useState(false);
	const userData = useSelector((state) => state);
	const [notFoundError, setNotFoundError] = useState(false);
	const [following, setFollowing] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		async function fetchData() {
			setUsersProfile(username === userData.username);

			try {
				const profile = await $api.get(`/profile/${username}`);
				setProfileInfo(profile.data);
				userData?.following.map((follow) => console.log(follow.user));
				setFollowing(
					userData?.following.some(
						(follow) => follow.user === profile.data?.user
					)
				);
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

	const handleFollow = async () => {
		try {
			await $api.post('/profile/following/add', {
				id: profileInfo?.user,
			});
			const result = await $api.get('/auth');
			dispatch(setUser(result.data));
			setFollowing(true);
			navigate(location.pathname);
		} catch (err) {
			console.log(err);
		}
	};

	const handleUnfollow = async () => {
		try {
			await $api.post('/profile/following/remove', {
				id: profileInfo?.user,
			});
			const result = await $api.get('/auth');
			dispatch(setUser(result.data));
			setFollowing(false);
			navigate(location.pathname);
		} catch (err) {
			console.log(err);
		}
	};

	const refreshData = async () => {
		const profile = await $api.get(`/profile/${username}`);
		setProfileInfo(profile.data);
	};

	return !notFoundError ? (
		<PageWrapper>
			<Main>
				<ContentContainer>
					<ContentHeader>
						<AvatarWrapper>
							<div>
								<AvatarContainer>
									{username === userData?.username ? (
										<button onClick={avatar.handleOpenModal}>
											<Avatar src={profileInfo?.avatar} />
										</button>
									) : (
										<Avatar src={profileInfo?.avatar} />
									)}
									<Modal modalControl={avatar}>
										<AvatarModal modalControl={avatar} />
									</Modal>
								</AvatarContainer>
							</div>
						</AvatarWrapper>
						<UserInfoContainer>
							<UsernameBlock>
								<h2>{profileInfo?.username}</h2>
								{username !== userData?.username && (
									<BtnWrapper>
										{following ? (
											<BtnUnfollow onClick={() => handleUnfollow()}>
												Unfollow
											</BtnUnfollow>
										) : (
											<BtnFollow onClick={() => handleFollow()}>
												Follow
											</BtnFollow>
										)}
									</BtnWrapper>
								)}
							</UsernameBlock>
							<ul>
								<li>
									<span>{profileInfo?.posts?.length} posts</span>
								</li>
								<li>
									<span
										onClick={
											username === userData?.username &&
											followers.handleOpenModal
										}
									>
										{profileInfo?.followers?.length} followers
									</span>
									<Modal modalControl={followers}>
										<FollowerModal
											refreshData={refreshData}
											modalControl={followers}
										/>
									</Modal>
								</li>
								<li>
									<span
										onClick={
											username === userData?.username &&
											followingModal.handleOpenModal
										}
									>
										{profileInfo?.following?.length} following
									</span>
									<Modal modalControl={followingModal}>
										<FollowingModal
											refreshData={refreshData}
											modalControl={followingModal}
										/>
									</Modal>
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
