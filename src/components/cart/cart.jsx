import { useEffect, useState } from "react";
import { loct } from "../../redux/slices/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Update } from "@mui/icons-material";
import { deleteOrder, savePriceToPay } from "../../redux/slices/flight/flightsSlice";
import { useNavigate } from "react-router-dom";

export const Cart = () => {

    const dispatch = useDispatch()

    const order = useSelector(state => state.flights.orders)

    const [price, setPrice] = useState(0)
    const userName = useSelector(state => state.users.user)


    const navigate = useNavigate()

    useEffect(() => {
        let p = 0;
        dispatch(loct("/cart"));
        order.forEach(element => {
            p +=  element.price * element.nOS + element.overWight * element.priceToOverLoad
        });
        setPrice(p)
    }, [])

    useEffect(() => {
        let p = 0;
        order.forEach(element => {
            p +=  element.price * element.nOS + element.overWight * element.priceToOverLoad
        });
        setPrice(p)
    }, price)

    const updateNOs = (o) => {
        
        }

    const deleteO = (o) => {
    dispatch(deleteOrder(o))
    }

    const updateOverWight = (o) => {
    
    }

    const Payment = () => {
        dispatch(savePriceToPay(price))
        if(userName === null)
            navigate('/logIn')
        else{
        navigate('/pay')
    }
    }

    return <div>
         {order.length === 0 && <div>הסל ריק</div>}
        {order.length > 0 &&

<div>
        <table>
            <thead>
                <tr>
                    <th>

                    </th>
                    <th>
                        מקור
                    </th>
                    <th>
                        יעד
                    </th>
                    <th>
                        תאריך
                    </th>
                    <th>
                        מחיר לכרטיס
                    </th>
                    <th>
                        כמות כרטיסים
                    </th>
                    <th>
                        מחיר למשקל עודף
                    </th>
                    <th>
                        משקל עודף
                    </th>
                    <th>
                        מחיר לתשלום
                    </th>
                </tr>
            </thead>

            <tbody>
                {order?.map(o => <tr key={o.id}
                >
                    <td onClick={() => deleteO(o)}>להסרה</td>
                    <td>{o.src}</td>
                       <td>{o.des}</td> 
                    <td>{o.date} - {o.time}</td>
                    <td>{o.price}</td>
                    <td><input type="number" defaultValue={o.nOS} onClick={() => updateNOs(o)}/></td>
                    <td><input type="number" defaultValue={o.overWight} onClick={() => updateOverWight(o)}/></td>
                    <td>{o.nOS * (o.price) + o.overWight * o.priceToOverLoad}</td>

                </tr>)}

            </tbody>
        </table>
        <div>
            <label>מחיר לתשלום</label>
            <label>{price}</label>
            </div>
            <button onClick={() => Payment()}>למעבר לתשלום</button>
        
        </div>}
        

    </div>
}