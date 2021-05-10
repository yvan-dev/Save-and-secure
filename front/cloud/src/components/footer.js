import React from 'react';
import img1 from '../images/01.png';
import img2 from '../images/02.png';
import img3 from '../images/03.png';

const Footer = () => {
    return (
        <footer>
            <div id="en-bas">
                <p>Politique relative aux cookies</p>  
            </div>
            <div id="reseau">
                <a href="#" title="Rejoignez-nous sur Facebook"><img src={img1} width="20px"></img></a>
                <a href="#" title="Rejoignez-nous sur Twitter"><img src={img2} width="20px"></img></a>
                <a href="#" title="Rejoignez-nous sur LinkedIn"><img src={img3} width="20px"></img></a>
            </div>  
        </footer>
    )
}

export default Footer; 