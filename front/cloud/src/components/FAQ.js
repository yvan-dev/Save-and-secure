import { useHistory } from 'react-router-dom';
import Header from './Header';

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
				<span style={{ color: 'blue' }}>
					<label onClick={() => history.push('/faq_first')}>Comment se connecter</label>
				</span>
			</div>
		</div>
	);
};

export default Faq;
