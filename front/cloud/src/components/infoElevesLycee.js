import React from 'react';
import Footer from './footer';
import img from '../images/image.png';
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import Select from 'react-select';
import imageLogos from '../images/loupe.PNG';
import { FormattedMessage, injectIntl } from "react-intl";
import BtnPrincipalPage from './btnPrincipalPage';
import rest from '../API/rest';

const options = [
    { value: 'FR', label: 'Français' },
    { value: 'ENG', label: 'Anglais' },
]

const addUser = () => {
    let data = {firstName: '', lastName: '', level: '', login: '', password: '', idSchool: 0, status: 'user' };
    const loginInput = document.getElementById('login');
    const passwordInput = document.getElementById('password');
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const levelInput = document.getElementById('level');
    if (loginInput != null || passwordInput != null) {
			data.firstName = firstNameInput.value;
			data.lastName = lastNameInput.value;
			data.level = levelInput.value;
			data.login = loginInput.value;
            data.password = passwordInput.value;
            data.idSchool = 1;
        rest.addUser(data).then((response) => {
                console.log(response);
				if (response.status !== 200) {
					// display message for user => do best than alert
					alert('Erreur lors de l\'ajout du lycéen! ');
                }
                else {
                    alert(data.firstName  + ' ajouté avec succès!')
                }
            })
        .catch((error) => {console.log('error : ', error)})
		}
}

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
                        onChange={(event) => {props.changeCookie(event.value);}}
                    />
                    </span>   
                </div>   
            </header>
            <hr/> 

            <body>
            <div className="document">
                <BtnPrincipalPage page={'infoEleve'}/>
            </div>
                
                <br/>
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
                            <FormattedMessage id="lycee.body.input1">
                                {placeholder=>  
                                    <input id = 'firstName' class = 'form-control' style={{ width:"60%", margin:"2%"}} type="text" placeholder={placeholder}/>
                                }
                            </FormattedMessage>
                            <br/>
                            <FormattedMessage id="lycee.body.input2">
                                {placeholder=>  
                                    <input id = 'lastName' class = 'form-control' style={{ width:"60%", margin:"2%"}} type="text" placeholder={placeholder}/>
                                }
                            </FormattedMessage>
                            <br/>
                            <FormattedMessage id="lycee.body.input3">
                                {placeholder=>  
                                    <input id = 'login' class = 'form-control' style={{ width:"60%", margin:"2%"}} type="text" placeholder={placeholder}/>
                                }
                            </FormattedMessage>
                            <br/>
                            <FormattedMessage id="lycee.body.input4">
                                {placeholder=>  
                                    <input id = 'level' class = 'form-control' style={{ width:"60%", margin:"2%"}} type="text" placeholder={placeholder}/>
                                }
                            </FormattedMessage>
                            <br/>
                            <FormattedMessage id="lycee.body.input5">
                                {placeholder=>  
                                    <input id = 'password' class = 'form-control' style={{ width:"60%", margin:"2%"}} type="text" placeholder={placeholder}/>
                                }
                            </FormattedMessage>
                        </div>
                        <br/>
                        <div className="Ajouter">
                            <Button style={{width:240}} onClick={() => addUser()}>
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