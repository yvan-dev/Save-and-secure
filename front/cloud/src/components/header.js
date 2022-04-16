import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import createHistory from 'history/createBrowserHistory';
import React from 'react';
import { withCookies } from 'react-cookie';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import logo from '../images/s&s_logo.png';
class Header extends React.Component {
	constructor(props) {
		super(props);
	}

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
			<Grid container spacing={2} sx={{ bgcolor: 'white', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
				<Grid item xs={12} sm={12} md={4} sx={{pl: 4, pb: 1 }}>
					<img src={logo} style={{ height: '50%', width: '15%', marginLeft: 2 }} />
				</Grid>
				<Grid item xs={12} sm={12} md={8}>
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
						<Grid item xs={12} sm={3} md={3}>
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
										console.log('event value : ', event.target.value);
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
		);
	}
}

export default withRouter(withCookies(Header));
