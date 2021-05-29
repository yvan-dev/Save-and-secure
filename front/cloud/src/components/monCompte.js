import React from 'react';
import Footer from './footer';
import img from '../images/image.png';
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import { ButtonToolbar } from "react-bootstrap";
import Select from 'react-select';
import Form from 'react-bootstrap/Form';
import { FormattedMessage, injectIntl } from "react-intl";

const options = [
    { value: 'FR', label: 'Français' },
    { value: 'ANG', label: 'Anglais' },
]

function Compte(props){
    const history = useHistory();
    return(
        <div>
            <header style={{marginTop:11}}>
                <div>
                    <span style={{ margin: 15 }}>
                        <img src={img} alt="logos" width="8%" height="8%"></img>
                    <span style={{ marginLeft: 870 }}>
                        <Button onClick={() => history.push("/login")}><FormattedMessage id="stockage.header.btnDisconnect" /></Button>
                    </span>
                    <Select
                        className="select"
                        options={options}
                        onChange={(event) => {props.changeCookie(event.value); console.log('cookie change : ', props.cookies)}}
                    />
                    </span>   
                </div>   
            </header>
            <hr/> 
            
            <body>
                <div>
                    <button class="rounded-pill" style={{ width:170, height:40, border:1, margin:7}}><p><span style={{ fontSize: 20}}>#</span><b>&nbsp;&nbsp;&nbsp;<FormattedMessage id="stockage.body.btnDocuments" /></b></p></button>
                </div>  
                <div className="etudiant">
                    <button class="rounded-pill" style={{ width:170, height:36, border:1, margin:7}} onClick={() => history.push("/infoElevesLycee")}><p><b><FormattedMessage id="stockage.body.btnLycee" /></b></p></button>
                </div>  
                <div>
                    <div className="infoPerso"><h3><p><b><FormattedMessage id="monCompte.body.infoPerso" /></b></p></h3></div>
                    <div>
                        <div className="tableau-cadre">
                            <section class="cadre">
                                <br/>
                                <br/>
                                <p><b><FormattedMessage id="lycee.body.Name" />:</b></p>
                                <p><b><FormattedMessage id="lycee.body.firstName" />:</b></p>
                                <p><b><FormattedMessage id="monCompte.body.school" />:</b></p>
                                <p><b><FormattedMessage id="monCompte.body.job" />:</b></p>
                                <p><b><FormattedMessage id="monCompte.body.city" />:</b></p>
                                <br/>
                                <p><b><FormattedMessage id="monCompte.body.1" />&nbsp;<FormattedMessage id="monCompte.body.2" />&nbsp;<FormattedMessage id="monCompte.body.3" />&nbsp;<FormattedMessage id="monCompte.body.4" /></b></p>
                            </section>
                        </div>
                    </div>
                </div>
            </body>
            <br/>
            <Footer/>
        </div>
    )
} 
export default Compte;