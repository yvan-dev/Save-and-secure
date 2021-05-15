import React from "react";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import { ButtonToolbar } from "react-bootstrap";
import img from '../images/image.png';
import img1 from '../images/image.png';
import Select from 'react-select';
import Form from 'react-bootstrap/Form';

const options = [
  { value: 'FR', label: 'Français' },
  { value: 'ENG', label: 'Englais' },
]

function Header() {
  const history = useHistory();
  return (
    <div>
      <span style={{ margin: 15 }}>
        <img src={img} alt="logos" width="7%" height="7%"></img>
      </span>
      <span>
        <a href="#"><label>Nous contacter</label></a>
      </span>
      <span style={{ marginLeft: "  56%" }}>
        <span style={{ margin: 10 }}>
          <Button onClick={() => history.push("/login")}>Connexion</Button>
        </span>
        <span style={{ margin: 15 }}><label>FAQ</label></span>
        <span>
          <Select
            className="select"
            options={options}/>
        </span>
      </span>
      <hr></hr>
    </div>
  );
};
export default Header;