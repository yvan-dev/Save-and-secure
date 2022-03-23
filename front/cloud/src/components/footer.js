import React from 'react';
import img1 from '../images/01.png';
import img2 from '../images/02.png';
import img3 from '../images/03.png';
import { FormattedMessage, injectIntl } from "react-intl";

const Footer = () => {
    return (
        <footer>
            <p><FormattedMessage id="home.footer" /></p>  
            <a href="https://www.facebook.com/profile.php?id=100078998544526" title="Rejoignez-nous sur Facebook"><img src={img1} width="20px"></img></a>
            <a href="https://twitter.com/" title="Rejoignez-nous sur Twitter"><img src={img2} width="20px"></img></a>
            <a href="https://www.linkedin.com/in/ss-cloud-43875b235/" title="Rejoignez-nous sur LinkedIn"><img src={img3} width="20px"></img></a> 
        </footer>
    )
}

export default Footer; 