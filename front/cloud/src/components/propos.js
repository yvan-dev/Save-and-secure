import React from 'react';
import Footer from './footer';
import img from '../images/image.png';
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import Select from 'react-select';
import network from '../images/network.PNG';
import { FormattedMessage, injectIntl } from "react-intl";

const options = [
    { value: 'FR', label: 'Français' },
    { value: 'ENG', label: 'Anglais' },
]

function Propos(props){
    const history = useHistory();
    return(
        <div>
            <header>
                <span style={{ margin: 15 }}>
                    <img src={img} alt="logos" width="8%" height="8%"></img>
                </span>

                <span style={{ marginLeft: "49%" }}>
                    <span style={{ margin:10}}>
                        <Button onClick={() => history.push("/login")}><FormattedMessage id="propos.header.btnConnectLabel" /></Button>
                    </span>
                    <span style={{ margin:10, color:"blue"}}>
                        <label onClick={() => history.push("/contact")}><FormattedMessage id="propos.header.btnContact" /></label>
                    </span>
                    <span style={{ margin:10,color:"blue"}}>
                        <label onClick={() => history.push("/")}><FormattedMessage id="propos.header.btnWelcome" /></label>
                    </span>
                    <span style={{ marginLeft:10}}>FAQ</span>
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
                <div className="cloud">
                    <h3><p><b><FormattedMessage id="propos.body.H3" /></b></p></h3>
                    
                    <p><FormattedMessage id="propos.body.P1" /> <br/>
                    <FormattedMessage id="propos.body.P2" /><br/></p>
                    
                    <p><FormattedMessage id="propos.body.P3" /> <br/>
                    <FormattedMessage id="propos.body.P4" /> <br/>
                    <FormattedMessage id="propos.body.P5" /><br/></p>
                    
                    <p><FormattedMessage id="propos.body.P6" /> <br/>
                    <FormattedMessage id="propos.body.P7" /> <br/>
                    <FormattedMessage id="propos.body.P8" /></p>
                </div>
                <br/>
                <div className="cloud">
                    <h3><p><b><FormattedMessage id="propos.body.h3" /></b></p></h3>
                    
                    <p><FormattedMessage id="propos.body.p1" /><br/>
                    <FormattedMessage id="propos.body.p2" /><br/>
                    <FormattedMessage id="propos.body.p3" /></p>
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