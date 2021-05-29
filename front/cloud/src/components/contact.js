import React from 'react';
import Footer from './footer';
import img from '../images/image.png';
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import Select from 'react-select';
import Maps from './Maps.js';
import { FormattedMessage, injectIntl } from "react-intl";

const options = [
    { value: 'FR', label: 'Français' },
    { value: 'ENG', label: 'Anglais' },
]

function Contact(props){
    const history = useHistory();
    return(
        <div>
            <header>
                <span style={{ margin: 15 }}>
                    <img src={img} alt="logos" width="8%" height="8%"></img>
                </span>

                <span style={{ marginLeft: "52%" }}>
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
                    <span style={{ marginLeft:10}}>FAQ</span>
                    <span>
                        <Select
                            className="select"
                            options={options}
                            onChange={(event) => {props.changeCookie(event.value); console.log('cookie change : ', props.cookies)}}
                        />
                    </span>
                </span>    
                <hr/>
            </header>

            <body>
                <div className="TitleContact">
                    <h3><p><b><FormattedMessage id="contact.body.Title" /></b></p></h3>
                </div>  
                <br/> 
                <div className="sTitle"> 
                    <h6><p><b><FormattedMessage id="contact.body.H3" /></b></p></h6>
                </div>
                <br/>
                <div className="Inputs">
                    <input class = 'form-control' type="text" style={{ width:"35%", margin:"0.5%"}} placeholder="Nom"/> 
                    <input class = 'form-control' type="text" style={{ width:"35%", margin:"0.5%"}} placeholder="Prénom"/> 
                    <br/>
                    <br/>
                    <input class = 'form-control' type="text" style={{ width:"35%", margin:"0.5%"}} placeholder="Adresse mail"/> 
                    <input class = 'form-control' type="text" style={{ width:"35%", margin:"0.5%"}} placeholder="Téléphone"/> 
                    <br/>
                    <br/>
                    <input class = 'form-control' type="text" style={{ width:"71%", height:75}} placeholder="Message"/> 
                </div>
                <br/>
                <div className="envoyer">
                    <Button style={{width:250}}>
                        <b><FormattedMessage id="contact.body.btnSend" /></b>
                    </Button>
                </div>
                <br/>
                <div className="nousRendreVisite">
                    <h5><b><FormattedMessage id="contact.body.H5" /></b></h5>
                </div>
                <br/>
                <Maps/>
            </body>
            <br/>
            <Footer/>
        </div>
    )
}
export default Contact;