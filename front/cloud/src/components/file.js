import React from "react";
import img from "../images/fileImage.png";
import Spinner from 'react-bootstrap/Spinner';

class File extends React.Component {
    constructor (props) {
        super(props);
    } 
    
    render () {
        const loading = document.getElementById('loading');
        if (this.props.file !== undefined && loading != undefined)
            loading.innerHTML = ''
        return (
            this.props.file !== undefined ?
            <span style={{margin: 20}}>
                <img src={img} alt="logos" width="9%" height="9%"></img>
                <span>{this.props.file.name}</span>
            </span>
            :
            <div id='loading' className="loading">
                <Spinner animation="border" role="status">
                </Spinner>
            </div>
        )}
}
export default File; 
