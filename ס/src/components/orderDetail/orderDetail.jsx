import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllOrdersByCustomerThunk } from "../../redux/slices/flight/getAllOrdersByCustomerThunk";



export const OrderDetail = () => {

    const ordersByCustomer = useSelector(state => state.flights.ordersordersByCustomer)

    const dispatch = useDispatch()

    useEffect(() => {
       dispatch(getAllOrdersByCustomerThunk())
    }, []);

    return <div>

        {ordersByCustomer.length === 0 && <div>אין הזמנות רלונטיות</div>}
        {ordersByCustomer.length > 0 && ordersByCustomer?.map(o => <div key={o.id}
                   >
                    <div>{o.idCustomerNavigation.firstName} {o.idCustomerNavigation.lastName}</div> 
                    <div> {o.date}</div>
                    <div>{o.price}</div>

                    
                    </div>)}
    </div>
}

