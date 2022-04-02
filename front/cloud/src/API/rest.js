const apiUrl = 'http:yvandev.fr/save-and-safe';
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

	login (data) {
		let myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');
        let requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: JSON.stringify(data)
        };
        return fetch(apiUrl + '/login', requestOptions);
    },

    addUser (data) {
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
    
    getUserLogged () {
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', token);
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        return fetch(apiUrl + '/user/userLogged', requestOptions);
    },

    uploadFileToDB (fileInput) {
        let myHeaders = new Headers();
        myHeaders.append('Authorization', token);
        let formdata = new FormData();
        formdata.append('file', fileInput);
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
        };
        return fetch(apiUrl + '/file/upload/db', requestOptions);
    },

    getFilesofFolder (id_folder) {
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', token);
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        return fetch(apiUrl + '/file/folder/' + id_folder, requestOptions);
    },

    getAllUser () {
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', token);
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        return fetch(apiUrl + '/user/all', requestOptions);
    },

    deleteUser (id_user) {
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', token);
        let requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
        };
        return fetch(apiUrl + '/user/' + id_user, requestOptions);
    },

    getUserByFirstOrLastName(name) {
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', token);
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        return fetch(apiUrl + '/user/name' + name, requestOptions);
    },
};

export default rest;