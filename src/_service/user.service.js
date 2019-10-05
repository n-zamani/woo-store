import { HOST, KEY } from '../_constants';

export const userService = {
    getUser,
    getOrders,
    listItems,
    editAddress,
    editUser
}

async function getUser(email) {
    const response = await fetch(`${HOST}customers/?email=${email}&${KEY}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
        .then(response => response.json());

    if (response.message) {
        return Promise.reject({ message: response.message, status: response.data.status })
    } else {
        return response;
    }
}

async function getOrders(id) {
    const response = await fetch(`${HOST}orders/?customer=${id}&${KEY}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
        .then(response => response.json());

    if (response.message) {
        return Promise.reject({ message: response.message, status: response.data.status })
    } else {
        return response;
    }
}

async function listItems(ids) {
    let param = '';
    for (let id of ids) {
        param += `include[]=${id}&`;
    }
    return await fetch(`${HOST}products/?${param}${KEY}`, {
        method: 'GET'
    })
        .then(response => response.json());
}

async function editAddress(address, email, id) {
    
    const data = {
        first_name: address.firstName,
        last_name: address.lastName,
        billing: {
            first_name: address.firstName,
            last_name: address.lastName,
            address_1: address.address1,
            address_2: address.address2,
            city: address.city,
            postcode: address.postcode,
            country: address.country,
            email,
            phone: address.phone
        },
        shipping: {
            first_name: address.firstName,
            last_name: address.lastName,
            address_1: address.address1,
            address_2: address.address2,
            city: address.city,
            postcode: address.postcode,
            country: address.country
        }
    }

    return await fetch(`${HOST}customers/${id}?${KEY}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json());
}

async function editUser(user, id) {
    
    const data = {
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        password: user.password
    }

    for (let key in data) {
        if(data[key].length === 0) {
            delete data[key]
        }
    }

    return await fetch(`${HOST}customers/${id}?${KEY}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json());
}