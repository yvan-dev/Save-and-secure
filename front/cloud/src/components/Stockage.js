import React from 'react';
import Footer from './footer';
import img from '../images/image.png';
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import Select from 'react-select';
import Form from 'react-bootstrap/Form';
import img1 from '../images/powerPoint.png';
import img2 from '../images/pdf.jpg';
import img3 from '../images/word.jpg';
import img4 from '../images/excel.jpg';
import img5 from '../images/video.jpg';
import img6 from '../images/son.jpg';
import img7 from '../images/fichier.PNG';
import img8 from '../images/fichier.PNG';
import image from '../images/index.png';
import imageLogos from '../images/loupe.PNG';
import { FormattedMessage, injectIntl } from "react-intl";

const options = [
    { value: 'FR', label: 'Français' },
    { value: 'ENG', label: 'Anglais' },
]

function Stockage(props){
    const history = useHistory();
    return(
        <div>
            <header style={{marginTop:11}}>
                <div>
                    <span style={{ margin: 15 }}>
                        <img src={img} alt="logos" width="8%" height="8%"></img>
                    <span style={{ marginLeft: 870 }}>
                        <Button onClick={() => history.push("/login")}><FormattedMessage id="stockage.header.btnDisconnect" /></Button>
                    </span>
                    <Select
                        className="select"
                        options={options}
                        onChange={(event) => {props.changeCookie(event.value); console.log('cookie change : ', props.cookies)}}
                    />
                    </span>
                </div>   
                <hr/>
            </header>

            <div className="document">
                <div>
                    <p><button class="rounded-pill" style={{ marginLeft:-15, width:140, height:35 ,border:1}}><span style={{ fontSize: 20}}>#</span><b>&nbsp;<FormattedMessage id="stockage.body.btnDocuments" /></b></button></p>
                </div>  
                <div>
                    <p><button class="rounded-pill" style={{ marginLeft:-15, width:140, height:35 ,border:1}} onClick={() => history.push("/monCompte")}><img src={image} alt="logos" width="3%" height="3%"></img><b><FormattedMessage id="stockage.body.btnCompte" /></b></button></p>
                </div>  
                <div>
                    <p><button class="rounded-pill" style={{ marginLeft:-15,width:140, height:35 ,border:1}} onClick={() => history.push("/infoElevesLycee")}><b><FormattedMessage id="stockage.body.btnLycee" /></b></button></p>
                </div>  
                <div>
                    <p><FormattedMessage id="stockage.body.p" /></p>
                </div>   
                <br></br>
                <br></br>
                <br></br>
                
                <div className="fichier">
                    <p><b><FormattedMessage id="stockage.body.ImportFile" /></b></p>
                <div class="form-group" className="choseFile">
                    <Form>
                        <input type="file" class="form-control-file" id="exampleFormControlFile"></input>
                    </Form>
                </div>        
                </div>  
                <div>
                    <button class="rounded-pill" style={{marginLeft:"30%", marginTop:"3%" ,width:200,height:40, border:1}}><span style={{fontSize:23}}>+</span><FormattedMessage id="stockage.body.btnNewFile" /></button>
                    <button class="rounded-pill" style={{marginLeft:"3%", marginTop:"3%",width:200,height:40, border:1}}><img src={imageLogos} alt="logos" width="5%" height="5%"></img><FormattedMessage id="stockage.body.btnSearch" /></button>
                </div>

                <div className="logosFile" style={{marginLeft:350, marginTop:30}}>
                    <img src={img1} alt="logos" width="9%" height="9%"></img>
                    <img src={img2} style={{margin:25}} alt="logos" width="10%" height="10%"></img>
                    <img src={img3} style={{margin:25}} alt="logos" width="7%" height="7%"></img>
                    <img src={img4} style={{margin:25}} alt="logos" width="7%" height="7%"></img>
                </div> 
                <div className="logoSong" style={{marginLeft:325, marginTop:-12}}>
                    <img src={img5} style={{margin:15}} alt="logos" width="11%" height="11%"></img>
                    <img src={img6} style={{margin:15}} alt="logos" width="7%" height="7%"></img>
                    <img src={img7} style={{margin:25}} alt="logos" width="8%" height="8%"></img>
                    <img src={img8} style={{margin:25}} alt="logos" width="8%" height="8%"></img>
                </div> 
            </div>
            <Footer/>
        </div>    
)}
           
export default Stockage;