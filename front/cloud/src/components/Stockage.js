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
import img1 from '../images/powerPoint.png';
import img2 from '../images/pdf.jpg';
import img3 from '../images/word.jpg';
import img4 from '../images/excel.jpg';
import img5 from '../images/video.jpg';
import img6 from '../images/son.jpg';
import img7 from '../images/fichier.PNG';
import img8 from '../images/fichier.PNG';
import image from '../images/index.png';


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
            <hr></hr>

            <div className="document">
                <div>
                    <p><b><span style={{ fontSize: 20}}>#</span>&nbsp;&nbsp;&nbsp;Mes documents</b></p>
                </div>  
                <div>
                    <p><b><span style={{ marginLeft:-14}}><img src={image} alt="logos" width="3%" height="3%"></img></span> Mon compte</b></p>
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
                    <p><b>Importer un fichier : <Button><span style={{ fontSize:25}}>+</span></Button></b></p>
                </div>  
                <div>
                    <button class="text-primary" style={{marginLeft:360, width:200,height:40, border:1}}><span style={{fontSize:23}}>+</span> Nouveau dossier</button>
                    <button class="text-primary" style={{marginLeft:30, width:200,height:40, border:1}}>recherche</button>
                </div>

                <div className="logosFile" style={{marginLeft:350, marginTop:30}}>
                    <img src={img1} alt="logos" width="9%" height="9%"></img>
                    <img src={img2} style={{margin:25}} alt="logos" width="10%" height="10%"></img>
                    <img src={img3} style={{margin:25}} alt="logos" width="7%" height="7%"></img>
                    <img src={img4} style={{margin:25}} alt="logos" width="7%" height="7%"></img>
                </div> 
                <div className="logoSong" style={{marginLeft:325, marginTop:-12}}>
                    <img src={img5} style={{margin:15}} alt="logos" width="11%" height="11%"></img>
                    <img src={img6} style={{margin:15}} alt="logos" width="7%" height="7%"></img>
                    <img src={img7} style={{margin:25}} alt="logos" width="8%" height="8%"></img>
                    <img src={img8} style={{margin:25}} alt="logos" width="8%" height="8%"></img>
                </div> 
            </div>

            <Footer/>
        </div>    
)}
           
export default Stockage;