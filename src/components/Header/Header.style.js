// import styled from 'styled-components';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import styledC from 'styled-components';

export const HeaderSearch = styledC.div`
	.searchResult {
		overflow-y: scroll;
		max-height: 360px;

		&::-webkit-scrollbar{
			display:none;
		}
	}
`;

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

export const ListItem = styledC.div`
	display: flex;
	align-items: center;
	padding:15px 10px;

	&:hover{
		background-color:#EFEFEF;
	}
`;
export const List = styledC.div`
	margin:-5px 0;
`;
export const Dialog = styledC.div`
	position: absolute;
	background: #fff;
    width: 100%;
    -webkit-box-shadow: 0px 0px 8px 0px rgb(34 60 80 / 20%);
    -moz-box-shadow: 0px 0px 8px 0px rgba(34, 60, 80, 0.2);
    box-shadow: 0px 0px 8px 0px rgb(34 60 80 / 20%);
    top: 50px;
`;
export const ListItemAvatar = styledC.div``;
export const Name = styledC.div``;
export const Img = styledC.img`
	border-radius: 50%;
	width: 40px;
	height: 40px;
	margin-right: 10px;
`;
export const ListItemText = styledC.div`
	display:flex;
	flex-direction:column;
	overflow-x:hidden;
`;
