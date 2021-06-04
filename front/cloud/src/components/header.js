import React , { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import { ButtonToolbar } from "react-bootstrap";
import { FormattedMessage, injectIntl } from "react-intl";
import { useCookies} from 'react-cookie';
import img from '../images/image.png';
import img1 from '../images/image.png';
import Select from 'react-select';
import Form from 'react-bootstrap/Form';

const options = [
  { value: 'FR', label: 'Français' },
  { value: 'ENG', label: 'Anglais' },
]

function Header(props) {
  const history = useHistory();
  return (
    <div>
      <span style={{ margin: 15 }}>
        <img src={img} alt="logos" width="8%" height="8%"></img>
      </span>

      <span style={{ marginLeft: "47%" }}>
        <span style={{ margin:10}}>
          <Button onClick={() => history.push("/login")}>
            <FormattedMessage id="home.header.btnConnectLabel" />
          </Button>
        </span>
        <span style={{ margin:10, color:"blue"}}>
          <label onClick={() => history.push("/contact")}><FormattedMessage id="home.header.btnContact" /></label>
        </span>
        <span style={{ margin:10,color:"blue"}}>
          <label onClick={() => history.push("/propos")}><FormattedMessage id="home.header.btnAbout" /></label>
        </span>
        <span style={{ marginLeft: 9 }}><label>FAQ</label></span>
        <span>
          <Select
            className="select"
            options={options}
            onChange={(event) => {props.changeCookie(event.value);}}
          />
        </span>
      </span>
      <hr/>
    </div>
  );
};
export default injectIntl(Header);