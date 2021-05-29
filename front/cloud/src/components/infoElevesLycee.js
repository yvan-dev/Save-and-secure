import React from 'react';
import Footer from './footer';
import Header from './header';
import img from '../images/image.png';
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import { ButtonToolbar } from "react-bootstrap";
import Select from 'react-select';
import Form from 'react-bootstrap/Form';
import imageLogos from '../images/loupe.PNG';
import image from '../images/index.png';

const options = [
    { value: 'FR', label: 'Français' },
    { value: 'ANG', label: 'Anglais' },
]

function InfoElevesLycee(){
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
                    <button class="rounded-pill" style={{width:170, height:40, border:1, marginTop:10, marginLeft:"1%"}}><p><span style={{fontSize: 20}}>#</span><b>&nbsp;&nbsp;Mes documents</b></p></button>
                </div>  
                <div className="monCompte">
                    <button class="rounded-pill" style={{width:170, height:37, border:1, margin:10}} onClick={() => history.push("/monCompte")}><p><b>Mon compte</b></p></button>
                </div>  
                <div className="etudiant">
                    <button class="rounded-pill" style={{width:170, height:36, border:1, margin:6}} onClick={() => history.push("/infoElevesLycee")}><p><b>Lycée</b></p></button>
                </div>  

                <div className="bloc">
                    <div className="titleListeEleve">
                        <h4><p><b>Voici la liste des éléves inscrits :</b></p></h4>
                    </div>
                    <div className="searchEleve">
                        <button class="rounded-pill" style={{marginLeft:30, width:400,height:40, border:1}}><img src={imageLogos} alt="logos" width="5%" height="5%"></img>recherche d'un éléve</button>
                    </div>
                    <div className="tcadre">
                        <div className="informationsEvele">
                            <br/>
                            <p><b>Prénom - NOM - age - Niveau<button class="rounded-pill" style={{marginLeft:7, width:50,height:10, border:1, color: "red"}}>supprimer</button><button class="rounded-pill" style={{marginLeft:9, width:50,height:10, border:1, color: "blue"}}>modifier</button></b></p>
                            <p><b>Prénom - NOM - age - Niveau<button class="rounded-pill" style={{marginLeft:7, width:50,height:10, border:1, color: "red"}}>supprimer</button><button class="rounded-pill" style={{marginLeft:9, width:50,height:10, border:1, color: "blue"}}>modifier</button></b></p>
                            <p><b>Prénom - NOM - age - Niveau<button class="rounded-pill" style={{marginLeft:7, width:50,height:10, border:1, color: "red"}}>supprimer</button><button class="rounded-pill" style={{marginLeft:9, width:50,height:10, border:1, color: "blue"}}>modifier</button></b></p>
                            <p><b>Prénom - NOM - age - Niveau<button class="rounded-pill" style={{marginLeft:7, width:50,height:10, border:1, color: "red"}}>supprimer</button><button class="rounded-pill" style={{marginLeft:9, width:50,height:10, border:1, color: "blue"}}>modifier</button></b></p>
                            <p><b>Prénom - NOM - age - Niveau<button class="rounded-pill" style={{marginLeft:7, width:50,height:10, border:1, color: "red"}}>supprimer</button><button class="rounded-pill" style={{marginLeft:9, width:50,height:10, border:1, color: "blue"}}>modifier</button></b></p>
                            <p><b>Prénom - NOM - age - Niveau<button class="rounded-pill" style={{marginLeft:7, width:50,height:10, border:1, color: "red"}}>supprimer</button><button class="rounded-pill" style={{marginLeft:9, width:50,height:10, border:1, color: "blue"}}>modifier</button></b></p>
                            <p><b>Prénom - NOM - age - Niveau<button class="rounded-pill" style={{marginLeft:7, width:50,height:10, border:1, color: "red"}}>supprimer</button><button class="rounded-pill" style={{marginLeft:9, width:50,height:10, border:1, color: "blue"}}>modifier</button></b></p>
                            <p><b>Prénom - NOM - age - Niveau<button class="rounded-pill" style={{marginLeft:7, width:50,height:10, border:1, color: "red"}}>supprimer</button><button class="rounded-pill" style={{marginLeft:9, width:50,height:10, border:1, color: "blue"}}>modifier</button></b></p>
                        </div>
                    </div>
                    <div>
                        <div className="bloc2">
                            <h4><p><b>Vous&nbsp;voulez&nbsp;ajouter&nbsp;une&nbsp;personne<br></br> 
                             de votre établissement ?</b></p></h4>
                        </div>
                        <div className="mesInputs">
                            <input class = 'form-control' style={{ width:"60%", margin:"2%"}} type="text" placeholder="Nom"></input>
                            <br/>
                            <input class = 'form-control' style={{ width:"60%", margin:"2%"}} type="text" placeholder="Prénom"></input>
                            <br/>
                            <input class = 'form-control' style={{ width:"60%", margin:"2%"}} type="text" placeholder="Login"></input> 
                            <br/>
                            <input class = 'form-control' style={{ width:"60%", margin:"2%"}} type="text" placeholder="Niveau"></input>
                            <br/>
                            <input class = 'form-control' style={{ width:"60%", margin:"2%"}} type="text" placeholder="Mot de passe"></input>
                        </div>
                        <br/>
                        <div className="Ajouter">
                            <Button style={{width:240}}>
                                <b>Ajouter</b>
                            </Button>
                        </div>
                    </div>
                </div>
            </body>
            <br/>
            <Footer/>
        </div>
    )
} 

export default InfoElevesLycee;