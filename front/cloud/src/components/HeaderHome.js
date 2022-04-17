import AccountCircle from '@mui/icons-material/AccountCircle';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MenuIcon from '@mui/icons-material/Menu';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import TopicOutlinedIcon from '@mui/icons-material/TopicOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Link, Stack } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import logo from '../images/s&s_logo.png';

class HeaderHome extends React.Component {
	constructor(props) {
		super(props);
		this.state = {showMenu: false, showDrawer: false };
	}

	handleMenu = (event) => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = () => {};

	handleDrawer = () => {
		this.setState({ showDrawer: true });
	};

	closeDrawer = () => {
		this.setState({ showDrawer: false });
	};

	handleMenu = () => {
		this.setState({showMenu: true})
	}

	closeMenu = () => {
		this.setState({showMenu: false})
	}

    render () {
        const { history, user } = this.props;
		const pagesTitles = [
			{
				page: '/stockage',
				title: 'Mes documents',
				icon: <TopicOutlinedIcon fontSize='large' color='primary' />,
			},
			{
				page: '/monCompte',
				title: 'Mon compte',
				icon: <AccountCircleOutlinedIcon fontSize='large' color='primary' />,
			},
			{
				page: '/infoElevesLycee',
				title: 'Étudiants',
				icon: <PersonOutlineOutlinedIcon fontSize='large' color='primary' />,
			},
		];
		let currentPage = pagesTitles[0]
		return (
			<div>
				<SwipeableDrawer anchor='left' open={this.state.showDrawer} onClose={this.closeDrawer}>
					<List sx={{ display: 'flex', flexDirection: 'column' }}>
						<img src={logo} style={{ marginBottom: 25, height: 90, width: 130, marginLeft: '15%' }} />
						{user != null &&
							pagesTitles.map((pageTitle, index) => {
								let color = '';
								let selected = false;
								if (pageTitle.title === 'Étudiants' && user.status !== 'admin') return;
								if (pageTitle.page === history.location.pathname) {
									selected = true;
									currentPage = pageTitle;
								}
								return (
									<ListItemButton
										selected={selected}
										alignItems='center'
										divider={true}
										button='true'
										key={index}
										sx={{ backgroundColor: color }}
										onClick={() => history.push(pageTitle.page, user)}
									>
										<ListItemIcon>{pageTitle.icon}</ListItemIcon>
										<ListItemText primary={pageTitle.title} />
									</ListItemButton>
								);
							})}
						<Button color='error' onClick={() => history.push('/login')} sx={{ mt: 5 }}>
							<FormattedMessage id='stockage.header.btnDisconnect' />
						</Button>
						<Stack
							direction='row'
							spacing={4}
							divider={<Divider orientation='vertical' flexItem />}
							sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: '20%' }}
						>
							<a href='https://www.facebook.com/profile.php?id=100078998544526' title='Rejoignez-nous sur Facebook'>
								<FacebookOutlinedIcon />
							</a>
							<a href='https://twitter.com/' title='Rejoignez-nous sur Twitter'>
								<TwitterIcon />
							</a>
							<a href='https://www.linkedin.com/in/ss-cloud-43875b235/' title='Rejoignez-nous sur LinkedIn'>
								<LinkedInIcon />
							</a>
						</Stack>
						<Typography variant='body2' color='text.secondary' align='center' sx={{ mt: 5 }}>
							{'Copyright © '}
							<Link color='inherit' href='https://www.linkedin.com/in/ss-cloud-43875b235/'>
								Save and Safe
							</Link>{' '}
							{new Date().getFullYear()}
							{'.'}
						</Typography>
					</List>
				</SwipeableDrawer>
				<AppBar position='static' sx={{ mb: 5 }}>
					<Toolbar>
						<IconButton size='large' edge='start' color='inherit' aria-label='menu' onClick={this.handleDrawer} sx={{ mr: 2 }}>
							<MenuIcon />
						</IconButton>
						<Typography component='p' variant='body1' sx={{ flexGrow: 1 }}>
							{currentPage.title}
						</Typography>
						<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
							<Typography component='p' variant='body1' sx={{ flexGrow: 1 }}>
								{user != null && user.firstName + ' ' + user.lastName}
							</Typography>
							<IconButton size='large' aria-label='account of current user' aria-controls='menu-appbar' aria-haspopup='true' onClick={this.handleMenu} color='inherit'>
								<AccountCircle onClick={this.handleMenu} />
							</IconButton>
							<Menu
								id='menu-appbar'
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={this.state.showMenu}
								onClose={this.closeMenu}
							>
								<MenuItem onClick={() => history.push('/monCompte')}>Mon compte</MenuItem>
								<MenuItem onClick={() => history.push('/login')}>Déconnexion</MenuItem>
							</Menu>
						</div>
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

export default withRouter(HeaderHome);
