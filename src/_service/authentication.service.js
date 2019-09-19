import { HOST, KEY } from '../_constants';

export const authenticationService = {
    // login,
    register
};

function register(username, email, password) {

    const data = {
        username,
        email,
        password
    }

    return fetch(`${HOST}customers/?${KEY}`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response=>response.json())
}