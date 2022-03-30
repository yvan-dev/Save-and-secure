import React from 'react';
import { FormattedMessage, injectIntl } from "react-intl";
import img from '../images/image.png';
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import Select from 'react-select';
import Footer from './footer';

const options = [
    { value: 'FR', label: 'Français' },
    { value: 'ENG', label: 'Anglais' },
]

const Faq = (props) => {
    const history = useHistory();
    return (
        <div>
            <header>
                <span style={{ margin: 15 }}>
                    <img src={img} alt="logos" width="8%" height="8%"></img>
                </span>
                <span style={{ marginLeft: "55%" }}>
                    <span style={{ margin:10}}>
                        <Button onClick={() => history.push("/login")}>
                            <FormattedMessage id="contact.header.btnConnectLabel" />
                        </Button>
                    </span>
                    <span style={{ margin:10,color:"blue"}}>
                        <label onClick={() => history.push("/propos")}><FormattedMessage id="contact.header.btnAbout" /></label>
                    </span>
                    <span style={{ margin:10,color:"blue"}}>
                        <label onClick={() => history.push("/")}><FormattedMessage id="contact.header.btnWelcome" /></label>
                    </span>
                    <span>
                        <Select
                            className="select"
                            options={options}
                            onChange={(event) => {props.changeCookie(event.value);}}
                        />
                    </span>
                </span>    
                <hr/>
            </header>
        <div>
            <span style={{color: 'blue'}}><label onClick={() => history.push("/faq_first")}>Comment se connecter</label></span>
        </div>
    </div>
    
    )
}

export default Faq; 