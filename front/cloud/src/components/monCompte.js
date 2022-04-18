import React from 'react';
import Footer from './footer';
import img from '../images/image.png';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import { ButtonToolbar } from 'react-bootstrap';
import Select from 'react-select';
import HeaderHome from './HeaderHome';
import BtnPrincipalPage from './btnPrincipalPage';
import { FormattedMessage, injectIntl } from 'react-intl';
import rest from '../API/rest';
import { withRouter } from 'react-router';
import { Box } from '@mui/system';
import { Typography, Paper, Grid } from '@mui/material';

const options = [
	{ value: 'FR', label: 'Français' },
	{ value: 'ENG', label: 'Anglais' },
];
class Compte extends React.Component {
	constructor(props) {
		super(props);
		this.state = { user: null };
	}

	componentDidMount() {
		this.getUserLogged();
	}

	getUserLogged = async () => {
		try {
			const response = await rest.getUserLogged();
			this.setState({ user: await response.json() });
		} catch (error) {
			alert('Erreur lors de la récupération de vos informations');
		}
	};

	render() {
		const { history } = this.props;
		return (
			<div>
				<HeaderHome user={history.location.state} />
				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<Box
						component={Paper}
						elevation={12}
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							width: '80%',
							minHeight: '85vh',
							maxHeight: '100vh',
							borderColor: 'primary.main',
							opacity: [1, 1, 1],
						}}
					>
						<Grid
							container
							spacing={{ xs: 4, sm: 6, md: 8 }}
							xs={12}
							sm={10}
							md={8}
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<Grid item xs={12} sm={12} md={12}>
								<Typography component='p' variant='h4'>
									Vos informations personnelles
								</Typography>
							</Grid>
							<Grid item xs={12} sm={12} md={12}>
								<Grid container spacing={12} direction='row'>
									<Grid item xs={6} sm={6} md={6}>
										<Typography component='p' variant='h5'>
											Nom
										</Typography>
									</Grid>
									<Grid item xs={6} sm={6} md={6}>
										<Typography component='p' variant='body1' color='primary'>
											{this.state.user != null && this.state.user.firstName}
										</Typography>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12} sm={12} md={12}>
								<Grid container spacing={12} direction='row'>
									<Grid item xs={6} sm={6} md={6}>
										<Typography component='p' variant='h5'>
											Prénom
										</Typography>
									</Grid>
									<Grid item xs={6} sm={6} md={6}>
										<Typography component='p' variant='body1' color='primary'>
											{this.state.user != null && this.state.user.lastName}
										</Typography>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12} sm={12} md={12}>
								<Grid container spacing={12} direction='row'>
									<Grid item xs={6} sm={6} md={6}>
										<Typography component='p' variant='h5'>
											Age
										</Typography>
									</Grid>
									<Grid item xs={6} sm={6} md={6}>
										<Typography component='p' variant='body1' color='primary'>
											{this.state.user != null && this.state.user.age}
										</Typography>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12} sm={12} md={12}>
								<Grid container spacing={12} direction='row'>
									<Grid item xs={6} sm={6} md={6}>
										<Typography component='p' variant='h5'>
											Niveau
										</Typography>
									</Grid>
									<Grid item xs={6} sm={6} md={6}>
										<Typography component='p' variant='body1' color='primary'>
											{this.state.user != null && this.state.user.level}
										</Typography>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12} sm={12} md={12}>
								<Grid container spacing={12} direction='row'>
									<Grid item xs={6} sm={6} md={6}>
										<Typography component='p' variant='h5'>
											Login
										</Typography>
									</Grid>
									<Grid item xs={6} sm={6} md={6}>
										<Typography component='p' variant='body1' color='primary'>
											{this.state.user != null && this.state.user.login}
										</Typography>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Box>
				</div>
			</div>
		);
	}
}

export default withRouter(Compte);
