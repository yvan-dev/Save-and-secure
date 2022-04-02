import React from "react";
import img from "../images/image.png";
import Button from "react-bootstrap/Button";
import Select from "react-select";
import Form from "react-bootstrap/Form";
import { FormattedMessage } from "react-intl";
import BtnPrincipalPage from './btnPrincipalPage';
import { withRouter } from 'react-router';
import File from "./file";
import rest from "../API/rest";
import img9 from '../images/01.png';
import img10 from '../images/02.png';
import img11 from '../images/03.png';
import Spinner from 'react-bootstrap/Spinner';

const options = [
    { value: 'FR', label: 'Français' },
    { value: 'ENG', label: 'Anglais' },
]

class Stockage extends React.Component {
    constructor (props) {
        super(props);
        this.state = {user: null,
                    files: [],
                    loading: false,
        }
    } 

    getFilesofFolder = (id_folder) => {
        this.setState({loading: true})
       rest.getFilesofFolder(id_folder).then((response) =>{
           if (response.status == 200) {
               response.json().then((files) => {
                   this.setState({files, loading: false})
               })
           } else {
               this.setState({loading: false})
           }
       })
    }

    componentDidMount() {
        this.getFilesofFolder(1);
    }

    uploadFileToDB = (event) => {
        rest.uploadFileToDB(event.target.files[0]).then((response) => {
            if (response.status == 200) {
                this.getFilesofFolder(1)
                alert('Fichier importé avec succès')
            }
            else {
                alert('Erreur lors de l\'importation du fichier')
            }
        })
    }  

    getUserByFirstOrLastName = (name) => {
        rest.getUserByFirstOrLastName(name).then(response => {
            if (response.status == 200) {
                response.json().then((users) => {
                    this.setState({users})
                })
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
            <body>
            <div>
            {/* <form>
                <div style={{marginLeft:"78%"}}>
                    <input style={{ width:130, textAlign: "center" }} type="search" id="search" name="q" placeholder="Recherche" aria-label="Rechercher" size="10" onkeyup="getUserByFirstOrLastName(name)"></input>
                    <button style={{ width:100 }} class="research">Rechercher</button>
                </div>  
            </form> */}
            <form style={{marginLeft:"78%", width: 200}}>
                <span class="algolia-autocomplete" stype="positive: relative; display: inline-block; direction:ltr;">
                <input id="docs-search-input" 
                    class="form-control ds-input" 
                    type="text" 
                    placeholder="Recherche..." 
                    autocomplete="off" 
                    spellcheck="false" 
                    role="combobox" 
                    aria-autocomplete="list"
                    aria-expanded="false" 
                    aria-label="Search input" 
                    aria-owns="algolia-autocomplete-listbox-0" 
                    dir="auto">
                </input>
                </span>
            </form>

            </div>
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
                    <button class="rounded-pill" style={{marginLeft:"20%", marginTop:"3%" ,width:200,height:40, border:1}}><span style={{fontSize:23}}>+</span><FormattedMessage id="stockage.body.btnNewFile" /></button>
                </div>               

                <div className="logosFile" style={{marginLeft:350, marginTop:5}}>
                    {this.state.loading && 
                        <div id='loading' className="loading">
                            <Spinner animation="border" role="status">
                            </Spinner>
                        </div>
                    }
                        {this.state.files.length > 0 && this.state.files.map((file, key) => {
                            return (
                                <span key={file.id}>
                                    {key % 3 == 0 && <br/>}
                                    <File file={file}/>
                                </span>
                            )
                        })}
                </div>
                
                <br/>
                <br/>
            </div>
        </body>
            <div className="footerStockage">
                <p><FormattedMessage id="home.footer" /></p>  
                <a href="#" title="Rejoignez-nous sur Facebook"><img src={img9} width="30px"></img></a>
                <a href="#" title="Rejoignez-nous sur Twitter"><img src={img10} width="30px"></img></a>
                <a href="#" title="Rejoignez-nous sur LinkedIn"><img src={img11} width="30px"></img></a> 
            </div>
        </div>
        )
    }
}
           
export default withRouter(Stockage);