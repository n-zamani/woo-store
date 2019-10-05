import { HOST, KEY } from '../_constants';

export const orderService = {
    getShippingMethods,
    getPaymentMethods,
    createOrder
};

async function getShippingMethods() {
    return await fetch(`${HOST}shipping/zones/0/methods?${KEY}`, {
        method: 'GET'
    })
        .then(response => response.json())
}

async function getPaymentMethods() {
    return await fetch(`${HOST}payment_gateways?${KEY}`, {
        method: 'GET'
    })
        .then(response => response.json())
}

async function createOrder(address,shippingMethod,paymentMethod) {

    const cart = JSON.parse(localStorage.getItem('cart'));

    let cartArray = []

    for (let key in cart) {
        if (typeof cart[key] === 'object'){
            cartArray.push(cart[key]);
        }
    }

    const items = cartArray.map(item => {
        return {
            product_id: item.id,
            quantity: item.qty
        }
    });

    const data = {
        payment_method: paymentMethod,
        customer_id: JSON.parse(localStorage.getItem('userid')) ? JSON.parse(localStorage.getItem('userid')) : 0,
        billing: {
            first_name: address.firstName,
            last_name: address.lastName,
            address_1: address.address1,
            address_2: address.address2,
            city: address.city,
            postcode: address.postcode,
            country: address.country,
            email: address.email,
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
        },
        line_items: items,
        shipping_lines: [
            {
                method_id: shippingMethod.method,
                total: shippingMethod.price
            }
        ]
    }

    return await fetch(`${HOST}orders?${KEY}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
}