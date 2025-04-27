import { useState } from "react";
import { Destnation } from "./destnation";
import { ClassToFlight } from "./classToFlight";
import { Flight } from "./flight";
import { ThisFlight } from "./thisFlight";

export const Handle = () => {

    const[flt, setFlt] = useState(false)
    const[des, setDes] = useState(true)
    const[thisFlt, setThisFlt] = useState(false)
    const[classToFlt, setClassToFlt] = useState(false)

    return <div>
        <button onClick={() => {
            setFlt(false)
            setDes(true)
            setThisFlt(false)
            setClassToFlt(false)
        }}> היעדים</button>
        <button onClick={() => {
            setFlt(true)
            setDes(false)
            setThisFlt(false)
            setClassToFlt(false)
        }}> הטיסות</button>
        <button onClick={() => {
                        setFlt(false)
                        setDes(false)
                        setThisFlt(true)
                        setClassToFlt(false)
        }}> טיסות הספציפיות</button>
        <button onClick={() => {
                        setFlt(false)
                        setDes(false)
                        setThisFlt(false)
                        setClassToFlt(true)
        }}> הטיסות למחלקות</button>
        <button onClick={() => {}}>לקוחות</button>
        <button></button>

{des && <Destnation/>}
{flt && <Flight/>}
{thisFlt && <ThisFlight/>}
{classToFlt && <ClassToFlight/>}


    </div>
}