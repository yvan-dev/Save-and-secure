import React from 'react';
import Button from "react-bootstrap/Button";
import { FormattedMessage } from "react-intl";
import SearchBar from 'react-js-search';
import { withRouter } from 'react-router';
import rest from '../API/rest';
import BtnPrincipalPage from './btnPrincipalPage';
import Footer from './footer';
import HeaderHome from './HeaderHome';
import Lyceen from './lyceens';

const options = [
    { value: 'FR', label: 'Français' },
    { value: 'ENG', label: 'Anglais' },
]
class InfoElevesLycee extends React.Component {
	constructor(props) {
		super(props);
		this.state = { userId: null, users: null, textBtn: 'Ajouter' };
	}

	addUser = () => {
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
			if (this.state.textBtn === 'Ajouter') {
				rest
					.addUser(data)
					.then((response) => {
						if (response.status !== 200) {
							// display message for user => do best than alert
							alert("Erreur lors de l'ajout du lycéen! ");
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
					});
			}
		}
	};

	loadUser = (user) => {
		this.setState({ userId: user.id, textBtn: 'Modifier' });
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
			firstNameInput.placeholder = user.placeholder;
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
			// eslint-disable-next-line eqeqeq
			if (response.status == 200) {
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
			// eslint-disable-next-line eqeqeq
			if (response.status == 200) {
				response.json().then((users) => {
					this.setState({ users });
				});
			}
		});
	};

	componentDidMount() {
		const { history } = this.props;
		if (history.location.state == null) history.push('/stockage');
		this.getAllUser();
	}

	render() {
		const { history } = this.props;
		return (
			<div>
				<HeaderHome user={history.location.state} />
				<body>
					<div className='myDocument'>
						<BtnPrincipalPage page={'infoEleve'} />
					</div>
					<br />
					<div className='bloc'>
						<div className='titleListeEleve'>
							<h4>
								<p>
									<b>
										<FormattedMessage id='lycee.body.titleListStudent' />
									</b>
								</p>
							</h4>
						</div>
						<div className='searchEleve'>
							<SearchBar
								onSearchTextChange={(term, hits) => {
									this.getUserByFirstOrLastNameOrLogin(term, hits);
								}}
								onSearchButtonClick={this.getUserByFirstOrLastNameOrLogin}
								placeHolderText={'Rechercher'}
								data={this.state.users}
							/>
						</div>
						<div className='tcadre'>
							<div className='informationsEvele'>
								<br />
								{this.state.users != null &&
									this.state.users.map((user) => {
										return <Lyceen refresh={this.getAllUser} loadUser={this.loadUser} user={user} />;
									})}
							</div>
						</div>
						<div>
							<div className='bloc2'>
								<h4>
									<p>
										<b>
											<FormattedMessage id='lycee.body.bloc2.1' />
											&nbsp;
											<FormattedMessage id='lycee.body.bloc2.2' />
											&nbsp;
											<FormattedMessage id='lycee.body.bloc2.3' />
											&nbsp;
											<FormattedMessage id='lycee.body.bloc2.4' />
											&nbsp;
											<FormattedMessage id='lycee.body.bloc2.5' />
											<br></br>
											<FormattedMessage id='lycee.body.bloc2.6' />
										</b>
									</p>
								</h4>
							</div>
							<div className='mesInputs'>
								<FormattedMessage id='lycee.body.input1'>
									{(placeholder) => <input id='lastName' class='form-control' style={{ width: '60%', margin: '2%' }} type='text' placeholder={placeholder} />}
								</FormattedMessage>
								<br />
								<FormattedMessage id='lycee.body.input2'>
									{(placeholder) => <input id='firstName' class='form-control' style={{ width: '60%', margin: '2%' }} type='text' placeholder={placeholder} />}
								</FormattedMessage>
								<br />
								<FormattedMessage id='lycee.body.input3'>
									{(placeholder) => <input id='level' class='form-control' style={{ width: '60%', margin: '2%' }} type='text' placeholder={placeholder} />}
								</FormattedMessage>
								<br />
								<FormattedMessage id='lycee.body.age'>
									{(placeholder) => <input id='age' class='form-control' style={{ width: '60%', margin: '2%' }} type='text' placeholder={placeholder} />}
								</FormattedMessage>
								<br />
								<FormattedMessage id='lycee.body.input4'>
									{(placeholder) => <input id='login' class='form-control' style={{ width: '60%', margin: '2%' }} type='text' placeholder={placeholder} />}
								</FormattedMessage>
								<br />
								<FormattedMessage id='lycee.body.input5'>
									{(placeholder) => <input id='password' class='form-control' style={{ width: '60%', margin: '2%' }} type='text' placeholder={placeholder} />}
								</FormattedMessage>
							</div>
							<br />
							<div className='Ajouter'>
								<Button style={{ width: 240 }} onClick={this.addUser}>
									<b>{this.state.textBtn}</b>
								</Button>
							</div>
						</div>
					</div>
				</body>
				<br />
				<Footer />
			</div>
		);
	}
}

export default withRouter(InfoElevesLycee);