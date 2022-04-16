import CloseIcon from '@mui/icons-material/Close';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { withCookies } from 'react-cookie';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import rest from '../API/rest';
import background from '../images/connexion.jpg';
import Header from './Header';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = { loading: false, error: false };
	}

	componentDidMount() {
		const { cookies } = this.props;
		cookies.set('token', '', { path: '/' });
	}

	handleSubmit = (event) => {
		event.preventDefault();
		this.setState({ loading: true });
		// const data = new FormData(event.currentTarget);
		// console.log({
		//     email: data.get('email'),
		//     password: data.get('password'),
		// });
		const { cookies } = this.props;
		let data = { login: '', password: '' };
		const loginInput = document.getElementById('login');
		const passwordInput = document.getElementById('password');
		if (loginInput != null || passwordInput != null) {
			data.login = loginInput.value;
			data.password = passwordInput.value;
			rest
				.login(data)
				.then((response) => {
					if (response.status != 200) {
						// display message for user => do best than alert
						this.setState({ error: true });
					} else {
						response.text().then((result) => {
							result = JSON.parse(result);
							cookies.set('token', result.token, { path: '/' });
							document.location.href = window.location.origin + '/stockage';
						});
					}				})
				.catch((err) => {
					console.err(err)
				}).finally(() => {
					this.setState({ loading: false });
				})
		}
	};

	render() {
		const { history } = this.props;
		const options = [
			{ value: 'FR', label: 'Français' },
			{ value: 'ENG', label: 'Anglais' },
		];
		return (
			<div>
				<Header cookies={this.props.cookies} changeCookie={this.props.changeCookie} />
				<Grid container component='main' sx={{ height: '92vh' }}>
					<CssBaseline />
					<Grid
						item
						xs={false}
						sm={4}
						md={7}
						sx={{
							backgroundImage: 'url(' + background + ')',
							backgroundRepeat: 'no-repeat',
							backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
							backgroundSize: 'cover',
							backgroundPosition: 'center',
						}}
					/>
					<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
						<Box
							sx={{
								my: 8,
								mx: 4,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
							}}
						>
							{this.state.error && (
								<Box sx={{ width: '100%', mb: 2 }} onClose={() => {}}>
									<Alert
										severity='error'
										action={
											<IconButton
												aria-label='close'
												color='inherit'
												size='small'
												onClick={() => {
													this.setState({ error: false });
												}}
											>
												<CloseIcon fontSize='inherit' />
											</IconButton>
										}
									>
										<AlertTitle>Erreur</AlertTitle>
										Login ou mot de passe incorrect
									</Alert>
								</Box>
							)}
							<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
								<LockOutlinedIcon />
							</Avatar>
							<Typography component='h1' variant='h5'>
								<FormattedMessage id='connexion.form.title' />
							</Typography>
							<Box component='form' onSubmit={this.handleSubmit} sx={{ mt: 3 }}>
								<TextField margin='normal' required fullWidth id='login' label={<FormattedMessage id='lycee.body.input4' />} name='login' autoComplete='email' autoFocus />
								<TextField
									margin='normal'
									required
									fullWidth
									name='password'
									label={<FormattedMessage id='lycee.body.input5' />}
									type='password'
									id='password'
									autoComplete='current-password'
								/>
								<FormControlLabel control={<Checkbox value='remember' color='primary' />} label={<FormattedMessage id='connexion.body.LabelRestConnect' />} />
								<Button type='submit' fullWidth variant='contained' size='large' disabled={this.state.loading} sx={{ mt: 3, mb: 2 }}>
									{!this.state.loading ? <ExitToAppOutlinedIcon sx={{ fontSize: 30, color: 'black' }} /> : <Spinner animation='grow' />}
								</Button>
								<Grid spacing={2} container>
									<Grid item xs={12} sm={6} md={6}>
										<Link href='#' variant='body2'>
											<FormattedMessage id='connexion.body.ForgetMDP' />
										</Link>
									</Grid>
									<Grid item xs={12} sm={6} md={6}>
										<Link variant='body2' onClick={() => history.push('/contact')} sx={{ cursor: 'pointer' }}>
											<FormattedMessage id='connexion.form.contactUs' />
										</Link>
									</Grid>
								</Grid>
								<Stack direction='row' spacing={4} divider={<Divider orientation='vertical' flexItem />} sx={{ display: 'flex', justifyContent: 'center', mt: '10%' }}>
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
							</Box>
						</Box>
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default withRouter(withCookies(Login));
