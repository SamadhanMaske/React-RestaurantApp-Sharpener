import React, { useEffect } from 'react'
import { useState } from 'react'
import ViewOrders from './ViewOrders';
import { FunctionContext, ProductsContext } from './Contexts';

// getting the values of local storage
const getDatafromLS = () => {
    const data = localStorage.getItem('orderList');
    if (data) {
        return JSON.parse(data);
    }
    else {
        return []
    }
}

function Orders() {
    const [order, setOrder] = useState({ oId: '', dish: '', price: '', table: '' });
    const [orders, setOrders] = useState(getDatafromLS());

    const handleChange = (event) => {
        setOrder({ ...order, [event.target.name]: event.target.value })
    }
    

    const addOrder = (event) => {
        event.preventDefault();
        if (order.oId === '' || order.dish === '' || order.price === '' || order.table === '') {
            alert("Please enter all details");
            return;
        } else {
            const newOrder = { id: new Date().getTime().toString(), ...order };
            console.log("Order added: ", newOrder);
            setOrders([...orders, newOrder]);
            setOrder({ oId: '', dish: '', price: '', table: '' });
        }
        console.log("Inside addOrder", orders);
    }

    const deleteOrder = (id) => {
        const updatedOrders = orders.filter(o => o.id !== id);
        setOrders(updatedOrders);
    }

    useEffect(() => {
        localStorage.setItem("orderList", JSON.stringify(orders));
    }, [orders])

    // console.log("Orders rendered");

    return (
        <div>
            <label>Order Id : </label><input type="text" name="oId" value={order.oId} onChange={handleChange} />
            <label>Dish : </label><input type="text" name="dish" value={order.dish} onChange={handleChange} />
            <label>Price : </label><input type="text" name="price" value={order.price} onChange={handleChange} />
            <label>Table : </label>
            <select name='table' value={order.table} onChange={handleChange}>
                <option>Select</option>
                <option>Table-1</option>
                <option>Table-2</option>
                <option>Table-3</option>
            </select>
            <button onClick={addOrder} type='submit'>Add</button>
            <ProductsContext.Provider value={orders} >
                <FunctionContext.Provider value={deleteOrder}>
                        <h2>Order List</h2>
                        {orders.length < 1 && <h4>You have no orders</h4>}
                        {orders.length > 0 && <ViewOrders />}
                </FunctionContext.Provider>
            </ProductsContext.Provider>
        </div>
    )
}

export default Orders
