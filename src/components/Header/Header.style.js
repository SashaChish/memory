// import styled from 'styled-components';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';

export const Search = styled('div')(({ theme }) => ({
	border: 'solid 1px #dbdbdb',
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),

	marginRight: theme.spacing(2),
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(5),
		width: 'auto',
	},
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	color: 'grey',
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: '#000',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
}));
