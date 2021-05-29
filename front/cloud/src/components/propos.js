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
import network from '../images/network.PNG'
import Form from 'react-bootstrap/Form'

const options = [
    { value: 'FR', label: 'Français' },
    { value: 'ENG', label: 'Anglais' },
]

function Propos(){
    const history = useHistory();
    return(
        <div>
            <header>
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
                <div className="cloud">
                    <h3><p><b>Qui sommes nous ?</b></p></h3>
                    
                    <p>Save & Safe  Cloud est une start-up crée le 5 mai 2021 par 3 jeunes étudiants de l’ESME Sudria, elle est spécialisée dans le <br/>
                    stockage des donnés dans le cloud.<br/></p>
                    
                    <p>Cette Start-up est basée en France et elle est composée maintenant de 10 personnes. Notre objectif et d’accompagner les <br/>
                    lycées, écoles d’ingénieurs et universités en leurs proposant une solution d’hébergement dans le cloud qui est simple et <br/>
                    sécurisée.<br/></p>
                    
                    <p>Les étudiants et enseignants pourront sauvegarder leurs fichiers et dossiers quel que soit le type (image, vidéo, <br/>
                    PowerPoint, cours ...) à tout moment et depuis tout type de terminaux (PC, tablette, smartphone), grâce à une simple <br/>
                    connexion Internet, ils pourront accéder aux données en mode Cloud.</p>
                </div>
                <br/>
                <div className="cloud">
                    <h3><p><b>Comment ça marche ?</b></p></h3>
                    
                    <p>Le stockage cloud consiste à utiliser des serveurs distants accessibles via Internet pour sauvegarder les données de l’école.<br/>
                    Une synchronisation avec les postes de travail permet d'enregistrer de manière automatisée <br/>
                    les modifications de documents en temps réel.</p>
                </div>
                <div className="network">
                    <img src={network} alt="logos" width="40%"></img>
                </div>
            </body>
            
            <Footer/>
        </div>
    )
}

export default Propos;