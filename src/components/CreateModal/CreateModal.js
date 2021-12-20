import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from '@mui/material/Avatar';

import {
	CreateInfo,
	CreateFile,
	CreateUsername,
	CreateForm,
	PickFile,
	PickBtn,
} from './CreateModal.style';

import { Link } from 'react-router-dom';
import { $api } from '../../http';

const BootstrapDialogTitle = (props) => {
	const { children, onClose, ...other } = props;

	return (
		<DialogTitle sx={{ m: 0, p: 2 }} {...other}>
			{children}
			{onClose ? (
				<IconButton
					aria-label='close'
					onClick={onClose}
					sx={{
						position: 'absolute',
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
					}}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</DialogTitle>
	);
};
export const CreateModal = ({ modalControl }) => {
	const [file, setFile] = useState({});
	const [binary, setBinary] = useState('');
	const inputRef = useRef(null);

	const handlePickFile = (e) => {
		const imgArray = ['image/jpeg', 'image/jpg', 'image/png'];
		const file = Object(e.currentTarget.files)[0];
		const reader = new FileReader();
		setFile({
			fileType: imgArray.includes(file.type)
				? 'png'
				: file.type === 'video/mp4'
				? 'mp4'
				: '',
		});

		reader.onloadend = function () {
			var data = reader.result.split(',')[1];
			var binaryBlob = atob(data);
			setBinary(binaryBlob);
		};

		if (file) {
			reader.readAsDataURL(file);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			console.log(binary);
			const result = await $api.post(`/shared/host/${file.fileType}`, binary);
			result.status === 200 &&
				setFile({
					...file,
					fileLink: result.data,
				});
			console.log(result.data);
		};

		file?.fileType && binary && fetchData();
	}, [binary]);

	return (
		<div className='postModal'>
			<Dialog
				onClose={() => modalControl.handleCloseModal()}
				aria-labelledby='post-popup'
				open={modalControl.open}
				className='postModalDialog'
			>
				<img
					src='https://asd-internship.fra1.digitaloceanspaces.com/61b30fecb3c6b295decc0a2b.A9CF0ehMQMcwuJ2gEOP7S.png'
					alt=''
				/>
				{file?.fileLink ? (
					<CreateFile src={file.fileLink} />
				) : (
					<PickFile>
						<input
							style={{ display: 'none' }}
							type='file'
							accept='.jpg, .jpeg, .png, .mp4'
							ref={inputRef}
							onChange={(e) => handlePickFile(e)}
						/>
						<PickBtn onClick={() => inputRef.current.click()}>
							Choose file from your computer computer
						</PickBtn>
					</PickFile>
				)}

				<CreateInfo>
					<BootstrapDialogTitle
						id='customized-dialog-title'
						onClose={() => modalControl.handleCloseModal()}
						sx={{ display: 'flex', alignItems: 'center' }}
					>
						<Link to={`/`}>
							<Avatar sx={{ width: 40, height: 40, marginRight: '20px' }} />
						</Link>
						<Link to={`/`} style={{ textDecoration: 'none', display: 'flex' }}>
							<CreateUsername></CreateUsername>
						</Link>
					</BootstrapDialogTitle>
					<DialogActions
						sx={{
							height: 'auto',
							borderTop: '1px solid #E0E0E0',
						}}
						className='postForm'
					>
						<CreateForm>
							<TextField
								variant='standard'
								margin='normal'
								fullWidth
								name='comment'
								autoFocus
								placeholder='Write a comment...'
								InputProps={{
									disableUnderline: true,
								}}
							/>
							<Button
								variant='text'
								type='submit'
								style={{ backgroundColor: 'transparent' }}
							>
								Publish
							</Button>
						</CreateForm>
					</DialogActions>
				</CreateInfo>
			</Dialog>
		</div>
	);
};

CreateModal.propTypes = {
	modalControl: PropTypes.shape({
		open: PropTypes.bool.isRequired,
		handleCloseModal: PropTypes.func.isRequired,
	}).isRequired,
};
