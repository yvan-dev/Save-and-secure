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
        <img src={img} alt="logos" width="8%" height="8%"></img>
      </span>

      <span style={{ marginLeft: "49%" }}>
        <span style={{ margin:10}}>
          <Button onClick={() => history.push("/login")}>Connexion</Button>
        </span>
        <span style={{ margin:10, color:"blue"}}>
          <label onClick={() => history.push("/contact")}>Nous contacter</label>
        </span>
        <span style={{ margin:10,color:"blue"}}>
          <label onClick={() => history.push("/propos")}>à propos</label>
        </span>
        <span style={{ marginLeft: 9 }}><label>FAQ</label></span>
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