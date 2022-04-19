import React from 'react';
import Footer from './footer';
import img from '../images/image.png';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';
import img1 from '../images/connexion.jpg';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import { withCookies } from 'react-cookie';
import Spinner from 'react-bootstrap/Spinner';
import rest from '../API/rest';

class Connexion extends React.Component {
	constructor(props) {
		super(props);
		this.state = {loading: false};
	}

	componentDidMount() {
		const { cookies } = this.props;
		cookies.set('token', '', { path: '/' });
	}

    enterPress = (event) => {
        if (event.key === 'Enter') this.login();
    }

    login = () => {
        this.setState({ loading: true });
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
					// eslint-disable-next-line eqeqeq
					if (response.status != 200) {
						// display message for user => do best than alert
						alert("Erreur lors de l'authentification");
                    } else {
                        response.text().then((result) => {
                            result = JSON.parse(result);
							cookies.set('token', result.token, { path: '/' });
							document.location.href = 'http://localhost:3000/stockage';
						});
					}
                    this.setState({loading: false})
				})
				.catch((err) => {
                    this.setState({ loading: false });
				});
		}
	};

	render() {
		const options = [
			{ value: 'FR', label: 'Français' },
			{ value: 'ENG', label: 'Anglais' },
		];
		const { history } = this.props;
		return (
			<div>
				<header style={{ marginTop: 11 }}>
					<div>
						<span style={{ margin: 15 }}>
							<img src={img} alt='logos' width='8%' height='8%'></img>
						</span>
						<span style={{ marginLeft: '52%' }}>
							<span style={{ margin: 10, color: 'blue' }}>
								<label onClick={() => history.push('/contact')}>
									<FormattedMessage id='home.header.btnContact' />
								</label>
							</span>
							<span style={{ margin: 10, color: 'blue' }}>
								<label onClick={() => history.push('/propos')}>
									<FormattedMessage id='home.header.btnAbout' />
								</label>
							</span>
							<span style={{ margin: 10, color: 'blue' }}>
								<label onClick={() => history.push('/')}>
									<FormattedMessage id='propos.header.btnWelcome' />
								</label>
							</span>
							<span style={{ marginLeft: 10, color: 'blue' }}>
								<label onClick={() => history.push('/FAQ')}>FAQ</label>
							</span>
								<Select
									className='select'
									options={options}
									onChange={(event) => {
										this.props.changeCookie(event.value);
									}}
								/>
						</span>
					</div>
					<hr />
				</header>
				<div className='loginBody'>
					<img className='imgConnect' src={img1} alt='logos' width='40%' height='40%'></img>
					<div className='connect'>
						{/* <h4> */}
						<p style={{ fontWeight: 'bold', fontSize: '150%' }}>
							<FormattedMessage id='Votre.compte.S&S' />
						</p>
						{/* </h4> */}
						<img src={img} alt='logos' width='50%' height='50%' />
						<div className='inputLogin'>
							<FormattedMessage id='connexion.body.Input1'>{(placeholder) => <input id='login' class='form-control' type='text' placeholder={placeholder} />}</FormattedMessage>
							<FormattedMessage id='connexion.body.Input2'>
								{(placeholder) => <input id='password' class='form-control' type='password' onKeyDown={this.enterPress} placeholder={placeholder} />}
							</FormattedMessage>
							<div className='loginForgetMdpDiv'>
								<div style={{ display: 'flex', alignItems: 'center', marginBottom: '8%' }}>
									<input type='checkbox' name='stayConnect' />
									&nbsp;&nbsp;&nbsp;
									<label for='stayConnect' class='text-primary' className='label'>
										<FormattedMessage id='connexion.body.LabelRestConnect' />
									</label>
								</div>
								<b>
									<label style={{ color: 'blue', fontSize: '115%' }} onClick={() => history.push('/forgetPassword')}><FormattedMessage id='connexion.body.ForgetMDP' /></label>
									{/* <FormattedMessage id='connexion.body.ForgetMDP' /> */}
								</b>
							</div>
						</div>
						<Button disabled={this.state.loading} style={{ width: '80%' }} onClick={this.login}>
							{!this.state.loading ? (
								<b>
									<FormattedMessage id='connexion.body.btnConnect' />
								</b>
							) : (
								<Spinner animation='grow' />
							)}
						</Button>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

export default withRouter(withCookies(Connexion));
