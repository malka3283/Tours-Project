import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logInUserThunk } from "../../redux/slices/user/logInUserThunk";
import { useNavigate } from "react-router-dom";
import { logIn } from "../../redux/slices/user/userSlice";
import './logInStyle.css'


export const LogIn = () => {

    const [connectt, setconnectt] = useState(false);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const user = useSelector(state => state.users.userWithoutOutId)
    const userName = useSelector(state => state.users.user)
    const status = useSelector(state => state.users.status)
    const loction = useSelector(state => state.users.loction)

    const [thisUser, setUser] = useState(user);


    useEffect(() => {
        debugger
        if (status)
            navigate(`/logOn`)

    }, [status])

    useEffect(() => {
            navigate(`/home`)

    }, [userName])


    const check = () => {
        if (thisUser.firstName !== "" && thisUser.lastName !== "" && thisUser.password !== "")
            connect();
        else {
            setconnectt(true);
        }
    }

    const refDailog = useRef();

    const connect = () => {
        dispatch(logIn(thisUser));
        debugger
        dispatch(logInUserThunk({ name: thisUser.firstName, lastName: thisUser.lastName, pass: thisUser.password }));
        if (status)
            navigate(`/logOn`)
    }

    return <dialog ref={refDailog} className="allLogIn">
        <div className="dailogLogin">
           
            
            <button onClick={() => navigate(loction)}>❌</button>
            <br />
            <lable>הזן שם משתמש <img src="אדם.png" className='loginicon' /></lable>
            <br />
            <input type="text" placeholder="שם משתמש" onChange={e => { setUser(prev => ({ ...prev, firstName: e.target.value })) }} />
            {connectt && !thisUser.firstName && <div>חובה להזין שם משתמש</div>}
            <br />
            <lable>הזן שם משפחה <img src="משפחה.png" className='loginicon' /></lable>
            <br />
            <input type="text" placeholder="שם משפחה" onChange={(e) => { setUser(prev => ({ ...prev, lastName: e.target.value })) }} />
            <div>
                {!thisUser.lastName && connectt && <div>חובה להזין שם משפחה</div>}</div>

            <lable>הזן סיסמא <img src="קוד.png" className='loginicon' /></lable>
            <br />
            <input type="text" placeholder="סיסמא" onChange={(e) => { setUser(prev => ({ ...prev, password: e.target.value })) }} />
            {connectt && !thisUser.password && <div>חובה להזין סיסמא</div>}
            <br />
            <button onClick={() => check()} className="button">אישור</button>
            <br />
            <button onClick={() => navigate(`/logOn`)} className="button">למשתמש חדש</button>
            <br />
        </div>
        <div className="dailogLoginPic"><img src="אדם סופי.png" className='piclogoo' />
        {/* <div className="login"> להתחברות</div> */}
        </div> 
    </dialog>
}