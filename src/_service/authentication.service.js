import { HOST, KEY } from '../_constants';

export const authenticationService = {
    login,
    register
};

async function register(username, first_name, last_name, email, password) {

    const data = {
        username,
        first_name,
        last_name,
        password,
        email
    }

    const response = await fetch(`${HOST}customers/?${KEY}`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res=>res.json());

    if (response.message) {
        return Promise.reject({message: response.message, status: response.data.status});
    } else {
        return response;
    }
}

async function login(username, password) {

    const data = {
        username,
        password
    }

    const response = await fetch('https://YOUR_WEBSITE/wp-json/jwt-auth/v1/token', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())

    if (response.token) {
        return response;
    } else {
        return Promise.reject({message: response.message, status: response.data.status})
    }
}
