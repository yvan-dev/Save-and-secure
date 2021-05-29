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
import Form from 'react-bootstrap/Form';
import Maps from './Maps.js';

const options = [
    { value: 'FR', label: 'Français' },
    { value: 'ENG', label: 'Anglais' },
]

function Contact(){
    const history = useHistory();
    return(
        <div>
            <header>
                <span style={{ margin: 15 }}>
                    <img src={img} alt="logos" width="8%" height="8%"></img>
                </span>

                <span style={{ marginLeft: "52%" }}>
                    <span style={{ margin:10}}>
                        <Button onClick={() => history.push("/login")}>Connexion</Button>
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
                <hr/>
            </header>

            <body>
                <div className="TitleContact">
                    <h3><p><b>N'hésitez pas à nous contacter.</b></p></h3>
                </div>  
                <br/> 
                <div className="sTitle"> 
                    <h6><p><b>Contactez Nous</b></p></h6>
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
                        <b>Envoyer</b>
                    </Button>
                </div>
                <br/>
                <div className="nousRendreVisite">
                    <h5><b>Nous rendre visite ?</b></h5>
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