import React from 'react';
import Footer from './footer';
import Header from './header';
import img from '../images/image.png';
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import { ButtonToolbar } from "react-bootstrap";
import Select from 'react-select';
import img1 from '../images/connexion.jpg';
import Form from 'react-bootstrap/Form'


const options = [
    { value: 'FR', label: 'Français' },
    { value: 'ENG', label: 'Anglais' },
  ]

function Connexion(){
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
                            <label onClick={() => history.push("/contact")}>Nous contacter</label>
                        </span>
                        <span style={{ margin:10,color:"blue"}}>
                            <label onClick={() => history.push("/propos")}>A propos</label>
                        </span>
                        <span style={{ margin:10,color:"blue"}}>
                            <label onClick={() => history.push("/")}>Accueil</label>
                        </span>
                        <span style={{ marginLeft:10}}>FAQ</span>
                        <span>
                        <Select
                            className="select"
                            options={options}/>
                        </span>
                    </span>    
                </div>   
                <hr/>
            </header>
            <div className="connect">   
                <h4><p><b>Votre compte S&S</b></p></h4>
                <div className="inputLogin">
                    <input class='form-control' placeholder="email" type="text"/><br/>
                    <br/>
                    <input class='form-control' placeholder="mot de passe" type="text"/><br/>
                    <br/>
                    <div className="label">
                        <input type='radio'/><label class="text-primary">&nbsp;&nbsp;Restez connecté</label><br/><br/>
                    </div> 
                    <div className="mdp">   
                        <span ><b>Mot de passe oublié?</b></span>
                    </div> 
                </div>
                <Button style={{width:250}} onClick={() => history.push("/stockage")}><b>Me connecter</b></Button>
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