import { Button } from '@mui/material';
import { Row } from './SettingsModal.style';

export const SettingsModal = (modalControl) => {
	return (
		<>
			<Row>
				<Button variant='text' color='inherit' fullWidth>
					Change Password
				</Button>
			</Row>
			<Row>
				<Button color='inherit' variant='text'>
					Report a Problem
				</Button>
			</Row>
			<Row>
				<Button
					onClick={modalControl.handleCloseModal}
					variant='text'
					color='inherit'
					fullWidth
				>
					Cancel
				</Button>
			</Row>
		</>
	);
};
