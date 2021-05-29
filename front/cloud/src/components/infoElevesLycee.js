import React from 'react';
import Footer from './footer';
import img from '../images/image.png';
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import Select from 'react-select';
import imageLogos from '../images/loupe.PNG';
import { FormattedMessage, injectIntl } from "react-intl";

const options = [
    { value: 'FR', label: 'Français' },
    { value: 'ANG', label: 'Anglais' },
]

function InfoElevesLycee(props){
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
                    <button class="rounded-pill" style={{width:170, height:40, border:1, marginTop:10, marginLeft:"1%"}}><p><span style={{fontSize: 20}}>#</span><b>&nbsp;&nbsp;<FormattedMessage id="stockage.body.btnDocuments" /></b></p></button>
                </div>  
                <div className="monCompte">
                    <button class="rounded-pill" style={{width:170, height:37, border:1, margin:10}} onClick={() => history.push("/monCompte")}><p><b><FormattedMessage id="stockage.body.btnCompte" /></b></p></button>
                </div>  
                <div className="etudiant">
                    <button class="rounded-pill" style={{width:170, height:36, border:1, margin:6}} onClick={() => history.push("/infoElevesLycee")}><p><b><FormattedMessage id="stockage.body.btnLycee" /></b></p></button>
                </div>  

                <div className="bloc">
                    <div className="titleListeEleve">
                        <h4><p><b><FormattedMessage id="lycee.body.titleListStudent" /></b></p></h4>
                    </div>
                    <div className="searchEleve">
                        <button class="rounded-pill" style={{marginLeft:30, width:400,height:40, border:1}}><img src={imageLogos} alt="logos" width="5%" height="5%"></img><FormattedMessage id="lycee.body.searchStudent" /></button>
                    </div>
                    <div className="tcadre">
                        <div className="informationsEvele">
                            <br/>
                            <p><b><FormattedMessage id="lycee.body.firstName" /> - <FormattedMessage id="lycee.body.Name" /> - <FormattedMessage id="lycee.body.age" /> - <FormattedMessage id="lycee.body.level" /><button class="rounded-pill" style={{marginLeft:7, width:50,height:10, border:1, color: "red"}}><FormattedMessage id="lycee.body.btnDelete" /></button><button class="rounded-pill" style={{marginLeft:9, width:50,height:10, border:1, color: "blue"}}><FormattedMessage id="lycee.body.btnModify" /></button></b></p>
                            <p><b><FormattedMessage id="lycee.body.firstName" /> - <FormattedMessage id="lycee.body.Name" /> - <FormattedMessage id="lycee.body.age" /> - <FormattedMessage id="lycee.body.level" /><button class="rounded-pill" style={{marginLeft:7, width:50,height:10, border:1, color: "red"}}><FormattedMessage id="lycee.body.btnDelete" /></button><button class="rounded-pill" style={{marginLeft:9, width:50,height:10, border:1, color: "blue"}}><FormattedMessage id="lycee.body.btnModify" /></button></b></p>
                            <p><b><FormattedMessage id="lycee.body.firstName" /> - <FormattedMessage id="lycee.body.Name" /> - <FormattedMessage id="lycee.body.age" /> - <FormattedMessage id="lycee.body.level" /><button class="rounded-pill" style={{marginLeft:7, width:50,height:10, border:1, color: "red"}}><FormattedMessage id="lycee.body.btnDelete" /></button><button class="rounded-pill" style={{marginLeft:9, width:50,height:10, border:1, color: "blue"}}><FormattedMessage id="lycee.body.btnModify" /></button></b></p>
                            <p><b><FormattedMessage id="lycee.body.firstName" /> - <FormattedMessage id="lycee.body.Name" /> - <FormattedMessage id="lycee.body.age" /> - <FormattedMessage id="lycee.body.level" /><button class="rounded-pill" style={{marginLeft:7, width:50,height:10, border:1, color: "red"}}><FormattedMessage id="lycee.body.btnDelete" /></button><button class="rounded-pill" style={{marginLeft:9, width:50,height:10, border:1, color: "blue"}}><FormattedMessage id="lycee.body.btnModify" /></button></b></p>
                            <p><b><FormattedMessage id="lycee.body.firstName" /> - <FormattedMessage id="lycee.body.Name" /> - <FormattedMessage id="lycee.body.age" /> - <FormattedMessage id="lycee.body.level" /><button class="rounded-pill" style={{marginLeft:7, width:50,height:10, border:1, color: "red"}}><FormattedMessage id="lycee.body.btnDelete" /></button><button class="rounded-pill" style={{marginLeft:9, width:50,height:10, border:1, color: "blue"}}><FormattedMessage id="lycee.body.btnModify" /></button></b></p>
                            <p><b><FormattedMessage id="lycee.body.firstName" /> - <FormattedMessage id="lycee.body.Name" /> - <FormattedMessage id="lycee.body.age" /> - <FormattedMessage id="lycee.body.level" /><button class="rounded-pill" style={{marginLeft:7, width:50,height:10, border:1, color: "red"}}><FormattedMessage id="lycee.body.btnDelete" /></button><button class="rounded-pill" style={{marginLeft:9, width:50,height:10, border:1, color: "blue"}}><FormattedMessage id="lycee.body.btnModify" /></button></b></p>
                            <p><b><FormattedMessage id="lycee.body.firstName" /> - <FormattedMessage id="lycee.body.Name" /> - <FormattedMessage id="lycee.body.age" /> - <FormattedMessage id="lycee.body.level" /><button class="rounded-pill" style={{marginLeft:7, width:50,height:10, border:1, color: "red"}}><FormattedMessage id="lycee.body.btnDelete" /></button><button class="rounded-pill" style={{marginLeft:9, width:50,height:10, border:1, color: "blue"}}><FormattedMessage id="lycee.body.btnModify" /></button></b></p>
                            <p><b><FormattedMessage id="lycee.body.firstName" /> - <FormattedMessage id="lycee.body.Name" /> - <FormattedMessage id="lycee.body.age" /> - <FormattedMessage id="lycee.body.level" /><button class="rounded-pill" style={{marginLeft:7, width:50,height:10, border:1, color: "red"}}><FormattedMessage id="lycee.body.btnDelete" /></button><button class="rounded-pill" style={{marginLeft:9, width:50,height:10, border:1, color: "blue"}}><FormattedMessage id="lycee.body.btnModify" /></button></b></p>
   
                        </div>
                    </div>
                    <div>
                        <div className="bloc2">
                            <h4><p><b><FormattedMessage id="lycee.body.bloc2.1" />&nbsp;<FormattedMessage id="lycee.body.bloc2.2" />&nbsp;<FormattedMessage id="lycee.body.bloc2.3" />&nbsp;<FormattedMessage id="lycee.body.bloc2.4" />&nbsp;<FormattedMessage id="lycee.body.bloc2.5" /><br></br> 
                            <FormattedMessage id="lycee.body.bloc2.6" /></b></p></h4>
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
                                <b><FormattedMessage id="lycee.body.btnAjout" /></b>
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