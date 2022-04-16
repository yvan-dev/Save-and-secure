import { FormattedMessage } from 'react-intl';
import img from '../images/cloud-storage.png';
import img2 from '../images/cloud.png';

const SiteInfo = () => {
	return (
		<div>
			<div className='image'>
				<img src={img} style={{ width: '25%', height: '25%' }} alt='logos' />
			</div>
			<div className='texte'>
				<h3>
					<b>
						<FormattedMessage id='home.body.texte' />
						<br></br>
						<FormattedMessage id='home.body.suiviTexte' />
					</b>
				</h3>
				<h6>
					<p>
						<FormattedMessage id='home.body.texte.P1' />
						<br></br>
						<FormattedMessage id='home.body.texte.P2' />
						<br></br>
						<FormattedMessage id='home.body.texte.P3' />
						<br></br>
						<FormattedMessage id='home.body.texte.P4' />
						<br></br>
						<FormattedMessage id='home.body.texte.P5' />
					</p>
				</h6>
			</div>
			<div className='text'>
				<h3>
					<b>
						<FormattedMessage id='home.body.text' />
					</b>
				</h3>
				<h6>
					<p>
						<FormattedMessage id='home.body.text.P1' />
						<br></br>
						<FormattedMessage id='home.body.text.P2' />
						<br></br>
						<FormattedMessage id='home.body.text.P3' />
						<br></br>
						<FormattedMessage id='home.body.text.P4' />
						<br></br>
						<FormattedMessage id='home.body.text.P5' />
						<br></br>
						<FormattedMessage id='home.body.text.P6' />
					</p>
				</h6>
			</div>
			<div className='img2'>
				<img src={img2} alt='logos' style={{ width: '60%', height: '60%' }} />
			</div>
			<br />
			<br />
			<br />
		</div>
	);
};

export default SiteInfo;
