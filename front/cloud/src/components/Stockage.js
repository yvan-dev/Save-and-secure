import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import TopicOutlinedIcon from '@mui/icons-material/TopicOutlined';
import { Button, Skeleton, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Grid from '@mui/material/Grid';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import React from 'react';
import { withRouter } from 'react-router';
import rest from '../API/rest';
import HeaderHome from './HeaderHome';
import Upload from './Upload';

// import img4 from '../images/loupe.PNG';

const options = [
	{ value: 'FR', label: 'Français' },
	{ value: 'ENG', label: 'Anglais' },
];

class Stockage extends React.Component {
	constructor(props) {
		super(props);
		this.state = { user: null, files: [], loading: false, anchorEl: null, showDrawer: false };
	}

	getFilesofFolder = (id_folder) => {
		this.setState({ loading: true });
		rest.getFilesofFolder(id_folder).then((response) => {
			if (response.status == 200) {
				response.json().then((files) => {
					this.setState({ files, loading: false });
				});
			} else {
				this.setState({ loading: false });
			}
		});
	};

	getUserLogged = async () => {
		try {
			let user;
			let response = await rest.getUserLogged();
			console.log({ response });
			if (response.status == 200) user = await response.json();
			this.setState({ user });
		} catch (error) {
			console.error('error getting user logged');
		}
	};

	componentDidMount() {
		this.getUserLogged();
		this.getFilesofFolder(1);
	}

	uploadFileToDB = (event) => {
		rest.uploadFileToDB(event.target.files[0]).then((response) => {
			if (response.status == 200) {
				this.getFilesofFolder(1);
				alert('Fichier importé avec succès');
			} else {
				alert("Erreur lors de l'importation du fichier");
			}
		});
	};

	render() {
		const { history } = this.props;
		const fileTypes = ['JPG', 'PNG', 'GIF', 'PDF', 'EXE', 'RAR', 'ZIP', 'TAR'];
		return (
			<div>
				<HeaderHome user={this.state.user} />
				<Grid container spacing={4} xs={12} sm={12} md={12} lg={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
					<Grid item xs={12} sm={12} md={12} lg={12}>
						<Upload />
					</Grid>
					<Grid item xs={12} sm={12} md={12}>
						<TextField
							id='search'
							placeholder='Nom, extension, ...'
							label='Rechercher un fichier ou un dossier'
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<SearchOutlinedIcon />
									</InputAdornment>
								),
							}}
							variant='outlined'
							sx={{ width: '50vh' }}
						/>
					</Grid>
				</Grid>
				<Breadcrumbs separator='>' sx={{ mt: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
					<Button sx={{ color: 'primary.dark', opacity: [0.9, 0.8, 0.7] }}>
						<HomeOutlinedIcon sx={{ mr: 1 }} />
						Home
					</Button>
					<Button sx={{ color: 'primary.main' }}>
						<TopicOutlinedIcon sx={{ mr: 1 }} />
						Cours
					</Button>
				</Breadcrumbs>
				<Box
					sx={{
						width: '80%',
						marginLeft: '10%',
						opacity: [0.9, 0.8, 0.7],
						borderColor: 'primary.dark',
						'&:hover': {
							borderColor: 'primary.main',
							opacity: [1, 1, 1],
						},
					}}
				>
					<ImageList cols={3} rowHeight={164} sx={{ width: '100%', height: '100%' }}>
						{this.state.loading &&
							[0, 1, 2, 3, 5, 6].map((i, index) => {
								return (
									<Stack key={index} spacing={1} sx={{ mt: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
										<Skeleton animation='wave' variant='rectangular' width={100} height={60} />
										<Skeleton animation='wave' variant='text' width={100} />
									</Stack>
								);
							})}
						{this.state.files.length > 0 &&
							this.state.files.map((file, key) => (
								<ImageListItem key={key} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
									<InsertDriveFileIcon fontSize='large' sx={{ color: '#0658c2' }} />
									<ImageListItemBar title={file.name} position='below' />
								</ImageListItem>
							))}
					</ImageList>
				</Box>
			</div>
		);
	}
}

export default withRouter(Stockage);
