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

async function createOrder(billingAddress,shippingAddress,shippingMethod,paymentMethod) {

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
        customer_id: JSON.parse(localStorage.getItem('userid')),
        billing: {
            first_name: billingAddress.firstName,
            last_name: billingAddress.lastName,
            address_1: billingAddress.address1,
            address_2: billingAddress.address2,
            city: billingAddress.city,
            postcode: billingAddress.postcode,
            country: billingAddress.country,
            email: billingAddress.email,
            phone: billingAddress.phone
        },
        shipping: {
            first_name: shippingAddress.firstName,
            last_name: shippingAddress.lastName,
            address_1: shippingAddress.address1,
            address_2: shippingAddress.address2,
            city: shippingAddress.city,
            postcode: shippingAddress.postcode,
            country: shippingAddress.country
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