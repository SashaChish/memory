import React, { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
	ImgTag,
	FollowerInfo,
	Profile,
	ProfileAvatar,
	ProfileText,
	Name,
	Link,
	Cansel,
	Row,
} from './FollowingModal.style';

import { $api } from '../../http';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/User/userActions';

export const FollowingModal = ({ refreshData, modalControl }) => {
	const [following, setFollowing] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchData = async () => {
			const result = await $api.get('/profile/following');
			setFollowing(result.data);
		};

		fetchData();
	}, []);

	const handleUnfollow = async (id) => {
		try {
			await $api.post('/profile/following/remove', {
				id: id,
			});
			const result = await $api.get('/profile/following');
			setFollowing(result.data);
			const userInfo = await $api.get('/auth');
			dispatch(setUser(userInfo.data));
			refreshData();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<Row>
				Following
				<CloseIcon
					style={{
						position: 'absolute',
						top: '10px',
						right: '15px',
						cursor: 'pointer',
					}}
					onClick={() => modalControl.handleCloseModal()}
				></CloseIcon>
			</Row>

			<FollowerInfo>
				{following.map((follow) => (
					<Profile>
						<ProfileAvatar>
							<ImgTag src={follow?.avatar} />
						</ProfileAvatar>
						<ProfileText>
							<Link
								style={{
									textDecoration: 'none',
									color: '#000',
								}}
							>
								<Name>{follow?.username}</Name>
							</Link>
							<Name style={{ color: '#8e8e8e' }}>{follow?.fullName}</Name>
						</ProfileText>

						<Cansel onClick={() => handleUnfollow(follow?.user)}>
							Unfollow
						</Cansel>
					</Profile>
				))}
			</FollowerInfo>
		</>
	);
};
