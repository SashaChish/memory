import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import MoreIcon from '@mui/icons-material/MoreVert';
import {
	Search,
	SearchIconWrapper,
	StyledInputBase,
	ListItemText,
	ListItem,
	List,
	Dialog,
	ListItemAvatar,
	Name,
	Img,
} from './Header.style';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

export const Header = () => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
	const [open, setOpen] = React.useState(false);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const menuId = 'primary-search-account-menu';
	const renderMenu = (
		<Menu
			sx={{ top: '40px' }}
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			id={menuId}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem onClick={handleMenuClose}>Profile</MenuItem>
			<MenuItem onClick={handleMenuClose}>LogOut</MenuItem>
		</Menu>
	);

	const handleClickOpen = () => {
		setOpen(true);
		console.log(open);
	};

	const handleClose = () => {
		setOpen(false);
		console.log(open);
	};

	const mobileMenuId = 'primary-search-account-menu-mobile';
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			sx={{ top: '30px' }}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem>
				<IconButton size='small'>Home</IconButton>
			</MenuItem>
			<MenuItem>
				<IconButton size='small'>Add Photo</IconButton>
			</MenuItem>
			<MenuItem>
				<IconButton size='small'>History</IconButton>
			</MenuItem>
			<MenuItem>
				<IconButton size='small'>Like</IconButton>
			</MenuItem>
			<MenuItem onClick={handleProfileMenuOpen}>
				<IconButton
					size='small'
					edge='end'
					aria-label='account of current user'
					aria-controls={menuId}
					aria-haspopup='true'
					onClick={handleProfileMenuOpen}
				>
					Profile
				</IconButton>
			</MenuItem>
			<MenuItem>
				<IconButton size='small'>LogOut</IconButton>
			</MenuItem>
		</Menu>
	);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar sx={{ backgroundColor: '#fff', color: '#000' }}>
				<Toolbar sx={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
					<Typography
						variant='h6'
						noWrap
						component='div'
						sx={{ display: { xs: 'none', sm: 'block' }, color: 'black' }}
					>
						Memory
					</Typography>
					<Search onClick={handleClickOpen}>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder='Search'
							inputProps={{ 'aria-label': 'search' }}
						/>
						<Dialog
							onClose={handleClose}
							sx={{ display: open ? 'block' : 'none' }}
						>
							<List>
								<ListItem>
									<ListItemAvatar>
										<Img src='https://picsum.photos/200/300' />
									</ListItemAvatar>
									<ListItemText>
										<Name>Test Name</Name>
									</ListItemText>
								</ListItem>
								<ListItem>
									<ListItemAvatar>
										<Img src='https://picsum.photos/200/300' />
									</ListItemAvatar>
									<ListItemText>
										<Name>Test Name</Name>
									</ListItemText>
								</ListItem>
								<ListItem>
									<ListItemAvatar>
										<Img src='https://picsum.photos/200/300' />
									</ListItemAvatar>
									<ListItemText>
										<Name>Test Name</Name>
									</ListItemText>
								</ListItem>
								<ListItem>
									<ListItemAvatar>
										<Img src='https://picsum.photos/200/300' />
									</ListItemAvatar>
									<ListItemText>
										<Name>Test Name</Name>
									</ListItemText>
								</ListItem>
							</List>
						</Dialog>
					</Search>
					<Box sx={{ flexGrow: 1 }} />
					<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
						<IconButton sx={{ color: 'black' }}>
							<HomeOutlinedIcon />
						</IconButton>
						<IconButton sx={{ color: 'black' }}>
							<AddBoxOutlinedIcon />
						</IconButton>
						<IconButton sx={{ color: 'black' }}>
							<ExploreOutlinedIcon />
						</IconButton>
						<IconButton sx={{ color: 'black' }}>
							<FavoriteBorderRoundedIcon />
						</IconButton>
						<IconButton
							size='large'
							edge='end'
							aria-label='account of current user'
							aria-controls={menuId}
							aria-haspopup='true'
							onClick={handleProfileMenuOpen}
							sx={{ color: 'black' }}
						>
							<AccountCircle />
						</IconButton>
					</Box>
					<Box sx={{ display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size='large'
							aria-label='show more'
							aria-controls={mobileMenuId}
							aria-haspopup='true'
							onClick={handleMobileMenuOpen}
						>
							<MoreIcon />
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
			{renderMenu}
		</Box>
	);
};
