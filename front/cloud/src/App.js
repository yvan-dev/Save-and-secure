import { createTheme, ThemeProvider } from '@mui/material/styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { withCookies } from 'react-cookie';
import { IntlProvider } from 'react-intl';
import { withRouter } from 'react-router';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Contact from './components/contact';
import Faq from './components/FAQ';
import Faq1 from './components/faq_first';
import Footer from './components/footer';
import Header from './components/header';
import InfoElevesLycee from './components/infoElevesLycee';
import Login from './components/Login';
import SiteInfo from './components/main';
import Compte from './components/monCompte';
import Propos from './components/propos';
import Stockage from './components/Stockage';
import './css/main.css';
import en from './languages/en';
import fr from './languages/fr';
/* Emui-ui fonts */
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function Home(props) {
	return (
		<div>
			<Header cookies={props.cookies} changeCookie={props.changeCookie} />
			<SiteInfo />
			<Footer />
		</div>
	);
}
class App extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const { cookies } = this.props;
		cookies.set('language', 'FR', { path: '/' });
	}

	render() {
		const theme = createTheme();
		const { cookies } = this.props;
		const language = cookies.get('language') == 'ENG' ? en : fr;
		return (
			<ThemeProvider theme={theme}>
				<IntlProvider messages={language}>
					<Router>
						<Switch>
							<Route exact path='/'>
								<Home
									cookies={cookies}
									changeCookie={(langue) => {
										cookies.set('language', langue, { path: '/' });
									}}
								/>
							</Route>
							<Route exact path='/login'>
								<Login
									cookies={cookies}
									changeCookie={(langue) => {
										cookies.set('language', langue, { path: '/' });
									}}
								/>
							</Route>
							<Route exact path='/stockage'>
								<Stockage
									cookies={cookies}
									changeCookie={(langue) => {
										cookies.set('language', langue, { path: '/' });
									}}
								/>
							</Route>
							<Route exact path='/contact'>
								<Contact
									cookies={cookies}
									changeCookie={(langue) => {
										cookies.set('language', langue, { path: '/' });
									}}
								/>
							</Route>
							<Route exact path='/propos'>
								<Propos
									cookies={cookies}
									changeCookie={(langue) => {
										cookies.set('language', langue, { path: '/' });
									}}
								/>
							</Route>
							<Route exact path='/infoElevesLycee'>
								<InfoElevesLycee
									cookies={cookies}
									changeCookie={(langue) => {
										cookies.set('language', langue, { path: '/' });
									}}
								/>
							</Route>
							<Route exact path='/monCompte'>
								<Compte
									cookies={cookies}
									changeCookie={(langue) => {
										cookies.set('language', langue, { path: '/' });
									}}
								/>
							</Route>
							<Route exact path='/FAQ'>
								<Faq
									cookies={cookies}
									changeCookie={(langue) => {
										cookies.set('language', langue, { path: '/' });
									}}
								/>
							</Route>
							<Route exact path='/faq_first'>
								<Faq1
									cookies={cookies}
									changeCookie={(langue) => {
										cookies.set('language', langue, { path: '/' });
									}}
								/>
							</Route>
						</Switch>
					</Router>
				</IntlProvider>
			</ThemeProvider>
		);
	}
}

export default withCookies(withRouter(App));
