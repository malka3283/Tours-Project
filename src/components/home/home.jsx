import { Outlet, useNavigate } from "react-router-dom"
import { Routing } from "../routing/routing";
import '../style.css'
import { getAllFlightThunk } from "../../redux/slices/flight/getAllFlightThunk";
import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { getAllDestinationThunk } from "../../redux/slices/flight/getAllDestinationThunk";



export const Home = () => {








    
    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(() => {
    }, [])

    return <div>
        <div className="menu">
            <button className="btnMenu" onClick={() => { navigate(`/logIn`) }}>להתחברות</button>
                {/* <img src="אדם שחור.png" className="picPerson" /> */}
            <button className="btnMenu" onClick={() => { navigate(`/find`) }}>חיפוש טיסה אוטומטי</button>
            <div><img src="לוגו חדש.png" className='piclogo' /></div>
            <button className="btnMenu" >מבצעים</button>
            <button className="btnMenu" onClick={() => { navigate(`/chooseClass`) }}>טיסות</button>
            <button className="btnMenu" onClick={() => { navigate(`/handle`) }}>מנהל</button>
        </div>

        <div>
            <Routing />
            <Outlet />
        </div>
    </div>
}