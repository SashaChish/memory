import PropTypes from 'prop-types';
import { Button } from '@mui/material';

import { Row, TitleRow } from './AvatarModal.style';

export const AvatarModal = ({ modalControl }) => {
	return (
		<>
			<TitleRow>
				<h3>Change Profile Photo</h3>
			</TitleRow>
			<Row>
				<Button variant='text' component='label' fullWidth>
					Upload Photo
					<input
						onChange={(e) => console.log(e.target.files[0])}
						type='file'
						accept='image/*'
						hidden
					/>
				</Button>
			</Row>
			<Row>
				<Button variant='text' color='error' fullWidth>
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
