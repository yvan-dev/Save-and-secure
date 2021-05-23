import React from 'react';
import Footer from './footer';
import img from '../images/image.png';
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import { ButtonToolbar } from "react-bootstrap";
import Select from 'react-select';
import Form from 'react-bootstrap/Form';

const options = [
    { value: 'FR', label: 'Français' },
    { value: 'ANG', label: 'Anglais' },
]

function Compte(){
    const history = useHistory();
    return(
        <div>
            <header style={{marginTop:11}}>
                <div>
                    <span style={{ margin: 15 }}>
                        <img src={img} alt="logos" width="8%" height="8%"></img>
                    <span style={{ marginLeft: 870 }}>
                        <Button onClick={() => history.push("/login")}>Déconnexion</Button>
                    </span>
                      <Select
                        className="select"
                        options={options}/>
                    </span>   
                </div>   
            </header>
            <hr/> 
            
            <body>
                <div>
                    <button class="rounded-pill" style={{ width:170, height:40, border:1, margin:10}}><p><span style={{ fontSize: 20}}>#</span><b>&nbsp;&nbsp;&nbsp;Mes documents</b></p></button>
                </div>  
                <div className="etudiant">
                    <button class="rounded-pill" style={{ width:170, height:36, border:1, margin:8}} onClick={() => history.push("/infoElevesLycee")}><p><b>Lycée</b></p></button>
                </div>  
                <div>
                    <div className="infoPerso"><h3><p><b>Informations personnelles</b></p></h3></div>
                    <div>
                        <div className="tableau-cadre">
                            <section class="cadre">
                                <p><b>Nom</b></p>
                                <p><b>Prénom</b></p>
                                <p><b>Ecole</b></p>
                                <p><b>Profession</b></p>
                                <p><b>Ville</b></p>
                                <br/>
                                <p><b>Mot&nbsp;de&nbsp;passe&nbsp;oublié?</b></p>
                            </section>
                        </div>
                    </div>
                </div>
            </body>
            <Footer/>
        </div>
    )
} 
export default Compte;