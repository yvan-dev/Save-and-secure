import React from "react";
import Footer from "./footer";
import img from "../images/image.png";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import { ButtonToolbar } from "react-bootstrap";
import Select from "react-select";
import Form from "react-bootstrap/Form";
import BtnPrincipalPage from "./btnPrincipalPage";
import { FormattedMessage, injectIntl } from "react-intl";
import rest from "../API/rest";
import { withRouter } from "react-router";

const options = [
  { value: "FR", label: "Français" },
  { value: "ENG", label: "Anglais" },
];
class Compte extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const login = document.getElementById("login");
    const lastName = document.getElementById("lastName");
    const firstName = document.getElementById("firstName");
    const level = document.getElementById("level");
    const age = document.getElementById("age");
    rest.getUserLogged().then((response) => {
      if (response.status == 200) {
        response.json().then((result) => {
          login.innerHTML = result.login;
          firstName.innerHTML = result.firstName;
          lastName.innerHTML = result.lastName;
          age.innerHTML = result.age;
          level.innerHTML = result.level;
        });
      }
    });
  }

  render() {
    const { history } = this.props;
    return (
      <div>
        <header style={{ marginTop: 11 }}>
          <div>
            <span style={{ margin: 15 }}>
              <img src={img} alt="logos" width="8%" height="8%"></img>
              <span style={{ marginLeft: 870 }}>
                <Button onClick={() => history.push("/login")}>
                  <FormattedMessage id="stockage.header.btnDisconnect" />
                </Button>
              </span>
              <Select
                className="select"
                options={options}
                onChange={(event) => {
                  this.props.changeCookie(event.value);
                }}
              />
            </span>
          </div>
        </header>
        <hr />

        <body>
          <div className="document">
            <BtnPrincipalPage page={"compte"} />
          </div>
          <div>
            <div className="infoPerso">
            <br />  
              <h3>
                <p>
                  <b>
                    <FormattedMessage id="monCompte.body.infoPerso" />
                  </b>
                </p>
              </h3>
            </div>
            <div>
              <div className="tableau-cadre">
              <br />
                <section class="cadre">
                  <br />
                  <br />
                  <p>
                    <b>
                      <FormattedMessage id="lycee.body.Name" />&nbsp;:&nbsp;
                      <span id="lastName"></span>
                    </b>
                  </p>
                  <p>
                    <b>
                      <FormattedMessage id="lycee.body.firstName" />&nbsp;:&nbsp;
                      <span id="firstName"></span>
                    </b>
                  </p>
                  <p>
                    <b>
                      <FormattedMessage id="lycee.body.age" />&nbsp;:&nbsp;
                      <span id="age"></span>
                    </b>
                  </p>
                  <p>
                    <b>
                      <FormattedMessage id="lycee.body.input4" />&nbsp;:&nbsp;
                      <span id="login"></span>
                    </b>
                  </p>
                  <p>
                    <b>
                      <FormattedMessage id="lycee.body.level" />&nbsp;:&nbsp;
                      <span id="level"></span>
                    </b>
                  </p>
                  <br />
                </section>
              </div>
            </div>
          </div>
        </body>
        <br />
        <Footer />
      </div>
    );
  }
}

export default withRouter(Compte);
