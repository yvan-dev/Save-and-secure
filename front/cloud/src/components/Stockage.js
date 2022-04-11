import AddIcon from '@mui/icons-material/Add';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import TopicOutlinedIcon from '@mui/icons-material/TopicOutlined';
import { Button, CircularProgress, Paper, Skeleton, Stack, Typography, Snackbar, Alert, fabClassesn, FormControl } from '@mui/material';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Grid from '@mui/material/Grid';
import ImageList from '@mui/material/ImageList';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import ImageListItem from '@mui/material/ImageListItem';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import PanoramaIcon from '@mui/icons-material/Panorama';
import InputAdornment from '@mui/material/InputAdornment';
import FolderZipIcon from '@mui/icons-material/FolderZip';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import CodeIcon from '@mui/icons-material/Code';
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
		this.state = {
			user: null,
			parentFolder: null,
			files: [],
			folders: [],
			navigationHistory: [],
			loading: false,
			uploadFile: false,
			renameDocId: null,
			anchorEl: null,
			showDrawer: false,
		};
	}

	componentDidMount() {
		this.getUserLogged();
		this.getRootFolder();
	}

	updateNavigationHistory = (navigationElt) => {
		const navigationEltIndex = this.state.navigationHistory.indexOf(navigationElt);
		const newNaviHistory = this.state.navigationHistory.filter((item, index) => index <= navigationEltIndex);
		this.setState({ navigationHistory: newNaviHistory, parentFolder: navigationElt }, () => {
			this.getFoldersOfParentFolder(navigationElt.id);
		});
	};

	getRootFolder = async () => {
		try {
			let response = await rest.getRootFolder();
			if (response.status === 404) {
				await rest.createRootFolder();
				response = await rest.getRootFolder();
			}
			const parentFolder = await response.json();
			this.setState({ parentFolder, navigationHistory: [...this.state.navigationHistory, parentFolder] }, () => {
				this.getFoldersOfParentFolder(parentFolder.id);
			});
		} catch (error) {
			console.error('Erreur lors de la création du dossier racine (root /) : ');
		}
	};

	addFolder = async (folderName, parentFolderId) => {
		const response = await rest.addFolder(folderName, parentFolderId);
		this.getFoldersOfParentFolder(this.state.parentFolder.id);
		if (response.status !== 200) alert('Erreur lors de la création du dossier');
	};

	getFoldersOfParentFolder = async (folderId) => {
		this.setState({ loading: true });
		try {
			const response = await rest.getFoldersOfParentFolder(folderId);
			if (response.status == 200) {
				const folders = await response.json();
				this.setState({ folders }, () => {
					this.getFilesofFolder(folderId);
				});
			}
		} catch (error) {
			this.setState({ loading: false });
		}
	};

	getFilesofFolder = (id_folder) => {
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
			const response = await rest.getUserLogged();
			if (response.status == 200) user = await response.json();
			this.setState({ user });
		} catch (error) {
			console.error('error getting user logged');
		}
	};

	onUploadStart = () => {
		this.setState({ uploadFile: true });
	};

	onUploadEnd = () => {
		this.setState({ uploadFile: false });
		this.getFoldersOfParentFolder(this.state.parentFolder.id);
	};

	deleteDoc = (doc) => {
		if (doc.numberOfFile != undefined) this.deleteFolder(doc.id);
		else this.deleteFile(doc.id);
	};

	updateDocName = (doc, newName) => {
		if (doc.numberOfFile != undefined) this.updateFolderName(doc.id, newName);
		else this.updateFileName(doc.id, newName);
	};

	deleteFile = async (id_file) => {
		try {
			const response = await rest.deleteFile(id_file);
			if (response == 200) alert('Fichier supprimé avec succès');
		} catch (error) {
			alert('Erreur lors de la suppression du fichier');
		} finally {
			this.getFoldersOfParentFolder(this.state.parentFolder.id);
		}
	};

	deleteFolder = async (id_folder) => {
		try {
			const response = await rest.deleteFolder(id_folder);
			if (response == 200) alert('Dossier supprimé avec succès');
		} catch (error) {
			alert('Erreur lors de la suppression du dossier');
		} finally {
			this.getFoldersOfParentFolder(this.state.parentFolder.id);
		}
	};

	updateFileName = async (id_file, file_name) => {
		try {
			const response = await rest.updateFileName(id_file, file_name);
		} catch (error) {
			alert(error);
		} finally {
			this.setState({ renameDocId: false });
			this.getFoldersOfParentFolder(this.state.parentFolder.id);
		}
	};

	updateFolderName = async (id_folder, folder_name) => {
		try {
			const response = await rest.updateFolderName(id_folder, folder_name);
		} catch (error) {
			alert(error);
		} finally {
			this.setState({ renameDocId: null });
			this.getFoldersOfParentFolder(this.state.parentFolder.id);
		}
	};

	handleRename = (doc) => {
		return (
			<Box component='form' onSubmit={(event) => this.updateDocName(doc, event.currentTarget.get('rename_' + doc.id))} sx={{ mt: 3 }}>
				<TextField id={'rename_' + doc.id} name={'rename_' + doc.id} placeholder={doc.name} variant='outlined' sx={{ width: '100%' }} />
			</Box>
		);
	};

	closeSnackbar = () => {
		this.setState({ uploadFile: false });
	};

	render() {
		let docs = [...this.state.folders, ...this.state.files];
		return (
			<div>
				<HeaderHome user={this.state.user} />
				<Grid container spacing={{ xs: 2, sm: 3, md: 6 }}>
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
							{/* <CircularProgress variant='determinate' value={55} size='70%' thickness={5} sx={{ position: 'relative', top: '0%', left: '100%', ml: '12%' }} />
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
							</Box> */}
						</Box>
					</Grid>
					<Grid item spacing={3} xs={9} md={9} sm={9} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
						<Grid item>
							<Upload parentFolderId={this.state.parentFolder != null && this.state.parentFolder.id} onUploadStart={this.onUploadStart} onUploadEnd={this.onUploadEnd} />
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
								<Button
									color='success'
									variant='outlined'
									startIcon={<AddIcon fontSize='large' />}
									sx={{ width: '100%', height: '100%' }}
									onClick={() => this.addFolder('new folder', this.state.parentFolder.id)}
								>
									<Typography component='p' variant='body1'>
										<FormattedMessage id='stockage.body.btnNewFile' />
									</Typography>
								</Button>
							</Grid>
						</Grid>
						<Breadcrumbs separator='>' sx={{ mt: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
							{this.state.navigationHistory != null &&
								this.state.navigationHistory.map((naviItem, index) => {
									const icon = naviItem.name === '/' ? <HomeOutlinedIcon sx={{ mr: 1 }} /> : <TopicOutlinedIcon sx={{ mr: 1 }} />;
									const title = naviItem.name === '/' ? 'Home' : naviItem.name;
									const opacity = naviItem.id === this.state.navigationHistory[this.state.navigationHistory.length - 1].id ? [1, 1, 1] : [0.9, 0.8, 0.7];

									return (
										<Button key={index} onClick={() => this.updateNavigationHistory(naviItem)} sx={{ color: 'primary.dark', opacity: opacity }}>
											{icon}
											{title}
										</Button>
									);
								})}
						</Breadcrumbs>
						<Box
							component={Paper}
							elevation={3}
							sx={{
								width: '100%',
								minHeight: '57vh',
								maxHeight: '100vh',
								// height: '100%',
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
								{!this.state.loading &&
									docs.map((doc, key) => {
										let docIcon;
										if (doc.numberOfFile != null) docIcon = <FolderRoundedIcon fontSize='large' color='warning' />;
										else {
											docIcon = <InsertDriveFileIcon fontSize='large' sx={{ color: '#0658c2' }} />;
											if (doc.name != undefined && doc.name.includes('.pdf')) docIcon = <PictureAsPdfRoundedIcon fontSize='large' sx={{ color: 'red' }} />;
											if ((doc.name != undefined && ['.jpg', '.png', '.gif', '.png'].findIndex((type) => doc.name.includes(type))) != -1)
												docIcon = <PanoramaIcon fontSize='large' color='success' />;
											if ((doc.name != undefined && ['.js', '.html', '.css', '.php', '.java'].findIndex((type) => doc.name.includes(type))) != -1)
												docIcon = <CodeIcon fontSize='large' color='info' />;
											if ((doc.name != undefined && ['.zip', '.tar', '.rar'].findIndex((type) => doc.name.includes(type))) != -1)
												docIcon = <FolderZipIcon fontSize='large' color='error' />;
											if ((doc.name != undefined && ['.docx', '.doc', '.txt'].findIndex((type) => doc.name.includes(type))) != -1)
												docIcon = <TextSnippetIcon fontSize='large' sx={{ color: '#0658c2' }} />;
										}
										return (
											<ImageListItem key={key} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
												<ContextMenuTrigger id={'menu-' + key}>
													<Box
														className='contextMenu'
														onClick={() => {
															doc.numberOfFile != undefined &&
																this.setState({ parentFolder: doc, navigationHistory: [...this.state.navigationHistory, doc] }, () => {
																	this.getFoldersOfParentFolder(doc.id);
																});
														}}
														sx={{ cursor: 'pointer' }}
													>
														{docIcon}
														{this.state.renameDocId !== 'rename_' + doc.id ? (
															<ImageListItemBar title={doc.name} position='below' />
														) : (
															<FormControl
																component='form'
																onSubmit={(event) => {
																	event.preventDefault();
																	this.updateDocName(doc, document.getElementById('rename_' + doc.id).value);
																}}
																sx={{ mt: 2, width: '70%' }}
															>
																<TextField
																	id={'rename_' + doc.id}
																	name={'rename_' + doc.id}
																	placeholder={doc.name}
																	variant='standard'
																	sx={{ width: '100%' }}
																	autoFocus={true}
																	InputProps={{
																		endAdornment: (
																			<InputAdornment position='end'>
																				<CloseIcon color='error' sx={ { cursor: 'pointer' } } onClick={ (e) => { e.stopPropagation(); this.setState({ renameDocId: null })}} />
																			</InputAdornment>
																		),
																	}}
																/>
															</FormControl>
														)}
													</Box>
												</ContextMenuTrigger>
												<ContextMenu id={'menu-' + key} animation='zoom' preventHideOnResize={true} preventHideOnScroll={true}>
													<ContextMenuItem onClick={() => this.deleteDoc(doc)}>
														<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
															<DeleteRoundedIcon fontSize='large' color='error' />
															<Typography component='p' variant='body1' color='error' sx={{ ml: 2 }}>
																Supprimer
															</Typography>
														</div>
													</ContextMenuItem>
													<ContextMenuItem onClick={() => this.setState({ renameDocId: 'rename_' + doc.id })}>
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
										);
									})}
							</ImageList>
						</Box>
					</Grid>
				</Grid>
				<Snackbar open={this.state.uploadFile} onClose={this.closeSnackbar}>
					<Alert onClose={this.closeSnackbar} severity='warning' sx={{ width: '100%' }}>
						<Typography component='p' variant='body1'>
							Importation en cours ...
						</Typography>
					</Alert>
				</Snackbar>
			</div>
		);
	}
}

export default withRouter(Stockage);
