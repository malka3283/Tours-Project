import { useState } from "react";
import { Destnation } from "./destnation";
import { ClassToFlight } from "./classToFlight";
import { Flight } from "./flight";
import { ThisFlight } from "./thisFlight";
import { Customer } from "./customer";
import { Orders } from "./orders";

export const Handle = () => {

    const[flt, setFlt] = useState(false)
    const[des, setDes] = useState(true)
    const[thisFlt, setThisFlt] = useState(false)
    const[classToFlt, setClassToFlt] = useState(false)
    const[customer, setCustomer] = useState(false)
    const[orders, setOrders] = useState(false)



    return <div>
        <button onClick={() => {
            setFlt(false)
            setDes(true)
            setThisFlt(false)
            setClassToFlt(false)
            setCustomer(false)
            setOrders(false)
        }}> היעדים</button>
        <button onClick={() => {
            setFlt(true)
            setDes(false)
            setThisFlt(false)
            setClassToFlt(false)
            setCustomer(false)
            setOrders(false)

        }}> הטיסות</button>
        <button onClick={() => {
                        setFlt(false)
                        setDes(false)
                        setThisFlt(true)
                        setClassToFlt(false)
                        setCustomer(false)
                        setOrders(false)

        }}> טיסות הספציפיות</button>
        <button onClick={() => {
                        setFlt(false)
                        setDes(false)
                        setThisFlt(false)
                        setClassToFlt(true)
                        setCustomer(false)
                        setOrders(false)

        }}> הטיסות למחלקות</button>
        <button onClick={() => { setFlt(false)
                        setDes(false)
                        setThisFlt(false)
                        setClassToFlt(false)
                        setOrders(false)
                        setCustomer(true)}}>לקוחות</button>
        <button onClick={() => { setFlt(false)
                        setDes(false)
                        setThisFlt(false)
                        setClassToFlt(false)
                        setOrders(true)
                        setCustomer(false)}}>הזמנות</button>

{des && <Destnation/>}
{flt && <Flight/>}
{thisFlt && <ThisFlight/>}
{classToFlt && <ClassToFlight/>}
{customer && <Customer/>}
{orders && <Orders/>}


    </div>
}