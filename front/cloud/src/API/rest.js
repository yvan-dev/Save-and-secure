const apiUrl = 'https://yvandev.fr/save-and-safe';
let token = document.cookie;
if (token.indexOf('token') !== -1) {
    token = token.split(';')[1].split('=')[1].split('Bearer%20')[1];
    token = 'Bearer ' + token;
}

const rest = {
	// getUserLogged () {
	//     let myHeaders = new Headers();
	//     myHeaders.append('Content-Type', 'application/json');
	//     myHeaders.append('Authorization', token);
	//     return fetch(apiUrl + '/user/userLogged', {headers: myHeaders})
	// },

	login(data) {
		let myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');
		let requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: JSON.stringify(data),
		};
		return fetch(apiUrl + '/login', requestOptions);
	},

	addUser(data) {
		let myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');
		myHeaders.append('Authorization', token);
		let requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: JSON.stringify(data),
		};
		return fetch(apiUrl + '/user', requestOptions);
	},

	getUserLogged() {
		let myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');
		myHeaders.append('Authorization', token);
		let requestOptions = {
			method: 'GET',
			headers: myHeaders,
		};
		return fetch(apiUrl + '/user/userLogged', requestOptions);
	},

	uploadFileToDB(fileInput, idFolder) {
		let myHeaders = new Headers();
		myHeaders.append('Authorization', token);
		let formdata = new FormData();
		formdata.append('file', fileInput);
		let requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: formdata,
		};
		return fetch(apiUrl + '/file/upload/db/' + idFolder, requestOptions);
	},

	deleteFile(id_file) {
		let myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');
		myHeaders.append('Authorization', token);
		let requestOptions = {
			method: 'DELETE',
			headers: myHeaders,
		};
		return fetch(apiUrl + '/file/' + id_file, requestOptions);
	},

	deleteFolder(id_folder) {
		let myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');
		myHeaders.append('Authorization', token);
		let requestOptions = {
			method: 'DELETE',
			headers: myHeaders,
		};
		return fetch(apiUrl + '/folder/' + id_folder, requestOptions);
	},

	updateFileName(id_file, file_name) {
		let myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');
		myHeaders.append('Authorization', token);
		let requestOptions = {
			method: 'PUT',
			headers: myHeaders,
			body: file_name,
		};
		return fetch(apiUrl + '/file/update/' + id_file, requestOptions);
	},

	updateFolderName(id_folder, folder_name) {
		let myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');
		myHeaders.append('Authorization', token);
		let requestOptions = {
			method: 'PUT',
			headers: myHeaders,
			body: folder_name,
		};
		return fetch(apiUrl + '/folder/update/' + id_folder, requestOptions);
	},

	addFolder(folderName, parentFolderId) {
		let myHeaders = new Headers();
		myHeaders.append('Authorization', token);
		let requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: folderName,
		};
		return fetch(apiUrl + '/folder/parentFolder/' + parentFolderId, requestOptions);
	},

	getRootFolder() {
		let myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');
		myHeaders.append('Authorization', token);
		let requestOptions = {
			method: 'GET',
			headers: myHeaders,
		};
		return fetch(apiUrl + '/folder/getRootFolder', requestOptions);
	},

	createRootFolder() {
		let myHeaders = new Headers();
		myHeaders.append('Authorization', token);
		let requestOptions = {
			method: 'GET',
			headers: myHeaders,
		};
		return fetch(apiUrl + '/folder/createRootFolder', requestOptions);
	},

	getFilesofFolder(id_folder) {
		let myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');
		myHeaders.append('Authorization', token);
		let requestOptions = {
			method: 'GET',
			headers: myHeaders,
		};
		return fetch(apiUrl + '/file/folder/' + id_folder, requestOptions);
	},

	getFoldersOfParentFolder(id_folder) {
		let myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');
		myHeaders.append('Authorization', token);
		let requestOptions = {
			method: 'GET',
			headers: myHeaders,
		};
		return fetch(apiUrl + '/folder/parentFolder/' + id_folder, requestOptions);
	},

	getAllUser() {
		let myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');
		myHeaders.append('Authorization', token);
		let requestOptions = {
			method: 'GET',
			headers: myHeaders,
		};
		return fetch(apiUrl + '/user/all', requestOptions);
	},

	deleteUser(id_user) {
		let myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');
		myHeaders.append('Authorization', token);
		let requestOptions = {
			method: 'DELETE',
			headers: myHeaders,
		};
		return fetch(apiUrl + '/user/' + id_user, requestOptions);
	},

	getUserByFirstOrLastNameOrLogin(pattern) {
		let myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');
		myHeaders.append('Authorization', token);
		let requestOptions = {
			method: 'GET',
			headers: myHeaders,
		};
		return fetch(apiUrl + '/user/search/' + pattern, requestOptions);
	},

	updateUser(data) {
		console.log('update user  : ', data);
		let myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');
		myHeaders.append('Authorization', token);
		let requestOptions = {
			method: 'PUT',
			headers: myHeaders,
			body: JSON.stringify(data),
		};
		return fetch(apiUrl + '/user', requestOptions);
	},
};

export default rest;