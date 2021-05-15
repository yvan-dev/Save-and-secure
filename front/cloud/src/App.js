import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/header';
import SiteInfo from './components/main';
import Footer from './components/footer';
import Connexion from './components/connexion';
import Stockage from './components/Stockage';
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
        <Route exact path="/login/stockage">
          <Stockage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
