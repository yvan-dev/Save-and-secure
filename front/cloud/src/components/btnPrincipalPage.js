import React from 'react';
import { withRouter } from "react-router";
import Button from "react-bootstrap/Button";
import { FormattedMessage, injectIntl } from "react-intl";
import rest from '../API/rest';

class BtnPrincipalPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {user: null}
    }

    componentDidMount () {
        rest.getUserLogged().then(response => {
            if (response.status == 200) {
                response.json().then(result => {
                    this.setState({user: result})
                })
            }
        })
    }

    render() {
        const {history} = this.props 
        return (
        <div>
            <div>
                {this.props.page == 'stockage' ?
                    <p><button class="rounded-pill" onClick={() => history.push("/stockage")} style={{ backgroundColor: '#0066FF', color: 'white', marginLeft:-15, width:150, height:35 ,border:1}}><b><FormattedMessage id="stockage.body.btnDocuments" /></b></button></p>
                    :
                    <p><button class="rounded-pill" onClick={() => history.push("/stockage")} style={{ marginLeft:-15, width:150, height:35 ,border:1}}><b><FormattedMessage id="stockage.body.btnDocuments" /></b></button></p>
                }
            </div>  
            <div>
                {this.props.page == 'compte' ?
                    <p><button class="rounded-pill" style={{ backgroundColor: '#0066FF', color: 'white', marginLeft:-15, width:140, height:35 ,border:1}} onClick={() => history.push("/monCompte")}><b><FormattedMessage id="stockage.body.btnCompte" /></b></button></p>
                    :
                    <p><button class="rounded-pill" style={{ marginLeft:-15, width:140, height:35 ,border:1}} onClick={() => history.push("/monCompte")}><b><FormattedMessage id="stockage.body.btnCompte" /></b></button></p>
                }
            </div>
            { this.state.user != null && this.state.user.status === 'admin' &&
                <div>
                    {this.props.page == 'infoEleve' ?
                        <p><button class="rounded-pill" style={{backgroundColor: '#0066FF', color: 'white', marginLeft:-15,width:140, height:35 ,border:1}} onClick={() => history.push("/infoElevesLycee")}><b><FormattedMessage id="stockage.body.btnLycee" /></b></button></p>
                        :
                        <p><button class="rounded-pill" style={{ marginLeft:-15,width:140, height:35 ,border:1}} onClick={() => history.push("/infoElevesLycee")}><b><FormattedMessage id="stockage.body.btnLycee" /></b></button></p>
                    }
                </div>
            }   
        </div>
        );
    }
}
export default withRouter(BtnPrincipalPage); 