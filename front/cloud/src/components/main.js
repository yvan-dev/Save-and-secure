import { Grid, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import img from '../images/cloud-storage.png';
import img2 from '../images/cloud.png';

const SiteInfo = () => {
	return (
		<Grid container spacing={{ xs: 4, sm: 6, md: 8 }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
			<Grid item xs={12} sm={5} md={5} sx={{ mt: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
				<img src={img} style={{ width: '75%', height: '75%' }} alt='logos' />
			</Grid>
			<Grid item xs={12} sm={5} md={5} sx={{ m: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
				<Typography component='p' variant='h4'>
					<FormattedMessage id='home.body.texte' /> <FormattedMessage id='home.body.suiviTexte' />
				</Typography>
				<Typography component='p' variant='body1'>
					<FormattedMessage id='home.body.texte.P1' /> <FormattedMessage id='home.body.texte.P2' /> <FormattedMessage id='home.body.texte.P3' />{' '}
					<FormattedMessage id='home.body.texte.P4' /> <FormattedMessage id='home.body.texte.P5' />
				</Typography>
			</Grid>
			<Grid item xs={12} sm={5} md={5} sx={{ m: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
				<Typography component='p' variant='h4' sx={{ mb: 2 }}>
					<FormattedMessage id='home.body.text' />
				</Typography>
				<Typography component='p' variant='body1'>
					<FormattedMessage id='home.body.text.P1' /> <FormattedMessage id='home.body.text.P2' /> <FormattedMessage id='home.body.text.P3' />
					<FormattedMessage id='home.body.text.P4' /> <FormattedMessage id='home.body.text.P5' /> <FormattedMessage id='home.body.text.P6' />
				</Typography>
			</Grid>
			<Grid item xs={12} sm={5} md={5} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
				<img src={img2} alt='logos' style={{ width: '75%', height: '75%' }} />
			</Grid>
		</Grid>
	);
};

export default SiteInfo;
