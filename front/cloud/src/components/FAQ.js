
import Header from './Header';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import img from '../images/image.png';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import Footer from './footer';
import network from '../images/nuage.jpg';

const options = [
	{ value: 'FR', label: 'Français' },
	{ value: 'ENG', label: 'Anglais' },
];

const Faq = (props) => {
	const history = useHistory();
	return (
		<div>
			<Header cookies={props.cookies} changeCookie={props.changeCookie} />
			<div>
				<div className='FAQ' style={{marginTop: 20}}>
					<p>
						<b>
							<FormattedMessage id='faq.body.cloud1' />
						</b>
					</p>
					<p>
						<FormattedMessage id='faq.body.cloud2' />
						<br />
						<FormattedMessage id='faq.body.cloud3' />
					</p>
					<br />
					<p>
						<b>
							<FormattedMessage id='faq.body.cloud4' />
						</b>
					</p>
					<p>
						<FormattedMessage id='faq.body.cloud5' />
						<br />
						<FormattedMessage id='faq.body.cloud6' /> <br />
						<FormattedMessage id='faq.body.cloud7' />
						<br />
						<FormattedMessage id='faq.body.cloud8' />
						<br />
						<FormattedMessage id='faq.body.cloud9' />
						<br />
						<FormattedMessage id='faq.body.cloud10' />
					</p>
					<br />
					<p>
						<b>
							<FormattedMessage id='faq.body.cloud11' />
						</b>
					</p>
					<p>
						<FormattedMessage id='faq.body.cloud12' /> <br />
						<FormattedMessage id='faq.body.cloud13' /> <br />
						<FormattedMessage id='faq.body.cloud14' />
						<br />
						<FormattedMessage id='faq.body.cloud15' />
					</p>
					<br />
				</div>
				<div className='network'>
					<img src={network} alt='logos' width='30%'></img>
				</div>
				<br />
				<br />
				<div className='FAQ'>
					<p>
						<b>
							<FormattedMessage id='faq.body.cloud16' />
						</b>
					</p>
					<p>
						<FormattedMessage id='faq.body.cloud17' /> <br />
						<FormattedMessage id='faq.body.cloud18' />
						<br />
						<FormattedMessage id='faq.body.cloud19' />
						<br />
						<FormattedMessage id='faq.body.cloud20' />
					</p>
					<br />
					<br />
				</div>
				<Footer />
			</div>
			)
			<div>
				<span style={{ color: 'blue' }}>
					<label onClick={() => history.push('/faq_first')}>Comment se connecter</label>
				</span>
			</div>
		</div>
	);
};

export default Faq;
