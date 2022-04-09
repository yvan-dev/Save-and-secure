import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import Typography from '@mui/material/Typography';
import React from 'react';
import { FileUploader } from 'react-drag-drop-files';

import rest from '../API/rest';

class Upload extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
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
		const fileTypes = ['JPG', 'PNG', 'GIF', 'PDF', 'EXE', 'RAR', 'ZIP', 'TAR'];
		return <FileUploader children={<Children />} handleChange={this.uploadFileToDB} name='file' multiple={true} types={fileTypes} classes='uploadFile' />;
	}
}

function Children(props) {
	return (
		<div className='childrenUpload'>
			<CloudUploadOutlinedIcon fontSize='large' sx={{ color: '#0658c2' }} />
			<Typography component='p' variant='body1'>
				Cliquer ou déposer vos fichiers pour les importer
			</Typography>
		</div>
	);
}

export default Upload;
