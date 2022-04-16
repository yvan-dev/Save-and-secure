import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import CodeIcon from '@mui/icons-material/Code';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import FolderZipIcon from '@mui/icons-material/FolderZip';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PanoramaIcon from '@mui/icons-material/Panorama';
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import TopicOutlinedIcon from '@mui/icons-material/TopicOutlined';
import { Alert, Button, FormControl, Paper, Skeleton, Snackbar, Stack, Typography, CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Grid from '@mui/material/Grid';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { ContextMenu, ContextMenuItem, ContextMenuTrigger } from 'rctx-contextmenu';
import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import rest from '../API/rest';
import HeaderHome from './HeaderHome';
import Upload from './Upload';
import { withCookies } from 'react-cookie';

class Stockage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null,
			storage: null,
			parentFolder: null,
			files: [],
			folders: [],
			navigationHistory: [],
			loading: false,
			uploadFile: false,
			renameDocId: null,
			anchorEl: null,
			showDrawer: false,
			alert: { display: false, severity: '', msg: '' },
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
			this.setState({ alert: { display: true, severity: 'error', msg: 'Erreur lors de la création du dossier racine (root /) ' } });
		}
	};

	addFolder = async (folderName, parentFolderId) => {
		const response = await rest.addFolder(folderName, parentFolderId);
		this.getFoldersOfParentFolder(this.state.parentFolder.id);
		if (response.status !== 200) this.setState({ alert: { display: true, severity: 'error', msg: await response.text() } });
	};

	getFoldersOfParentFolder = async (folderId) => {
		this.setState({ loading: true });
		try {
			this.getStorageUser();
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

	getStorageUser = async () => {
		try {
			let storage;
			const response = await rest.getStorageUser();
			if (response.status == 200) storage = await response.json();
			this.setState((prevState) => {
				if (prevState.storage != storage) return { storage };
			});
		} catch (error) {
			this.setState({ alert: { display: true, severity: 'error', msg: 'Erreur lors de la récupération du stockage' } });
		}
	};

	onUploadStart = () => {
		this.setState({ alert: { display: true, severity: 'warning', msg: 'Importation en cours ...' } });
	};

	onUploadEnd = () => {
		this.setState({ alert: { display: false, severity: '', msg: '' } });
		this.getFoldersOfParentFolder(this.state.parentFolder.id);
	};

	handleDownloadFile = async (fileName) => {
		try {
			this.setState({ alert: { display: true, severity: 'warning', msg: 'Téléchargement en cours ...' } });
			const response = await rest.downloadFileFromDB(fileName);
			const file = await response.blob();
			const link = document.createElement('a');
			link.href = window.URL.createObjectURL(file);
			link.download = fileName;
			this.setState({ alert: { display: false, severity: '', msg: '' } });
			link.click();
		} catch (error) {
			this.setState({ alert: { display: true, severity: 'error', msg: 'Erreur lors du téléchargement du fichier' } });
		}
	};

	deleteDoc = (doc) => {
		this.setState({ alert: { display: true, severity: 'warning', msg: 'Suppression en cours' } });
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
			if (response.status == 200) this.setState({ alert: { display: true, severity: 'success', msg: 'Fichier supprimé' } });
		} catch (error) {
			this.setState({ alert: { display: true, severity: 'error', msg: 'Erreur lors de la suppression du fichier' } });
		} finally {
			this.getFoldersOfParentFolder(this.state.parentFolder.id);
		}
	};

	deleteFolder = async (id_folder) => {
		try {
			const response = await rest.deleteFolder(id_folder);
			if (response.status == 200) this.setState({ alert: { display: true, severity: 'success', msg: 'Dossier supprimé' } });
		} catch (error) {
			this.setState({ alert: { display: true, severity: 'error', msg: 'Erreur lors de la suppression du dossier' } });
		} finally {
			this.getFoldersOfParentFolder(this.state.parentFolder.id);
		}
	};

	updateFileName = async (id_file, file_name) => {
		try {
			const response = await rest.updateFileName(id_file, file_name);
			if (response.status != 200) this.setState({ alert: { display: true, severity: 'error', msg: await response.text() } });
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
			if (response.status != 200) this.setState({ alert: { display: true, severity: 'error', msg: await response.text() } });
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
		this.setState({ alert: { display: false, severity: '', msg: '' } });
	};

	render () {
		const { cookies } = this.props;
		let docs = [...this.state.folders, ...this.state.files];
		let storageRemain = this.state.storage != null ? (this.state.storage.restant / this.state.storage.total) * 100 : 0.0;
		return (
			<div>
				<HeaderHome user={this.state.user} />
				<Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
					<Grid item xs={12} sm={2} md={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
						<Grid container spacing={3} sx={{ pl: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
							<Grid item>
								<CircularProgressbar value={storageRemain} text={storageRemain + '%'} strokeWidth={7} background={true} />
							</Grid>
							<Grid item>
								{this.state.storage != null ? (
									<Typography variant='body1' component='p' color='primary'>
										<b>
											{this.state.storage != null && this.state.storage.restant} Mo / {this.state.storage != null && this.state.storage.total} Mo{' '}
										</b>
									</Typography>
								) : (
									<Skeleton animation='wave' variant='text' width={100} />
								)}
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={ 12 } md={ 10 } sm={ 9 } sx={{ pr: 1, pl: 1,  display: 'flex', flexDirection: 'column'}}>
						<Grid item sx={ {mb: 3} }>
							<Upload parentFolderId={this.state.parentFolder != null && this.state.parentFolder.id} onUploadStart={this.onUploadStart} onUploadEnd={this.onUploadEnd} />
						</Grid>
						<Grid item>
							<Grid container spacing={{ xs: 2, md: 6, sm: 10 }} sx={{ display: 'flex', flexDirection: 'row' }}>
								<Grid item xs={12} md={7} sm={7}>
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
								<Grid item xs={12} md={5} sm={5}>
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
								minHeight: '56vh',
								maxHeight: '100vh',
								opacity: [0.9, 0.8, 0.7],
								borderColor: 'primary.dark',
								'&:hover': {
									borderColor: 'primary.main',
									opacity: [1, 1, 1],
								},
							}}
						>
							<ImageList cols={cookies.get('device') != null && cookies.get('device') === 'mobile' ? 2 : 4}>
								{this.state.loading &&
									[0, 1, 2, 3, 4, 5].map((i, index) => {
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
										if (doc.numberOfFile != null) docIcon = <FolderRoundedIcon color='warning' sx={{ fontSize: '500%' }} />;
										else {
											docIcon = <InsertDriveFileIcon sx={{ color: '#0658c2', fontSize: '500%' }} />;
											if (doc.name != undefined && doc.name.includes('.pdf')) docIcon = <PictureAsPdfRoundedIcon sx={{ color: 'red', fontSize: '500%' }} />;
											if ((doc.name != undefined && ['.jpg', '.png', '.gif', '.png'].findIndex((type) => doc.name.includes(type))) != -1)
												docIcon = <PanoramaIcon color='success' sx={{ fontSize: '500%' }} />;
											if ((doc.name != undefined && ['.js', '.html', '.css', '.php', '.java'].findIndex((type) => doc.name.includes(type))) != -1)
												docIcon = <CodeIcon color='info' sx={{ fontSize: '500%' }} />;
											if ((doc.name != undefined && ['.zip', '.tar', '.rar'].findIndex((type) => doc.name.includes(type))) != -1)
												docIcon = <FolderZipIcon color='error' sx={{ fontSize: '500%' }} />;
											if ((doc.name != undefined && ['.docx', '.doc', '.txt'].findIndex((type) => doc.name.includes(type))) != -1)
												docIcon = <TextSnippetIcon sx={{ color: '#0658c2', fontSize: '500%' }} />;
										}
										return (
											<ImageListItem key={key} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
												<ContextMenuTrigger id={'menu-' + key}>
													<Box
														className='contextMenu'
														onClick={() => {
															doc.numberOfFile != undefined
																? this.setState({ parentFolder: doc, navigationHistory: [...this.state.navigationHistory, doc] }, () => {
																		this.getFoldersOfParentFolder(doc.id);
																  })
																: this.handleDownloadFile(doc.name);
														}}
														sx={{ cursor: 'pointer' }}
													>
														{docIcon}
														{this.state.renameDocId !== 'rename_' + doc.id ? (
															<ImageListItemBar title={doc.name} position='below' />
														) : (
															<FormControl
																component='form'
																onClick={(event) => event.stopPropagation()}
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
																	helperText='Nouveau nom'
																	variant='standard'
																	sx={{ width: '100%' }}
																	autoFocus={true}
																	InputProps={{
																		endAdornment: (
																			<InputAdornment position='end'>
																				<CloseIcon
																					color='error'
																					sx={{ cursor: 'pointer' }}
																					onClick={(e) => {
																						e.stopPropagation();
																						this.setState({ renameDocId: null });
																					}}
																				/>
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
													<ContextMenuItem disabled={doc.numberOfFile != undefined} onClick={() => this.handleDownloadFile(doc.name)}>
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
				<Snackbar open={this.state.alert.display} onClose={this.closeSnackbar}>
					<Alert onClose={this.closeSnackbar} severity={this.state.alert.severity} sx={{ width: '100%' }}>
						<Typography component='p' variant='body1'>
							{this.state.alert.msg}
						</Typography>
					</Alert>
				</Snackbar>
			</div>
		);
	}
}

export default withRouter(withCookies(Stockage));
