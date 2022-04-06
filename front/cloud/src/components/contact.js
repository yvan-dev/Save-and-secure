import React from 'react';
import Footer from './footer';
import img from '../images/image.png';
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import Select from 'react-select';
import Maps from './Maps.js';
import { FormattedMessage, injectIntl } from "react-intl";
import ContactUs from './email';
import emailjs from 'emailjs-com';

const options = [
    { value: 'FR', label: 'Français' },
    { value: 'ENG', label: 'Anglais' },
]

function sendEmail(e) {
    e.preventDefault();
    emailjs.sendForm('service_ncpf51d', 'template_ughw7vi', e.target, 'user_4u1tq0zcGaB6Zm0gRAzxK')
        .then((result) => {
            console.log('sucess : ', result.text);
            alert('Votre message a bien été envoyé')
        }, 
        (error) => {
            console.log('error : ', error.text);
        });
}

function Contact(props){
    const history = useHistory();
    return(
        <div>
            <header>
                <span style={{ margin: 15 }}>
                    <img src={img} alt="logos" width="8%" height="8%"></img>
                </span>
                <span style={{ marginLeft: "52%" }}>
                    <span style={{ margin:10}}>
                        <Button onClick={() => history.push("/login")}>
                            <FormattedMessage id="contact.header.btnConnectLabel" />
                        </Button>
                    </span>
                    <span style={{ margin:10,color:"blue"}}>
                        <label onClick={() => history.push("/propos")}><FormattedMessage id="contact.header.btnAbout" /></label>
                    </span>
                    <span style={{ margin:10,color:"blue"}}>
                        <label onClick={() => history.push("/")}><FormattedMessage id="contact.header.btnWelcome" /></label>
                    </span>
                    <span style={{ marginLeft:10, color:"blue"}}><label onClick={() => history.push("/FAQ")}>FAQ</label></span>
                    <span>
                        <Select
                            className="select"
                            options={options}
                            onChange={(event) => {props.changeCookie(event.value);}}
                        />
                    </span>
                </span>    
                <hr/>
            </header>

            <body>
                <div className="TitleContact">
                    <h3><p><b><FormattedMessage id="contact.body.Title" /></b></p></h3>
                </div>  
                <br/> 
                <div className="sTitle"> 
                    <h6><p><b><FormattedMessage id="contact.body.H3" /></b></p></h6>
                </div>
                <br/>
                <div className="Inputs">
                <form className="contact-form" onSubmit={(e) => sendEmail(e)}>
                    <FormattedMessage id="contact.body.Input1">
                        {placeholder=>  
                            <input class = 'form-control' type="text" name="nom" style={{ width:"35%", margin:"0.5%"}} placeholder={placeholder}/>
                        }
                    </FormattedMessage>
                    <FormattedMessage id="contact.body.Input2">
                        {placeholder=>  
                            <input class = 'form-control' type="text" name="Prenom" style={{ width:"35%", margin:"0.5%"}} placeholder={placeholder}/>
                        }
                    </FormattedMessage>
                    <br/>
                    <br/>
                    <FormattedMessage id="contact.body.Input3">
                        {placeholder=>  
                            <input class = 'form-control' type="text" name="email" style={{ width:"35%", margin:"0.5%"}} placeholder={placeholder}/>
                        }
                    </FormattedMessage>
                    <FormattedMessage id="contact.body.Input4">
                        {placeholder=>  
                            <input class = 'form-control' type="text" name="phone" style={{ width:"35%", margin:"0.5%"}} placeholder={placeholder}/>
                        }
                    </FormattedMessage>
                    <br/>
                    <FormattedMessage id="contact.body.Input5">
                        {placeholder=>  
                            <input class = 'form-control' type="text" name="message" style={{ width:"71%", height:100}} placeholder={placeholder}/>
                        }
                    </FormattedMessage>
                    <div className="envoyer">
                    <br/>
                        <Button type="submit" style={{width:250}}>
                            <b><FormattedMessage id="contact.body.btnSend" /></b>
                        </Button>
                    </div>
                </form>
                </div>
                <br/>
                <br/>
                <br/>
                <div className="nousRendreVisite">
                    <h5><b><FormattedMessage id="contact.body.H5" /></b></h5>
                </div>
                <br/>
                <Maps/>
            </body>
            <Footer/>
        </div>
    )
}
export default Contact;