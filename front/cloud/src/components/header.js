import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import MenuIcon from '@mui/icons-material/Menu';
import {
	AppBar,
	Button,
	Divider,
	FormControl,
	Grid,
	IconButton,
	InputLabel,
	List,
	ListItemButton,
	ListItemText,
	MenuItem,
	Select,
	Stack,
	SwipeableDrawer,
	Toolbar,
	Typography,
	Link,
} from '@mui/material';
import React from 'react';
import { withCookies } from 'react-cookie';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import logo from '../images/s&s_logo.png';
class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = { showDrawer: false };
    }

	handleDrawer = () => {
		this.setState({ showDrawer: true });
	};

	closeDrawer = () => {
		this.setState({ showDrawer: false });
	};

	SwipeableDrawer = (pagesTitles, options) => {
		const { history, cookies } = this.props;
		let currentPage = pagesTitles[0];
		return (
			<div>
				<SwipeableDrawer anchor='left' open={this.state.showDrawer} onClose={this.closeDrawer}>
					<List sx={{ display: 'flex', flexDirection: 'column' }}>
						<img src={logo} style={{ marginBottom: 25, height: 90, width: 130, marginLeft: '15%' }} />
						{pagesTitles.map((pageTitle, index) => {
							let color = '';
							let selected = false;
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
									onClick={() => history.push(pageTitle.page)}
								>
									<ListItemText
										primary={
											<Typography component='p' variant='button'>
												{pageTitle.id == null ? 'FAQ' : <FormattedMessage id={pageTitle.id} />}
											</Typography>
										}
									/>
								</ListItemButton>
							);
						})}
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
				<AppBar position='static'>
					<Toolbar>
						<Grid container spacing={{ xs: 3, sm: 6, md: 10 }} sx={{ p: 1, display: 'flex', alignItems: 'center' }}>
							<Grid item xs={5} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
								<IconButton size='large' edge='start' color='inherit' aria-label='menu' onClick={this.handleDrawer} sx={{ mr: 2 }}>
									<MenuIcon />
								</IconButton>
								<Typography component='p' variant='button'>
									{currentPage.id == null ? 'FAQ' : <FormattedMessage id={currentPage.id} />}
								</Typography>
							</Grid>
							<Grid item xs={7} sx={{ pb: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
								<FormControl variant='filled' sx={{ width: '100%' }}>
									<InputLabel id='language'>
										<Typography component='p' variant='body1'>
											Langue
										</Typography>
									</InputLabel>
									<Select
										defaultValue={cookies != null ? cookies.get('language') : 'FR'}
										labelId='language'
										onChange={(event) => {
											this.props.changeCookie(event.target.value);
										}}
									>
										{options.map((option, index) => {
											return (
												<MenuItem key={index} value={option.value}>
													{option.label}
												</MenuItem>
											);
										})}
									</Select>
								</FormControl>
							</Grid>
						</Grid>
					</Toolbar>
				</AppBar>
			</div>
		);
	};

	render() {
		const { history, cookies } = this.props;
		const options = [
			{ value: 'FR', label: 'Français' },
			{ value: 'ENG', label: 'Anglais' },
		];
		let pages = [
			{
				id: 'propos.header.btnWelcome',
				page: '/',
			},
			{
				id: 'home.header.btnConnectLabel',
				page: '/login',
			},
			{
				id: 'home.header.btnAbout',
				page: '/propos',
			},
			{
				id: 'home.header.btnContact',
				page: '/contact',
			},
			{
				id: null,
				page: '/FAQ',
			},
		];

		return (
			<div>
				{cookies.get('device') != null && cookies.get('device') === 'mobile' ? (
					this.SwipeableDrawer(pages, options)
				) : (
					<Grid container sx={{ bgcolor: 'white' }}>
						<Grid item xs={12} sm={12} md={3} sx={{ pl: 1, display: 'flex', alignItems: 'center' }}>
							<img src={logo} style={{ height: '60%', width: '25%', marginLeft: 2 }} />
						</Grid>
						<Grid item xs={12} sm={12} md={9}>
							<Grid container spacing={{ xs: 0, sm: 6, md: 9 }} sx={{ pb: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
								{pages.map((page) => {
									if (history.location.pathname === page.page) return null;
									return page.id == null ? (
										<Grid item>
											<Button onClick={() => history.push(page.page)}>
												<Typography component='p' variant='button'>
													FAQ
												</Typography>
											</Button>
										</Grid>
									) : (
										<Grid item>
											<Button onClick={() => history.push(page.page)}>
												<Typography component='p' variant='button'>
													<FormattedMessage id={page.id} />
												</Typography>
											</Button>
										</Grid>
									);
								})}
								<Grid item xs={12} sm={3} md={4}>
									<FormControl variant='filled' sx={{ m: 1, width: '90%' }}>
										<InputLabel id='language'>
											<Typography component='p' variant='body1'>
												Langue
											</Typography>
										</InputLabel>
										<Select
											defaultValue={cookies != null ? cookies.get('language') : 'FR'}
											labelId='language'
											onChange={(event) => {
												this.props.changeCookie(event.target.value);
											}}
										>
											{options.map((option, index) => {
												return (
													<MenuItem key={index} value={option.value}>
														{option.label}
													</MenuItem>
												);
											})}
										</Select>
									</FormControl>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				)}
			</div>
		);
	}
}

export default withRouter(withCookies(Header));
