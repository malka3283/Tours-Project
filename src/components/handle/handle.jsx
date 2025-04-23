import { useEffect, useRef } from "react"


export const Handle = (props) => {    

    const{flight} = props;

    
    const refDailog = useRef();

    useEffect(() => {
        refDailog.current.showModal();
        console.log(flight);
    },[])

return <dialog ref={refDailog}>
  
</dialog>



}