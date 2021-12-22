import PropTypes from 'prop-types';
import { Button } from '@mui/material';

import { Row, TitleRow } from './AvatarModal.style';

import axios from 'axios';
import { $api } from '../../http';
import {
	useNavigate,
	useLocation,
	unstable_HistoryRouter,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAvatar } from '../../redux/User/userActions';

export const AvatarModal = ({ modalControl }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();

	const handleChangeAvatar = (file) => {
		axios({
			method: 'post',
			url: `http://localhost:5000/api/shared/host/png`,
			data: file,
			headers: {
				'x-auth-token': localStorage.getItem('x-auth-token'),
			},
		})
			.then(async (result) => {
				await $api.post('/profile/avatar', {
					avatar: result.data,
				});

				setTimeout(() => {
					console.log(result.data);
					dispatch(setAvatar(result.data));

					modalControl.handleCloseModal();
					navigate(location.pathname);
				}, 300);
			})
			.catch((err) => console.log(err));
	};

	const removeAvatar = async () => {
		await $api.post('/profile/avatar', {
			avatar:
				'https://nogivruki.ua/wp-content/uploads/2018/08/default-user-image.png',
		});

		setTimeout(() => {
			dispatch(
				setAvatar(
					'https://nogivruki.ua/wp-content/uploads/2018/08/default-user-image.png'
				)
			);

			modalControl.handleCloseModal();
			navigate(location.pathname);
		}, 300);
	};

	return (
		<>
			<TitleRow>
				<h3>Change Profile Photo</h3>
			</TitleRow>
			<Row>
				<Button variant='text' component='label' fullWidth>
					Upload Photo
					<input
						onChange={(e) =>
							handleChangeAvatar(Object(e.currentTarget.files)[0])
						}
						type='file'
						accept='.jpg, .jpeg, .png'
						hidden
					/>
				</Button>
			</Row>
			<Row>
				<Button
					variant='text'
					color='error'
					fullWidth
					onClick={() => removeAvatar()}
				>
					Remove Current Photo
				</Button>
			</Row>
			<Row>
				<Button
					onClick={modalControl.handleCloseModal}
					variant='text'
					fullWidth
					color='inherit'
				>
					Cancel
				</Button>
			</Row>
		</>
	);
};

AvatarModal.propTypes = {
	modalControl: PropTypes.shape({
		open: PropTypes.bool.isRequired,
		handleCloseModal: PropTypes.func.isRequired,
	}).isRequired,
};
