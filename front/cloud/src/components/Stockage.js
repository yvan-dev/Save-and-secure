import AddIcon from '@mui/icons-material/Add';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import TopicOutlinedIcon from '@mui/icons-material/TopicOutlined';
import { Button, CircularProgress, Paper, Skeleton, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Grid from '@mui/material/Grid';
import ImageList from '@mui/material/ImageList';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { ContextMenuTrigger, ContextMenu, ContextMenuItem } from 'rctx-contextmenu';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import rest from '../API/rest';
import HeaderHome from './HeaderHome';
import Upload from './Upload';

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
				<Grid container spacing={6}>
					<Grid item xs={2} sm={2} md={2} sx={{ ml: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
						<Box
							component={Paper}
							elevation={6}
							sx={{
								position: 'relative',
								display: 'inline-flex',
								width: '100%',
								height: '100%',
								borderColor: 'primary.dark',
								opacity: [0.9, 0.8, 0.7],
								'&:hover': {
									borderColor: 'primary.main',
									opacity: [1, 1, 1],
								},
							}}
						>
							<CircularProgress variant='determinate' value={55} size='70%' thickness={5} sx={{ position: 'relative', top: '0%', left: '100%', ml: '12%' }} />
							<Box
								sx={{
									top: 0,
									left: 0,
									bottom: '30%',
									right: '3%',
									position: 'absolute',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<Typography variant='h4' component='h4' color='text.secondary'>
									55%
								</Typography>
							</Box>
						</Box>
					</Grid>
					<Grid item spacing={3} xs={9} md={9} sm={9} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
						<Grid item>
							<Upload />
						</Grid>
						<Grid item spacing={3} sx={{ mt: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
							<Grid item xs={9} md={5} sm={5}>
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
									sx={{ width: '100%' }}
								/>
							</Grid>
							<Grid item xs={9} md={4} sm={4}>
								<Button color='success' variant='outlined' startIcon={<AddIcon fontSize='large' />} sx={{ width: '100%', height: '100%' }}>
									<Typography component='p' variant='body1'>
										<FormattedMessage id='stockage.body.btnNewFile' />
									</Typography>
								</Button>
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
							component={Paper}
							elevation={3}
							sx={{
								width: '100%',
								height: '100%',
								opacity: [0.9, 0.8, 0.7],
								borderColor: 'primary.dark',
								'&:hover': {
									borderColor: 'primary.main',
									opacity: [1, 1, 1],
								},
							}}
						>
							<ImageList cols={3} rowHeight={150} sx={{ width: '100%', height: '100%' }}>
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
											<ContextMenuTrigger id={'menu-' + key} className='contextMenu'>
												<InsertDriveFileIcon fontSize='large' sx={{ color: '#0658c2' }} />
												<ImageListItemBar title={file.name} position='below' />
											</ContextMenuTrigger>
											<ContextMenu id={'menu-' + key} animation='zoom' preventHideOnResize={true} preventHideOnScroll={true}>
												<ContextMenuItem>
													<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
														<DeleteRoundedIcon fontSize='large' color='error' />
														<Typography component='p' variant='body1' color='error' sx={{ ml: 2 }}>
															Supprimer
														</Typography>
													</div>
												</ContextMenuItem>
												<ContextMenuItem>
													<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
														<DriveFileRenameOutlineRoundedIcon fontSize='large' color='primary' />
														<Typography component='p' variant='body1' color='primary' sx={{ ml: 2 }}>
															Renommer
														</Typography>
													</div>
												</ContextMenuItem>
												<ContextMenuItem>
													<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
														<FileDownloadRoundedIcon fontSize='large' color='success' />
														<Typography component='p' variant='body1' sx={{ ml: 2, color: 'green' }}>
															Télécharger
														</Typography>
													</div>
												</ContextMenuItem>
											</ContextMenu>
										</ImageListItem>
									))}
							</ImageList>
						</Box>
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default withRouter(Stockage);
