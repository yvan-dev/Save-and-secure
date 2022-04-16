import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';
import network from '../images/network.PNG';
import Footer from './footer';
import Header from './Header';

const options = [
	{ value: 'FR', label: 'Français' },
	{ value: 'ENG', label: 'Anglais' },
];

function Propos(props) {
	const history = useHistory();
	return (
		<div>
			<Header cookies={props.cookies} changeCookie={props.changeCookie} />

			<body>
				<div className='cloud'>
					<h3>
						<p>
							<b>
								<FormattedMessage id='propos.body.H3' />
							</b>
						</p>
					</h3>

					<p>
						<FormattedMessage id='propos.body.P1' /> <br />
						<FormattedMessage id='propos.body.P2' />
						<br />
					</p>

					<p>
						<FormattedMessage id='propos.body.P3' /> <br />
						<FormattedMessage id='propos.body.P4' /> <br />
						<FormattedMessage id='propos.body.P5' />
						<br />
					</p>

					<p>
						<FormattedMessage id='propos.body.P6' /> <br />
						<FormattedMessage id='propos.body.P7' /> <br />
						<FormattedMessage id='propos.body.P8' />
					</p>
				</div>
				<br />
				<div className='cloud'>
					<h3>
						<p>
							<b>
								<FormattedMessage id='propos.body.h3' />
							</b>
						</p>
					</h3>

					<p>
						<FormattedMessage id='propos.body.p1' />
						<br />
						<FormattedMessage id='propos.body.p2' />
						<br />
						<FormattedMessage id='propos.body.p3' />
					</p>
				</div>
				<div className='network'>
					<img src={network} alt='logos' width='40%'></img>
				</div>
			</body>
			<Footer />
		</div>
	);
}

export default Propos;
