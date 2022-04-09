import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CloudDoneOutlinedIcon from '@mui/icons-material/CloudDoneOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { FormattedMessage, injectIntl } from 'react-intl';
import Spinner from 'react-bootstrap/Spinner';
import { withCookies } from 'react-cookie';
import { withRouter } from 'react-router';
import logo from '../images/s&s_logo.png';
import background from '../images/connexion.jpg';
import rest from '../API/rest';

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
		const { history } = this.props;
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
							document.location.href = 'http://localhost:3000/stockage';
						});
					}
					this.setState({ loading: false });
				})
				.catch((err) => {
					this.setState({ loading: false });
				});
		}
	};

	render() {
		const theme = createTheme();
		const { history } = this.props;
		const options = [
			{ value: 'FR', label: 'Français' },
			{ value: 'ENG', label: 'Anglais' },
		];
		return (
			<ThemeProvider theme={theme}>
				{/* rgba(31, 131, 231, 0.452) */}
				<Grid container sx={{ bgcolor: 'white', height: '8vh' }}>
					<Grid container xs={4} sm={4} md={4}>
						<Grid item xs={12} sm={12} md={12}>
							<img src={logo} style={{ height: 80, width: 120, marginLeft: 2 }} />
						</Grid>
					</Grid>
					<Grid container xs={8} sm={8} md={8} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
						<Grid item xs={12} sm={6} md={3}>
							<Button onClick={() => history.push('/contact')}>
								<Typography component='h1' variant='h6'>
									<FormattedMessage id='home.header.btnContact' />
								</Typography>
							</Button>
							{/* <Typography component='h1' variant='h6' sx={{ cursor: 'pointer' }} onClick={() => history.push('/contact')}>
								<FormattedMessage id='home.header.btnContact' />
							</Typography> */}
						</Grid>
						<Grid item xs={12} sm={6} md={2}>
							<Button onClick={() => history.push('/propos')}>
								<Typography component='h1' variant='h6'>
									<FormattedMessage id='home.header.btnAbout' />
								</Typography>
							</Button>
						</Grid>
						<Grid item xs={12} sm={6} md={2}>
							<Button onClick={() => history.push('/')}>
								<Typography component='h1' variant='h6'>
									<FormattedMessage id='propos.header.btnWelcome' />
								</Typography>
							</Button>
						</Grid>
						<Grid item xs={12} sm={6} md={2}>
							<Button onClick={() => history.push('/FAQ')}>
								<Typography component='h1' variant='h6'>
									FAQ
								</Typography>
							</Button>
						</Grid>
						<Grid item xs={12} sm={6} md={3}>
							<FormControl variant='filled' sx={{ m: 1, width: '90%' }}>
								<InputLabel id='language'>
									<Typography component='h1' variant='h6'>
										Langue
									</Typography>
								</InputLabel>
								<Select
									defaultValue={'FR'}
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
							<Box component='form' noValidate onSubmit={this.handleSubmit} sx={{ mt: 3 }}>
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
								<Grid container>
									<Grid item xs>
										<Link href='#' variant='body2'>
											<FormattedMessage id='connexion.body.ForgetMDP' />
										</Link>
									</Grid>
									<Grid item>
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
										<LinkedInIcon/>
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
			</ThemeProvider>
		);
	}
}

export default withRouter(withCookies(Login));
