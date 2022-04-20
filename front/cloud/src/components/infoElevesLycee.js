import React from 'react';
import { FormattedMessage } from 'react-intl';
import SearchBar from 'react-js-search';
import { withRouter } from 'react-router';
import rest from '../API/rest';
import { styled } from '@mui/material/styles';
import {
	TableContainer,
	tableCellClasses,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Button,
	ListItemIcon,
	Divider,
	Stack,
	Typography,
	Grid,
	List,
	ListItemButton,
	ListItemText,
	TextField,
	InputAdornment,
	Box,
	Paper,
	Skeleton,
} from '@mui/material';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import BtnPrincipalPage from './btnPrincipalPage';
import Footer from './footer';
import PersonIcon from '@mui/icons-material/Person';
import HeaderHome from './HeaderHome';
import Lyceen from './lyceens';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: '#0658c2',
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));
class InfoElevesLycee extends React.Component {
	constructor(props) {
		super(props);
		this.state = { userId: null, users: null, textBtnId: 'lycee.body.bloc2.3' };
	}

	componentDidMount() {
		const { history } = this.props;
		if (history.location.state == null) history.push('/stockage');
		this.getAllUser();
	}

	addUser = (event) => {
		event.preventDefault();
		let data = { id: null, firstName: '', lastName: '', level: '', login: '', password: '', idSchool: 0, status: 'user' };
		const loginInput = document.getElementById('login');
		const passwordInput = document.getElementById('password');
		const firstNameInput = document.getElementById('firstName');
		const lastNameInput = document.getElementById('lastName');
		const levelInput = document.getElementById('level');
		const ageInput = document.getElementById('age');
		if (loginInput != null || passwordInput != null) {
			data.firstName = firstNameInput.value;
			data.lastName = lastNameInput.value;
			data.level = levelInput.value;
			data.login = loginInput.value;
			data.age = ageInput.value;
			data.password = passwordInput.value;
			data.idSchool = 1;
			if (this.state.userId === null) {
				rest
					.addUser(data)
					.then((response) => {
						if (response.status !== 200) {
							// display message for user => do best than alert
							alert("Erreur lors de l'ajout de l'étudiant! ");
						} else {
							this.getAllUser();
							alert(data.firstName + ' ajouté avec succès!');
						}
					})
					.catch((error) => {
						console.log('error : ', error);
					});
			} else {
				data.id = this.state.userId;
				rest
					.updateUser(data)
					.then((response) => {
						if (response.status !== 200) alert("Erreur lors de la modification de l'utilisateur!");
						else {
							this.getAllUser();
							alert(data.firstName + ' modifié avec succès!');
						}
					})
					.catch((error) => {
						console.log('error : ', error);
					})
					.finally(() => this.setState({ userId: null }));
			}
			this.resetForm();
		}
	};

	resetForm = () => {
		this.setState({ textBtnId: 'lycee.body.bloc2.3' });
		document.getElementById('login').value = '';
		document.getElementById('firstName').value = '';
		document.getElementById('lastName').value = '';
		document.getElementById('level').value = '';
		document.getElementById('age').value = '';
		document.getElementById('password').value = '';
	};

	loadUser = (user) => {
		this.setState({ userId: user.id, textBtnId: 'lycee.body.btnModify' });
		const loginInput = document.getElementById('login');
		const firstNameInput = document.getElementById('firstName');
		const lastNameInput = document.getElementById('lastName');
		const levelInput = document.getElementById('level');
		const ageInput = document.getElementById('age');
		if (user.login !== '' || user.login != null) {
			loginInput.value = user.login;
			loginInput.placeholder = user.login;
		}
		if (user.firstName !== '' || user.firstName != null) {
			firstNameInput.value = user.firstName;
			firstNameInput.placeholder = user.firstName;
		}
		if (user.lastName !== '' || user.lastName != null) {
			lastNameInput.value = user.lastName;
			lastNameInput.placeholder = user.lastName;
		}
		if (user.levelInput !== '' || user.level != null) {
			levelInput.value = user.level;
			levelInput.placeholder = user.level;
		}
		if (user.age !== '' || user.level != null) {
			ageInput.value = user.age;
			ageInput.placeholder = user.age;
		}
	};

	getAllUser = () => {
		rest.getAllUser().then((response) => {
			if (response.status === 200) {
				response.json().then((users) => {
					this.setState({ users });
				});
			}
		});
	};

	getUserByFirstOrLastNameOrLogin = (pattern) => {
		if (pattern === '') {
			this.getAllUser();
			return;
		}
		rest.getUserByFirstOrLastNameOrLogin(pattern).then((response) => {
			if (response.status === 200) {
				response.json().then((users) => {
					this.setState({ users });
				});
			}
		});
	};

	deleteUser = (id_user) => {
		rest.deleteUser(id_user).then((response) => {
			if (response.status === 200) {
				this.getAllUser();
				alert('élève supprimé');
			}
		});
	};

	render() {
		const { history, cookies } = this.props;
		return (
			<div>
				<HeaderHome user={history.location.state} />
				<Grid container spacing={{ sm: 4, md: 6 }}>
					<Grid item xs={12} sm={7} md={6} sx={{ display: 'flex', flexDirection: 'column' }}>
						<Box
							component={Paper}
							elevation={6}
							sx={{
								ml: 1,
								pl: 4,
								width: '100%',
								minHeight: '85vh',
								maxHeight: '100vh',
								borderColor: 'primary.main',
								opacity: [1, 1, 1],
							}}
						>
							<Grid container spacing={{ sm: 4, md: 6 }}>
								<Grid item>
									<Typography component='p' variant='h4'>
										Liste des élèves inscrits
									</Typography>
								</Grid>
								<Grid item xs={12} sm={12} md={12}>
									<TextField
										id='search'
										placeholder='Nom, prénom, login'
										label='Rechercher un étudiant'
										onChange={(event) => this.getUserByFirstOrLastNameOrLogin(event.target.value)}
										InputProps={{
											startAdornment: (
												<InputAdornment position='start'>
													<SearchOutlinedIcon />
												</InputAdornment>
											),
										}}
										variant='outlined'
										sx={{ width: '50%' }}
									/>
								</Grid>
								<Grid item>
									{this.state.users == null ? (
										<Skeleton animation='wave' variant='rectangular' width={600} height={600} />
									) : (
										<TableContainer component={Paper} elevation={6}>
											<Table sx={{ width: '100%' }} aria-label='customized table'>
												<TableHead>
													<TableRow>
														<StyledTableCell>
															<FormattedMessage id='lycee.body.input1' />
														</StyledTableCell>
														<StyledTableCell align='right'>
															<FormattedMessage id='lycee.body.input2' />
														</StyledTableCell>
														{/* {cookies.get('device') != null && cookies.get('device') === 'pc' && (
														<div> */}
														<StyledTableCell align='right'>
															<FormattedMessage id='lycee.body.input3' />
														</StyledTableCell>
														<StyledTableCell align='right'>
															<FormattedMessage id='lycee.body.age' />
														</StyledTableCell>
														<StyledTableCell align='right'>
															<FormattedMessage id='lycee.body.input4' />
														</StyledTableCell>
														<StyledTableCell align='right'>
															<FormattedMessage id='lycee.body.btnModify' />
														</StyledTableCell>
														<StyledTableCell align='right'>
															<FormattedMessage id='lycee.body.btnDelete' />
														</StyledTableCell>
														{/* </div>
													)} */}
													</TableRow>
												</TableHead>
												<TableBody>
													{this.state.users != null &&
														this.state.users.map((user) => (
															<StyledTableRow key={user.id}>
																<StyledTableCell component='th' scope='row'>
																	{user.lastName}
																</StyledTableCell>
																<StyledTableCell align='right'>{user.firstName}</StyledTableCell>
																{/* {cookies.get('device') != null && cookies.get('device') === 'pc' && (
																<div> */}
																<StyledTableCell align='right'>{user.level}</StyledTableCell>
																<StyledTableCell align='right'>{user.age}</StyledTableCell>
																<StyledTableCell align='right'>{user.login}</StyledTableCell>
																{/* </div>
															)} */}
																<StyledTableCell align='right'>
																	<Button color='info' onClick={() => this.loadUser(user)}>
																		<DriveFileRenameOutlineIcon fontSize='large' />
																	</Button>
																</StyledTableCell>
																<StyledTableCell align='right'>
																	<Button color='error' onClick={() => this.deleteUser(user.id)}>
																		<PersonRemoveIcon fontSize='large' />
																	</Button>
																</StyledTableCell>
															</StyledTableRow>
														))}
												</TableBody>
											</Table>
										</TableContainer>
									)}
								</Grid>
							</Grid>
						</Box>
					</Grid>
					<Grid item xs={12} sm={5} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
						<Grid container spacing={4}>
							<Grid item xs={12} sm={12} md={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
								<Typography component='p' variant='h4'>
									Ajouter un nouvel étudiant
								</Typography>
							</Grid>
							<Grid item xs={12} sm={12} md={12}>
								<Box component='form' onSubmit={this.addUser}>
									<Grid container spacing={2}>
										<Grid item xs={12} sm={12} md={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
											<TextField
												id='lastName'
												autoComplete={true}
												label={this.state.userId !== null ? '' : <FormattedMessage id='lycee.body.input1' />}
												helperText={this.state.userId === null ? '' : <FormattedMessage id='lycee.body.input1' />}
												variant='filled'
												sx={{ width: '80%' }}
											/>
										</Grid>
										<Grid item xs={12} sm={12} md={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
											<TextField
												id='firstName'
												autoComplete={true}
												label={this.state.userId !== null ? '' : <FormattedMessage id='lycee.body.input2' />}
												helperText={this.state.userId === null ? '' : <FormattedMessage id='lycee.body.input2' />}
												variant='filled'
												sx={{ width: '80%' }}
											/>
										</Grid>
										<Grid item xs={12} sm={12} md={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
											<TextField
												id='level'
												autoComplete={true}
												label={this.state.userId !== null ? '' : <FormattedMessage id='lycee.body.input3' />}
												helperText={this.state.userId === null ? '' : <FormattedMessage id='lycee.body.input3' />}
												variant='filled'
												sx={{ width: '80%' }}
											/>
										</Grid>
										<Grid item xs={12} sm={12} md={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
											<TextField
												id='age'
												type='number'
												autoComplete={true}
												label={this.state.userId !== null ? '' : <FormattedMessage id='lycee.body.age' />}
												helperText={this.state.userId === null ? '' : <FormattedMessage id='lycee.body.age' />}
												variant='filled'
												sx={{ width: '80%' }}
											/>
										</Grid>
										<Grid item xs={12} sm={12} md={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
											<TextField
												id='login'
												autoComplete={true}
												label={this.state.userId !== null ? '' : <FormattedMessage id='lycee.body.input4' />}
												helperText={this.state.userId === null ? '' : <FormattedMessage id='lycee.body.input4' />}
												variant='filled'
												sx={{ width: '80%' }}
											/>
										</Grid>
										<Grid item xs={12} sm={12} md={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
											<TextField
												id='password'
												type='password'
												autoComplete={true}
												label={this.state.userId !== null ? '' : <FormattedMessage id='lycee.body.input5' />}
												helperText={this.state.userId === null ? '' : <FormattedMessage id='lycee.body.input5' />}
												variant='filled'
												sx={{ width: '80%' }}
											/>
										</Grid>
										<Grid item xs={12} sm={12} md={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
											<Button color='primary' variant='outlined' onClick={this.addUser} sx={{ width: '80%' }}>
												<FormattedMessage id={this.state.textBtnId} />
											</Button>
										</Grid>
										<Grid item xs={12} sm={12} md={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
											<Button color='error' variant='outlined' onClick={this.resetForm} sx={{ width: '80%' }}>
												Annuler
											</Button>
										</Grid>
									</Grid>
								</Box>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default withRouter(InfoElevesLycee);
