import React from 'react';
import Footer from './footer';
import img from '../images/image.png';
import Button from "react-bootstrap/Button";
import Select from 'react-select';
import { FormattedMessage } from "react-intl";
import BtnPrincipalPage from './btnPrincipalPage';
import rest from '../API/rest';
import { withRouter } from 'react-router';
import Lyceen from './lyceens';

const options = [
    { value: 'FR', label: 'Français' },
    { value: 'ENG', label: 'Anglais' },
]
class InfoElevesLycee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {users: null, textBtn: 'Ajouter'}
    }

    addUser = () => {
        let data = {firstName: '', lastName: '', level: '', login: '', password: '', idSchool: 0, status: 'user' };
        const loginInput = document.getElementById('login');
        const passwordInput = document.getElementById('password');
        const firstNameInput = document.getElementById('firstName');
        const lastNameInput = document.getElementById('lastName');
        const levelInput = document.getElementById('level');
        const ageInput = document.getElementById('age');
        if (loginInput != null || passwordInput != null) {
                data.firstName = firstNameInput.value;
                data.lastName = lastNameInput.value;
                data.level = levelInput.value;
                data.login = loginInput.value;
                data.age = ageInput.value;
                data.password = passwordInput.value;
                data.idSchool = 1;
            if (this.state.textBtn === 'Ajouter') {
                rest.addUser(data).then((response) => {
                        if (response.status !== 200) {
                            // display message for user => do best than alert
                            alert('Erreur lors de l\'ajout du lycéen! ');
                        }
                        else {
                            this.getAllUser();
                            alert(data.firstName  + ' ajouté avec succès!')
                        }
                    })
                .catch((error) => {console.log('error : ', error)})
                } else {
                    rest.updateUser(data).then((response) => {
                        if (response.status !== 200)
                            alert('Erreur lors de la modification de l\'utilisateur!');
                        else {
                            this.getAllUser();
                            alert(data.firstName  + ' modifié avec succès!');
                        }
                    })
                    .catch((error) => {console.log('error : ', error)})
                }
            } 
    }

    loadUser = (user) => {
        this.setState({textBtn: 'Modifier'})
        const loginInput = document.getElementById('login');
        const firstNameInput = document.getElementById('firstName');
        const lastNameInput = document.getElementById('lastName');
        const levelInput = document.getElementById('level');
        const ageInput = document.getElementById('age');
        if (user.login !== '' || user.login != null) {
            loginInput.value = user.login;
            loginInput.placeholder = user.login;
        }
        if (user.firstName !== '' || user.firstName != null) {
            firstNameInput.value = user.firstName;
            firstNameInput.placeholder = user.placeholder;
        }
        if (user.lastName !== '' || user.lastName != null) {
            lastNameInput.value = user.lastName;
            lastNameInput.placeholder = user.lastName
        }
        if (user.levelInput !== '' || user.level != null) {
            levelInput.value = user.level;
            levelInput.placeholder = user.level
        }
        if (user.age !== '' || user.level != null) {
            ageInput.value = user.age;
            ageInput.placeholder = user.age
        }
    } 

    getAllUser = () => {
        rest.getAllUser().then(response => {
            if (response.status == 200) {
                response.json().then((users) => {
                    this.setState({users})
                })
            }
        })
    }

    getUserByFirstOrLastName = (name) => {
        rest.getUserByFirstOrLastName(name).then(response => {
            // eslint-disable-next-line eqeqeq
            if (response.status == 200) {
                response.json().then((users) => {
                    this.setState({users})
                })
            }
        })
    }

    componentDidMount() {
        this.getAllUser();
    }

    render() {
        console.log('users : ', this.state.users)
        const { history } = this.props;
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
                            onChange={(event) => {this.props.changeCookie(event.value);}}
                        />
                        </span>   
                    </div>   
                    <div className="border"></div>
                </header>
    
                <body>
                <div className="myDocument">
                    <BtnPrincipalPage page={'infoEleve'}/>
                </div>
                    <br/>
                    <div className="bloc">
                        <div className="titleListeEleve">
                            <h4><p><b><FormattedMessage id="lycee.body.titleListStudent" /></b></p></h4>
                        </div>
                        <div className="searchEleve">
                            {/* <button class="rounded-pill" style={{marginLeft:30, width:200,height:40, border:1}}><img src={imageLogos} alt="logos" width="5%" height="5%"></img><FormattedMessage id="lycee.body.searchStudent" /></button> */}
                            <form style={{marginLeft:"8%", width: 200, marginTop: "-2%"}}>
                                <span class="algolia-autocomplete" stype="positive: relative; display: inline-block; direction:ltr;">
                                <FormattedMessage id="research">
                                    {placeholder=> 
                                    <input id="docs-search-input" 
                                        class="form-control ds-input" 
                                        type="text" 
                                        placeholder={placeholder}
                                        autocomplete="off" 
                                        spellcheck="false" 
                                        // eslint-disable-next-line jsx-a11y/role-has-required-aria-props
                                        role="combobox" 
                                        aria-autocomplete="list"
                                        aria-expanded="false" 
                                        aria-label="Search input" 
                                        aria-owns="algolia-autocomplete-listbox-0" 
                                        dir="auto"
                                        onkeyup="getUserByFirstOrLastName(name)">
                                    </input>
                                    }
                                </FormattedMessage>
                                </span>
                            </form> 
                        </div>
                        <div className="tcadre">
                            <div className="informationsEvele">
                                <br/>
                                {
                                    this.state.users != null &&
                                        this.state.users.map((user) => {
                                            return(
                                                <Lyceen refresh={this.getAllUser} loadUser={this.loadUser} user={user}/>      
                                            )
                                        })
                                }
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
                                        <input id = 'lastName' class = 'form-control' style={{ width:"60%", margin:"2%"}} type="text" placeholder={placeholder}/>
                                    }
                                </FormattedMessage>
                                <br/>
                                <FormattedMessage id="lycee.body.input2">
                                    {placeholder=>  
                                        <input id = 'firstName' class = 'form-control' style={{ width:"60%", margin:"2%"}} type="text" placeholder={placeholder}/>
                                    }
                                </FormattedMessage>
                                <br/>
                                <FormattedMessage id="lycee.body.input3">
                                    {placeholder=>  
                                        <input id = 'level' class = 'form-control' style={{ width:"60%", margin:"2%"}} type="text" placeholder={placeholder}/>
                                    }
                                </FormattedMessage>
                                <br/>
                                <FormattedMessage id="lycee.body.age">
                                    {placeholder=>  
                                        <input id = 'age' class = 'form-control' style={{ width:"60%", margin:"2%"}} type="text" placeholder={placeholder}/>
                                    }
                                </FormattedMessage>
                                <br/>
                                <FormattedMessage id="lycee.body.input4">
                                    {placeholder=>  
                                        <input id = 'login' class = 'form-control' style={{ width:"60%", margin:"2%"}} type="text" placeholder={placeholder}/>
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
                                <Button style={{width:240}} onClick={this.addUser}>
                                    <b>{this.state.textBtn}</b>
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
} 

export default withRouter(InfoElevesLycee);