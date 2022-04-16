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

	uploadFileToDB = async (files) => {
		this.props.onUploadStart();
		try {
			for (let index = 0; index < files.length; index++) {
				const response = await rest.uploadFileToDB(files[index], this.props.parentFolderId);
				response.status != 200 && this.props.onUploadEnd();
			}
			this.props.onUploadEnd();
		} catch (error) {
			this.props.onUploadEnd();
		}
	};

	render() {
		const fileTypes = ['JPG', 'PNG', 'GIF', 'PDF', 'EXE', 'RAR', 'ZIP', 'TAR'];
		return <FileUploader children={<Children />} handleChange={this.uploadFileToDB} name='file' multiple={true} classes='uploadFile' />;
	}
}

function Children(props) {
	return (
		<div className='childrenUpload'>
			<CloudUploadOutlinedIcon fontSize='large' sx={{ color: '#0658c2' }} />
			<Typography component='p' variant='body1' color='primary'>
				Cliquer ou déposer vos fichiers pour les importer
			</Typography>
		</div>
	);
}

export default Upload;
