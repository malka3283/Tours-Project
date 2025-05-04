import { Outlet, useNavigate } from "react-router-dom"
import { Routing } from "../routing/routing";
import '../style.css'
import { getAllFlightThunk } from "../../redux/slices/flight/getAllFlightThunk";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllDestinationThunk } from "../../redux/slices/flight/getAllDestinationThunk";
import { loct } from "../../redux/slices/user/userSlice";

import PersonIcon from '@mui/icons-material/Person';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export const Home = () => {
    
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const user = useSelector(state => state.users.user)


    useEffect(() => {
        dispatch(loct("/about"));

    }, [])

    return <div>
        <div> 
                 <button className="btnMenu" onClick={() => { navigate(`/cart`) }}><ShoppingCartIcon/></button>
                 <button className="btnMenu" onClick={() => {
                 navigate('/logIn') }}><PersonIcon/></button>
        {user && <div>
            <div>{user.firstName}שלום ל</div>
            <div onClick={() =>  navigate(`/orderDetail`)}>📖</div>
        {user.isManager === 1 && <button onClick={() => navigate(`/handle`)}><ManageAccountsIcon/></button>}
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