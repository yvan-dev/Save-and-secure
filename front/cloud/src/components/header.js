import React from "react";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import { ButtonToolbar } from "react-bootstrap";
import img from '../images/image.png';
import Select from 'react-select'

const options = [
  { value: 'FR', label: 'Français' },
  { value: 'ENG', label: 'Englais' },
]

function Header() {
  const history = useHistory();
  return (
    <div>
      <span style={{ margin: 15 }}>
        <img src={img} alt="logos" width="5%" height="5%"></img>
      </span>
      <span>
        <a href="#">Nous contacter</a>
      </span>
      <span style={{ marginLeft: "50%" }}>
        <span style={{ margin: 10 }}>
          <Button onClick={() => history.push("/login")}>Connexion</Button>
        </span>
        <span>
          <Button>Inscription</Button>
        </span>
        <span style={{ margin: 15 }}>FAQ</span>
        <span >
          <Select
            className="select"
            options={options}
          />
          {/* <select style={{width: 75}}>
            <option selected>Langue</option>
            <option value="1">Français</option>
            <option value="2">Anglais</option>
          </select> */}
        </span>
      </span>
      <hr></hr>
    </div>
  );
};
export default Header;