import React from 'react';
import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ContactUs from "./components/email";
import Header from "./components/header";
import SiteInfo from "./components/main";
import Footer from "./components/footer";
import Connexion from "./components/connexion";
import Stockage from "./components/Stockage";
import Contact from "./components/contact";
import Propos from "./components/propos";
import InfoElevesLycee from "./components/infoElevesLycee";
import Compte from "./components/monCompte";
import Faq from "./components/FAQ";
import Faq1 from "./components/faq_first";
import ReactDOM from "react-dom";
import { IntlProvider, injectIntl } from "react-intl";
import { Cookies, useCookies, withCookies, CookiesProvider } from "react-cookie";
import "./css/main.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { withRouter } from 'react-router';
import fr from "./languages/fr";
import en from "./languages/en";

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
  constructor(props){
    super(props);
  }

  componentDidMount() {
    const { cookies } = this.props;
    cookies.set('language', 'FR', { path: '/' });
  }

  render() {
    const { cookies } = this.props;
    const language = cookies.get("language") == "ENG" ? en : fr;
    return (
      <IntlProvider messages={language}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home cookies={cookies} changeCookie={(langue) => { cookies.set('language', langue, { path: '/' })}}/>
          </Route>
          <Route exact path="/login">
            <Connexion cookies={cookies} changeCookie={(langue) => { cookies.set('language', langue, { path: '/' })}}/>
          </Route>
          <Route exact path="/stockage">
            <Stockage cookies={cookies} changeCookie={(langue) => { cookies.set('language', langue, { path: '/' })}}/>
          </Route>
          <Route exact path="/contact">
            <Contact cookies={cookies} changeCookie={(langue) => { cookies.set('language', langue, { path: '/' })}}/>
          </Route>
          <Route exact path="/propos">
            <Propos cookies={cookies} changeCookie={(langue) => { cookies.set('language', langue, { path: '/' })}}/>
          </Route>
          <Route exact path="/infoElevesLycee">
            <InfoElevesLycee cookies={cookies} changeCookie={(langue) => { cookies.set('language', langue, { path: '/' })}}/>
          </Route>
          <Route exact path="/monCompte">
            <Compte cookies={cookies} changeCookie={(langue) => { cookies.set('language', langue, { path: '/' })}}/>
          </Route>
          <Route exact path="/FAQ">
            <Faq cookies={cookies} changeCookie={(langue) => { cookies.set('language', langue, { path: '/' })}}/>
          </Route>
          <Route exact path="/faq_first">
            <Faq1 cookies={cookies} changeCookie={(langue) => { cookies.set('language', langue, { path: '/' })}}/>
          </Route>
        </Switch>
      </Router>
    </IntlProvider>
    )
  }
}

export default withCookies(withRouter(App));