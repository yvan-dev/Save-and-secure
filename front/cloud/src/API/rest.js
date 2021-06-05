const apiUrl = 'http://192.168.1.166:1998';
let token = document.cookie;
token = token.split(';')[1].split('=')[1].split('Bearer%20')[1];
token = 'Bearer ' + token;

const rest = {
    getUserLogged () {
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', token);
        return fetch(apiUrl + '/user/userLogged', {headers: myHeaders})
    },

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
};

export default rest;