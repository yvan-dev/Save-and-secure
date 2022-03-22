import React from 'react';
import Footer from './footer';
import img from '../images/image.png';
import Button from "react-bootstrap/Button";
import Select from 'react-select';
import img1 from '../images/connexion.jpg';
import { FormattedMessage, injectIntl } from "react-intl";
import { withRouter } from "react-router";
import { withCookies} from 'react-cookie';
import rest from '../API/rest';

class Connexion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount () {
        const { cookies } = this.props;
        cookies.set('token', '', { path: '/' });
    }

    login = () => {
        const { history } = this.props;
        const { cookies } = this.props;
        let data = { login: '', password: '' }
		const loginInput = document.getElementById('login');
		const passwordInput = document.getElementById('password');
		if (loginInput != null || passwordInput != null) {
			data.login = loginInput.value;
            data.password = passwordInput.value;
			rest
				.login(data)
                .then(response => {
                    if (response.status != 200) {
                        // display message for user => do best than alert
                        alert('Erreur lors de l\'authentification')
                    }
                    else {
                        response.text().then((result) => {
                            result = JSON.parse(result);
                            cookies.set('token', result.token, { path: '/' });
                            document.location.href = 'http://localhost:3000/stockage'
                        })
                    }
                })
				.catch((err) => {
					console.log(err);
				});
		}
	};

    render() {
        const options = [
            { value: 'FR', label: 'Français' },
            { value: 'ENG', label: 'Anglais' },
        ]
        const {history} = this.props
        return(
            <div>
            <header style={{marginTop:11}}>
                <div>
                    <span style={{ margin: 15 }}>
                        <img src={img} alt="logos" width="8%" height="8%"></img>
                    </span>
                    <span style={{ marginLeft:"52%"}}>
                        <span style={{ margin:10,color:"blue"}}>
                            <label onClick={() => history.push("/contact")}><FormattedMessage id="home.header.btnContact" /></label>
                        </span>
                        <span style={{ margin:10,color:"blue"}}>
                            <label onClick={() => history.push("/propos")}><FormattedMessage id="home.header.btnAbout" /></label>
                        </span>
                        <span style={{ margin:10,color:"blue"}}>
                            <label onClick={() => history.push("/")}><FormattedMessage id="propos.header.btnWelcome" /></label>
                        </span>
                        <span style={{ marginLeft:10}}>FAQ</span>
                        <span>
                        <Select
                            className="select"
                            options={options}
                            onChange={(event) => {this.props.changeCookie(event.value);}}
                        />
                        </span>
                    </span>    
                </div>   
                <hr/>
            </header>
            <div className="connect">   
                <h4><p><b><FormattedMessage id="Votre.compte.S&S" /></b></p></h4>
                <div className="inputLogin">
                    <FormattedMessage id="connexion.body.Input1">
                        {placeholder=>  
                            <input id="login" class = 'form-control' type="text" placeholder={placeholder}/>
                        }
                    </FormattedMessage><br/>
                    <br/>
                    <FormattedMessage id="connexion.body.Input2">
                        {placeholder=>  
                            <input id='password' class = 'form-control' type="password" placeholder={placeholder}/>
                        }
                    </FormattedMessage><br/>
                    <br/>
                    <div className="label">
                        <input type='radio'/><label class="text-primary">&nbsp;&nbsp;<FormattedMessage id="connexion.body.LabelRestConnect" /></label><br/><br/>
                    </div> 
                    <div className="mdp">   
                        <span ><b><FormattedMessage id="connexion.body.ForgetMDP" /></b></span>
                    </div> 
                </div>
                <Button style={{width:250}} onClick={this.login}><b><FormattedMessage id="connexion.body.btnConnect" /></b></Button>
            </div>     
            <div className="imgConnect" style={{marginTop:110}}>
                <img src={img1} alt="logos" width="35%" height="35%"></img> 
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            </div>
            <Footer/>
        </div>
        )
    }
}

export default withRouter(withCookies(Connexion));