import React from "react";
import Footer from "./footer";
import img from "../images/image.png";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import Form from "react-bootstrap/Form";
import img1 from "../images/powerPoint.png";
import img2 from "../images/pdf.jpg";
import img3 from "../images/word.jpg";
import img4 from "../images/excel.jpg";
import img5 from "../images/video.jpg";
import img6 from "../images/son.jpg";
import img7 from "../images/fichier.PNG";
import img8 from "../images/fichier.PNG";
import imageLogos from "../images/loupe.PNG";
import { FormattedMessage, injectIntl } from "react-intl";
import BtnPrincipalPage from './btnPrincipalPage';
import { withRouter } from 'react-router';
import File from "./file";
import rest from "../API/rest";
import img9 from '../images/01.png';
import img10 from '../images/02.png';
import img11 from '../images/03.png';

const options = [
    { value: 'FR', label: 'Français' },
    { value: 'ENG', label: 'Anglais' },
]

class Stockage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {user: null, files: []}
    } 

    getFilesofFolder = (id_folder) => {
       rest.getFilesofFolder(id_folder).then((response) =>{
           if (response.status == 200) {
               response.json().then((files) => {
                   this.setState({files})
               })
           }
       })
    }

    componentDidMount() {
        this.getFilesofFolder(1);
    }

    uploadFileToDB = (event) => {
        console.log('file : ', event.target.files[0])
        rest.uploadFileToDB(event.target.files[0]).then((response) => {
            console.log('response : ', response)
            if (response.status == 200) {
                this.getFilesofFolder(1)
                alert('Fichier importé avec succès')
            }
            else {
                alert('Erreur lors de l\'importation du fichier')
            }
        })
    }  

    render () {
        const { history } = this.props;
        console.log('files : ', this.state.files)
        return (
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
                        onChange={(event) => { this.props.changeCookie(event.value);
                        }}
                      />
                    </span>
                </div>   
                <hr/>
            </header>

            <div className="document">
                <BtnPrincipalPage page={'stockage'}/>
                <br/>
                <br/>
                <br/>
                <div>
                    <p><FormattedMessage id="stockage.body.p" /></p>
                </div>   
                <br/>
                <br/>
                <br/>
            
                <div className="fichier">
                    <p><b><FormattedMessage id="stockage.body.ImportFile" /></b></p>
                <div class="form-group" className="choseFile">
                    <Form>
                        <input type="file" id='file' class="form-control-file" id="exampleFormControlFile1" onChange={this.uploadFileToDB} />
                    </Form>
                </div>        
                </div>  
                <div>
                    <button class="rounded-pill" style={{marginLeft:"30%", marginTop:"3%" ,width:200,height:40, border:1}}><span style={{fontSize:23}}>+</span><FormattedMessage id="stockage.body.btnNewFile" /></button>
                    <button class="rounded-pill" style={{marginLeft:"3%", marginTop:"3%",width:200,height:40, border:1}}><img src={imageLogos} alt="logos" width="5%" height="5%"></img><FormattedMessage id="stockage.body.btnSearch" /></button>
                </div>

                <div className="logosFile" style={{marginLeft:350, marginTop:5}}>
                        {this.state.files.length > 0 && this.state.files.map((file, key) => {
                            return (
                                <span key={file.id}>
                                    {key % 3 == 0 && <br/>}
                                    <File file={file}/>
                                </span>
                            )
                        })}
                        <File />
                </div>
                
                <br/>
                <br/>
            </div>
            <div className="footerStockage">
                <p><FormattedMessage id="home.footer" /></p>  
                <a href="#" title="Rejoignez-nous sur Facebook"><img src={img9} width="20px"></img></a>
                <a href="#" title="Rejoignez-nous sur Twitter"><img src={img10} width="20px"></img></a>
                <a href="#" title="Rejoignez-nous sur LinkedIn"><img src={img11} width="20px"></img></a> 
            </div>
        </div>
        )
    }
}
           
export default withRouter(Stockage);