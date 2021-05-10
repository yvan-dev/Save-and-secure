import React from 'react';
import Footer from './footer';
import Header from './header';

function Connexion(){
    return(
        <div>
            <h5><b>votre compte S&S</b></h5>
            <input class='form-control' placeholder="email" type="text"/><br></br>
            <input class='form-control' placeholder="mot de passe" type="text"/><br></br>
            <botton><b>Me connecter</b></botton>
            <Footer />
        </div>
    )
}

export default Connexion; 