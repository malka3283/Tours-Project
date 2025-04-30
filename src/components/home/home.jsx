import { Outlet, useNavigate } from "react-router-dom"
import { Routing } from "../routing/routing";
import '../style.css'
import { getAllFlightThunk } from "../../redux/slices/flight/getAllFlightThunk";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllDestinationThunk } from "../../redux/slices/flight/getAllDestinationThunk";



export const Home = () => {








    
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const user = useSelector(state => state.users.user)


    useEffect(() => {
    }, [])

    return <div>
        <div> 
                 <button className="btnMenu" onClick={() => { navigate(`/cart`) }}>🛒</button>
                 <button className="btnMenu" onClick={() => {
                 navigate('/logIn') }}>להתחברות</button>
        {user && <div>
            <div>{user.firstName}שלום ל</div>
        {user.isManager === 1 && <button>🧙‍♀️</button>}
            </div>}</div>
        <div className="menu">
            <button className="btnMenu" onClick={() => { navigate(`/find`) }}>חיפוש טיסה אוטומטי</button>
            <div><img src="לוגו חדש.png" className='piclogo' /></div>
            <button className="btnMenu" onClick={() => { navigate(`/flightsWhisHanach`) }} >מבצעים</button>
            <button className="btnMenu" onClick={() => { navigate(`/chooseClass`) }}>טיסות</button>

        </div>

        <div>
            <Routing />
            <Outlet />
        </div>
    </div>
}