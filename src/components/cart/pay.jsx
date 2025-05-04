import { useState } from "react"
import { useSelector } from "react-redux";

export const Pay = () => {

    const order = useSelector(state => state.flights.orders)
    const price = useSelector(state => state.flights.price)

    const userName = useSelector(state => state.users.user)



    const[creditCardNum, setCreditCardNum] = useState("");
    const[date, setDate] = useState("");
    const[cvc, setCvc] = useState("");

    const toPay = () => {
        
        let ordersDetailToPay = [];
        order.forEach(element => {
            ordersDetailToPay.push({idOrder: 0, idClassToFlight: element.id, countTickets: element.nOS, countOverLoad: element.overWight, price: element.price})
        });
        let orderToPay = {idCustomer: userName.id, price: price, date: new Date(), ordersDetails: ordersDetailToPay}

    }

return <div>

<h3>הזן פרטי אשראי</h3>

<div>
    <div>הכנס מספר כרטיס אשראי</div>
    <input type="text" />
    <div>הכנס תוקף</div>
    <input type="date" />
    <div>הכנס cvc </div>
    <input type="text" />
</div>

<button onClick={() => toPay()} disabled={creditCardNum === 9  && date !== "" && cvc.length === 3}>לתשלום</button>

</div>
}