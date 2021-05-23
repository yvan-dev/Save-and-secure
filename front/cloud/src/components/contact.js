import React from 'react';
import Footer from './footer';
import Header from './header';
import img from '../images/image.png';
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import { ButtonToolbar } from "react-bootstrap";
import Select from 'react-select';
import img1 from '../images/connexion.jpg';
import Form from 'react-bootstrap/Form'

const options = [
    { value: 'FR', label: 'Français' },
    { value: 'ENG', label: 'Englais' },
]

function Contact(){
    const history = useHistory();
    return(
        <div>

        </div>
    )
}
export default Contact;