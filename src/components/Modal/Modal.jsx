import PropTypes from 'prop-types';

import { Modal } from '@mui/material';

import { ModalContainer } from './Modal.style';

export default function CustomModal({ modalControl, children }) {
	return (
		<Modal
			open={modalControl.open}
			onClose={modalControl.handleCloseModal}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'
		>
			<ModalContainer>{children}</ModalContainer>
		</Modal>
	);
}

CustomModal.propTypes = {
	modalControl: PropTypes.shape({
		open: PropTypes.bool.isRequired,
		handleCloseModal: PropTypes.func.isRequired,
	}).isRequired,
};
