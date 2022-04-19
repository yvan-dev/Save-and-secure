import React from 'react';
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";
import Footer from './footer';
import img from '../images/image.png';
import Button from 'react-bootstrap/Button';

const ForgetPassword = (props) => {
    const history = useHistory();
    return (
        <div>
            <div className='Password'>
            <br/>
                <div>
                    <img src={img} alt='logos' width='40%' height='40%'/>
                </div>
                <br/>
                <br/>
                <span>
                    <p><b>Veuillez changer mon mot de passe de connexion</b></p>
                </span>
                <div className='PASS'>
                    <FormattedMessage id='connexion.body.input1'>
                        {(placeholder) => <input id='login' class='form-control' type='text' style={{ marginTop: 180}} placeholder={placeholder} />}
                    </FormattedMessage>
				    <FormattedMessage id='connexion.body.input2'>
					    {(placeholder) => <input id='password' class='form-control' type='password' placeholder={placeholder} />}
				    </FormattedMessage>
                </div>
                <br/>
                <div>
                    <Button style={{width:220}}>Changer</Button>
                </div>
            </div>
            <Footer />
        </div>

    )
}

export default ForgetPassword; 