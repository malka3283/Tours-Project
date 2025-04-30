import { useSelector } from "react-redux"



export const OrderDetail = () => {

    const ordersInPass = useSelector(state => state.flights.ordersInPass)

    return <div>

        {ordersInPass.length === 0 && <div>אין הזמנות רלונטיות</div>}
    </div>
}