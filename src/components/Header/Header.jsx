import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
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
import { Search, SearchIconWrapper, StyledInputBase } from './Header.style';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

export const Header = () => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
	const userData = useSelector((state) => state);

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
			<Link
				to='/'
				style={{
					display: 'flex',
					alignItems: 'center',
					textDecoration: 'none',
				}}
			>
				<MenuItem>
					<IconButton size='small'>Home</IconButton>
				</MenuItem>
			</Link>

			<MenuItem>
				<IconButton size='small'>Add Photo</IconButton>
			</MenuItem>
			<Link
				to='/explore'
				style={{
					display: 'flex',
					alignItems: 'center',
					textDecoration: 'none',
				}}
			>
				<MenuItem>
					<IconButton size='small'>History</IconButton>
				</MenuItem>
			</Link>

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
		<Box sx={{ flexGrow: 1, paddingTop: '64px' }}>
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
					<Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder='Search'
							inputProps={{ 'aria-label': 'search' }}
						/>
					</Search>
					<Box sx={{ flexGrow: 1 }} />
					<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
						<Link
							to='/'
							style={{
								display: 'flex',
								alignItems: 'center',
								textDecoration: 'none',
							}}
						>
							<IconButton sx={{ color: 'black' }}>
								<HomeOutlinedIcon />
							</IconButton>
						</Link>

						<IconButton sx={{ color: 'black' }}>
							<AddBoxOutlinedIcon />
						</IconButton>
						<Link
							to='/exlore'
							style={{
								display: 'flex',
								alignItems: 'center',
								textDecoration: 'none',
							}}
						>
							<IconButton sx={{ color: 'black' }}>
								<ExploreOutlinedIcon />
							</IconButton>
						</Link>

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
							{userData?.avatar ? (
								<Avatar
									sx={{ width: 24, height: 24 }}
									alt={userData?.username}
									src={userData?.avatar}
								/>
							) : (
								<AccountCircle />
							)}
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
