import React, { useContext } from 'react'
import { FunctionContext, ProductsContext } from './Contexts';

function ViewOrders() {
    const orders = useContext(ProductsContext);
    const deleteOrder = useContext(FunctionContext);

    const table1Orders=[], table2Orders=[], table3Orders=[];
    orders.forEach((o)=>{
        if(o.table==="Table-1"){
            table1Orders.push(o);
        }
        else if(o.table==="Table-2"){
            table2Orders.push(o);
        }
        else{
            table3Orders.push(o);
        }
    })

    // console.log("View orders rendered");

    return (
        <div>        
            <h4>Table 1</h4>
            {
                table1Orders.map((order) => {
                    return (
                        <li key={order.id}>
                            {order.oId} {order.dish} {order.price} 
                            <button onClick={()=>deleteOrder(order.id)}>Delete</button>
                        </li>
                    )
                })
            }
            <h4>Table 2</h4>
            {
                table2Orders.map((order) => {
                    return (
                        <li key={order.id}>
                            {order.oId} {order.dish} {order.price} 
                            <button onClick={()=>deleteOrder(order.id)}>Delete</button>
                        </li>
                    )
                })
            }
            <h4>Table 3</h4>
            {
                table3Orders.map((order) => {
                    return (
                        <li key={order.id}>
                            {order.oId} {order.dish} {order.price} 
                            <button onClick={()=>deleteOrder(order.id)}>Delete</button>
                        </li>
                    )
                })
            }
        </div>
    )
}

export default ViewOrders