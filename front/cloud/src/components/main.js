import React from 'react';
import img from '../images/cloud-storage.png';
import img2 from '../images/cloud.png';

const SiteInfo = () => {
    return (
        <div>
            <div className="image">
              <img src={img} alt="logos" width="25%" height="25%"></img>
            </div>
            <div className="texte">
              <h3><b>Sauvegardez tous vos <br></br>fichiers et dossiers</b></h3>
              <h6><p>Quel que soit le type ou le dossier que vous<br></br> 
               voulez sauvegarder (photos, vidéos, présentations<br></br>  
               PowerPoint ou fichiers de CAO volumineux), il sera<br></br>  
               stocké de façon sécurisée grâce aux solutions de<br></br>
               stockage cloud de S&S Cloud.</p></h6>
            </div>
            <div className="text">
              <h3><b>Protégez vos données</b></h3>
              <h6><p>En cas de perte ou de vol de votre appareil, vous gardez<br></br> 
               l'esprit tranquille, car toutes vos données sont<br></br> 
               sécurisées. L'éffacement à distance vous permet de<br></br> 
               supprimer tous les fichiers ou dosssiers du compte S&S<br></br>
               installé sur l'appareil. Tous vos fichiers sont sécurisés<br></br> 
               dans le cloud et sauvegardés en plusieurs exemplaires.</p></h6> 
            </div>
            <div className="img2">
              <img src={img2} alt="logos" width="55%" height="55%"></img>
            </div>
        </div>
    ); 
}

export default SiteInfo;