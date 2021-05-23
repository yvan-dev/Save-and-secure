import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/header';
import SiteInfo from './components/main';
import Footer from './components/footer';
import Connexion from './components/connexion';
import Stockage from './components/Stockage';
import Contact from './components/contact';
import Propos from './components/propos';
import InfoElevesLycee from './components/infoElevesLycee'
import Compte from './components/monCompte';
import './css/main.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function Home() {
  return (
    <div>
      <Header />
      <SiteInfo />
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Connexion />
        </Route>
        <Route exact path="/stockage">
          <Stockage />
        </Route>
        <Route exact path="/contact">
          <Contact />
        </Route>
        <Route exact path="/propos">
          <Propos />
        </Route>
        <Route exact path="/infoElevesLycee">
          <InfoElevesLycee />
        </Route>
        <Route exact path="/monCompte">
          <Compte />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
