import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUserThunk } from "../../redux/slices/user/addUserThunk";


export const LogOn = () => {
    const [connectt, setconnectt] = useState(false);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const user = useSelector(state => state.users.userWithoutOutId)
    const loction = useSelector(state => state.users.loction)
    const [thisUser, setUser] = useState(user);

    const check = () => {
        console.log(user);
        console.log(thisUser);
        if(thisUser.firstName !== ""  && thisUser.lastName !== "" && thisUser.password !== "" && thisUser.email !== "")
            connect();
        else{
              setconnectt(true); 
        }
    }

     const connect = () => {
        dispatch(addUserThunk(thisUser));
     }

     const refDailog = useRef();

    useEffect(() => {
        refDailog.current.showModal();
    },[])

    return <dialog  ref={refDailog} className="alllogOn">
           <button onClick={() => navigate(loction)}>❌</button>
  
         <lable>הזן שם משתמש <img src="אדם.png" className='loginicon'/></lable>
         <input type="text" placeholder="שם משתמש" defaultValue={thisUser.firstName} onChange={e => {setUser(prev => ({...prev, firstName: e.target.value}))}}/>
         {connectt && !thisUser.firstName && <div>חובה להזין שם משתמש</div>}
         <br />
         <lable>הזן שם משפחה <img src="משפחה.png" className='loginicon'/></lable>
         <input type="text" placeholder="שם משפחה"  defaultValue={thisUser.lastName} onChange={(e) => {setUser(prev => ({...prev, lastName: e.target.value}))}}/>
         <div>
         {!thisUser.lastName && connectt && <div>חובה להזין שם משפחה</div>}</div>
         <br />
         <lable>הזן סיסמא <img src="קוד.png" className='loginicon'/></lable>
         <input type="text" placeholder="סיסמא"  defaultValue={thisUser.password} onChange={(e) => {setUser(prev => ({...prev, password: e.target.value}))}}/>
         {connectt && !thisUser.password && <div>חובה להזין סיסמא</div>}
         <br />
         <lable>הזן פלאפון <img src="טלפון.png" className='loginicon'/></lable>
         <input type="text" placeholder="פלפון" onChange={e => {setUser(prev => ({...prev, phone: e.target.value}))}}/>
         <br />
         <lable>הזן כתובת מייל <img src="מייל.png" className='loginicon'/></lable>
         <input type="text" placeholder="אימייל" onChange={e => {setUser(prev => ({...prev, email: e.target.value}))}}/>
         {connectt && !thisUser.email && <div>חובה להזין כתובת מייל</div>}        
         <button onClick={() => check()}>אישור</button>

    </dialog>
}