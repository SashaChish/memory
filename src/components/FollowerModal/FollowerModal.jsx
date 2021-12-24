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
} from './FollowerModal.style';

import { $api } from '../../http';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/User/userActions';

export const FollowerModal = ({ refreshData, modalControl }) => {
	const [followers, setFollowers] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchData = async () => {
			const result = await $api.get('/profile/followers');
			setFollowers(result.data);
		};

		fetchData();
	}, []);

	const handleRemove = async (id) => {
		try {
			await $api.post('/profile/follower/remove', {
				id: id,
			});
			const result = await $api.get('/profile/following');
			setFollowers(result.data);
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
				Followers
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
				{followers.map((follow) => (
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

						<Cansel onClick={() => handleRemove(follow?.user)}>Remove</Cansel>
					</Profile>
				))}
			</FollowerInfo>
		</>
	);
};
