import React from 'react';
import Footer from './footer';
import img from '../images/image.png';
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import Select from 'react-select';
import img1 from '../images/connexion.jpg';
import { FormattedMessage, injectIntl } from "react-intl";


const options = [
    { value: 'FR', label: 'Français' },
    { value: 'ENG', label: 'Anglais' },
  ]

function Connexion(props){
    const history = useHistory();
    return(
        <div>
            <header style={{marginTop:11}}>
                <div>
                    <span style={{ margin: 15 }}>
                        <img src={img} alt="logos" width="8%" height="8%"></img>
                    </span>
                    <span style={{ marginLeft:"52%"}}>
                        <span style={{ margin:10,color:"blue"}}>
                            <label onClick={() => history.push("/contact")}><FormattedMessage id="home.header.btnContact" /></label>
                        </span>
                        <span style={{ margin:10,color:"blue"}}>
                            <label onClick={() => history.push("/propos")}><FormattedMessage id="home.header.btnAbout" /></label>
                        </span>
                        <span style={{ margin:10,color:"blue"}}>
                            <label onClick={() => history.push("/")}><FormattedMessage id="propos.header.btnWelcome" /></label>
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
                </div>   
                <hr/>
            </header>
            <div className="connect">   
                <h4><p><b><FormattedMessage id="Votre compte S&S" /></b></p></h4>
                <div className="inputLogin">
                    <input class='form-control' placeholder="email" type="text"/><br/>
                    <br/>
                    <input class='form-control' placeholder="mot de passe" type="text"/><br/>
                    <br/>
                    <div className="label">
                        <input type='radio'/><label class="text-primary">&nbsp;&nbsp;<FormattedMessage id="connexion.body.LabelRestConnect" /></label><br/><br/>
                    </div> 
                    <div className="mdp">   
                        <span ><b><FormattedMessage id="connexion.body.ForgetMDP" /></b></span>
                    </div> 
                </div>
                <Button style={{width:250}} onClick={() => history.push("/stockage")}><b><FormattedMessage id="connexion.body.btnConnect" /></b></Button>
            </div>     
            <div className="imgConnect" style={{marginTop:110}}>
                <img src={img1} alt="logos" width="35%" height="35%"></img> 
            </div>
            <br/>
            <br/>
            <br/>
            <Footer/>
        </div>
    )
}

export default Connexion; 