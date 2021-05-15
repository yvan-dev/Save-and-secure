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
    { value: 'ENG', label: 'Englais' },
  ]

function Stockage(){
    const history = useHistory();
    return(
        <div>
            <header style={{marginTop:11}}>
                <div>
                    <span style={{ margin: 15 }}>
                        <img src={img} alt="logos" width="7%" height="7%"></img>
                    <span style={{ marginLeft: 870 }}>
                        <Button onClick={() => history.push("/login")}>Déconnexion</Button>
                    </span>
                      <Select
                        className="select"
                        options={options}/>
                    </span>
                </div>   
            </header>
            <hr></hr>

            <div className="document">
                <div>
                    <p><b><span style={{ fontSize: 20}}>#</span>&nbsp;&nbsp;&nbsp;Mes documents</b></p>
                </div>  
                <div>
                    <p><b>Mon compte</b></p>
                </div>  
                <div>
                    <p>Il vous reste: x Go</p>
                </div>   
                <br></br>
                <br></br>
                <br></br>
                <div>
                    <p>... More</p>
                </div>
                <div className="fichier">
                    <p><b>Importer un fichier :</b></p>
                </div>   

            </div>

            <Footer/>
        </div>    
)}
           
export default Stockage;