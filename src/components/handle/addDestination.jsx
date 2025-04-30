import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loct } from "../../redux/slices/user/userSlice";

export const AddDestination = (props) => {
    const {addDestination, updateDestination, des, close} = props

    const dispatch = useDispatch()
    const[dest, setDest] = useState()

    useEffect(() => {
        setDest(des)
    }, [])


    return <div>

        <button onClick={() => close()}>❌</button>

        {des === null && <div>הוספת יעד</div>}
        {des !== null && <div>עריכת יעד</div>}

        <div>יעד</div>
        {des === null && <input type="text" />}
        {des !== null && <input type="text" value={des.destination}  onChange={(e) => setDest(prev => ({ ...prev, destination: e.target.value }))}/>}
        
        <div>תמונה</div>
        {des === null && <input type="text" />}
        {des !== null && <input type="text" value={des.path} onChange={(e) => setDest(prev => ({ ...prev, path: e.target.value }))}/>}
        
        {(des.path !== null && des.destination != null) && <button onClick={() => {
            addDestination(dest)
        }}>אישור</button>}

    </div>
}