import { Button } from '@mui/material';
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

export const FollowerModal = ({ modalControl }) => {
	return (
		<>
			<Row>
				<Button variant='text' color='inherit' fullWidth>
					Followers
				</Button>
				<CloseIcon></CloseIcon>
			</Row>

			<FollowerInfo>
				<Profile>
					<ProfileAvatar>
						<ImgTag src='https://i.picsum.photos/id/0/5616/3744.jpg?hmac=3GAAioiQziMGEtLbfrdbcoenXoWAW-zlyEAMkfEdBzQ' />
					</ProfileAvatar>
					<ProfileText>
						<Link
							style={{
								textDecoration: 'none',
								color: '#000',
							}}
						>
							<Name>Oleksandra</Name>
						</Link>
						<Name style={{ color: '#8e8e8e' }}>Kot</Name>
					</ProfileText>

					<Cansel>Remove</Cansel>
				</Profile>
			</FollowerInfo>
			<Button
				onClick={modalControl.handleCloseModal}
				variant='text'
				color='inherit'
				fullWidth
			></Button>
		</>
	);
};
