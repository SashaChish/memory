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
import DescriptionIcon from '@mui/icons-material/Description';
import useMediaQuery from '@mui/material/useMediaQuery';

import {
	CreateInfo,
	CreateFile,
	CreateUsername,
	CreateForm,
	PickFile,
	PickBtn,
	CreateImgContainer,
	CreateVideo,
} from './CreateModal.style';

import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { $api } from '../../http';
import { useSelector } from 'react-redux';

const BootstrapDialogTitle = (props) => {
	const { children, onClose, id, ...other } = props;

	return id === 'image-dialog' ? (
		<IconButton
			aria-label='close'
			onClick={onClose}
			sx={{
				position: 'absolute',
				right: 8,
				top: 8,
				color: '#fff',
			}}
		>
			<CloseIcon />
		</IconButton>
	) : (
		<DialogTitle sx={{ m: 0, p: 2 }} {...other}>
			{children}
			{onClose ? (
				<IconButton
					aria-label='close'
					onClick={onClose}
					sx={{
						position: 'absolute',
						right: props?.matches ? 2 : 8,
						top: props?.matches ? 2 : 15,
						color: (theme) =>
							props?.matches ? '#fff' : theme.palette.grey[500],
					}}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</DialogTitle>
	);
};

export const CreateModal = ({ modalControl }) => {
	const [fileType, setFileType] = useState('');
	const [fileLink, setFileLink] = useState('');
	const [file, setFile] = useState('');
	const [description, setDescription] = useState('');
	const [showDescription, setShowDescription] = useState(false);
	const inputRef = useRef(null);
	const userData = useSelector((state) => state);
	const navigate = useNavigate();
	const location = useLocation();
	const matches = useMediaQuery('(max-width:426px)');

	useEffect(() => {
		setShowDescription(false);
	}, []);

	const handlePickFile = (e) => {
		const imgArray = ['image/jpeg', 'image/jpg', 'image/png'];
		const file = Object(e.currentTarget.files)[0];
		setFile(file);
		setFileType(
			imgArray.includes(file.type)
				? 'png'
				: file.type === 'video/mp4'
				? 'mp4'
				: ''
		);
	};

	useEffect(() => {
		const fetchData = async () => {
			console.log(fileType, fileLink);
			axios({
				method: 'post',
				url: `http://localhost:5000/api/shared/host/${fileType}`,
				data: file,
				headers: {
					'x-auth-token': localStorage.getItem('x-auth-token'),
				},
			})
				.then((result) => {
					console.log(result.data);
					setTimeout(
						() => {
							setFileLink(result.data);
						},
						fileType === 'mp4' ? 4000 : 1000
					);
				})
				.catch((err) => console.log(err));
		};

		fileType && file && fetchData();
	}, [file, fileType]);

	const handleCreatePost = async (e) => {
		e.preventDefault();

		const result = await $api.post('/posts', {
			file: { fileType: fileType, fileLink: fileLink },
			description: description,
		});

		console.log(result.data);
		modalControl.handleCloseModal();
		navigate(location.pathname);
	};

	const handleDeleteFile = () => {
		setFileLink('');
		setShowDescription(false);
	};

	return (
		<Dialog
			onClose={() => modalControl.handleCloseModal()}
			aria-labelledby='post-popup'
			open={modalControl.open}
			className='postModalDialog'
			PaperProps={{
				style: {
					position: matches && 'unset',
					minHeight: '75vh',
					width: '90vw',
					borderRadius: '30px',
					maxWidth: '1100px',
				},
			}}
		>
			{fileLink ? (
				<CreateImgContainer>
					<BootstrapDialogTitle
						id='image-dialog'
						onClose={() => handleDeleteFile()}
						sx={{ display: 'flex', alignItems: 'center' }}
					></BootstrapDialogTitle>
					{fileType === 'mp4' ? (
						<CreateVideo controls>
							<source src={fileLink} type='video/mp4'></source>
						</CreateVideo>
					) : (
						<CreateFile src={fileLink} />
					)}
				</CreateImgContainer>
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
						{matches
							? 'Choose file from your phone'
							: 'Choose file from your computer'}
					</PickBtn>
				</PickFile>
			)}

			<CreateInfo>
				<BootstrapDialogTitle
					id='outbox-close'
					onClose={() => modalControl.handleCloseModal()}
					sx={{ display: 'flex', alignItems: 'center' }}
					matches={matches}
				>
					<Link to={`/`}>
						<Avatar
							sx={{ width: 40, height: 40, marginRight: '20px' }}
							src={userData?.avatar}
						/>
					</Link>
					<Link to={`/`} style={{ textDecoration: 'none', display: 'flex' }}>
						<CreateUsername>{userData?.username}</CreateUsername>
					</Link>
					{matches && fileLink && (
						<DescriptionIcon
							style={{ marginLeft: 'auto' }}
							onClick={() => setShowDescription(!showDescription)}
						/>
					)}
				</BootstrapDialogTitle>
				<DialogActions
					sx={{
						height: 'auto',
						borderTop: '1px solid #E0E0E0',
						display: matches ? (showDescription ? 'block' : 'none') : 'block',
					}}
					className='postForm'
				>
					<CreateForm>
						<TextField
							id='standard-textarea'
							placeholder='Write a description...'
							multiline={matches ? false : true}
							variant='standard'
							sx={{
								width: '100%',

								maxHeight: '69vh',
								overflowY: 'hidden',
							}}
							InputProps={{
								style: {
									fontSize: matches ? '13px' : '18px',
								},
							}}
							InputLabelProps={{
								display: 'none',
							}}
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
						<Button
							variant='text'
							type='submit'
							style={{
								backgroundColor: 'transparent',
								marginTop: '10px',
								marginRight: 'auto',
							}}
							disabled={!(fileLink.length != 0 && description.length != 0)}
							onClick={(e) => handleCreatePost(e)}
						>
							Publish
						</Button>
					</CreateForm>
				</DialogActions>
			</CreateInfo>
		</Dialog>
	);
};

CreateModal.propTypes = {
	modalControl: PropTypes.shape({
		open: PropTypes.bool.isRequired,
		handleCloseModal: PropTypes.func.isRequired,
	}).isRequired,
};
