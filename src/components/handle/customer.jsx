import { useSelector } from "react-redux";

export const Customer = () => {

const customers = useSelector(state => state.users.customers);
    return <div>
        <table>
<thead>
                <tr>
                    <th>
                        שם פרטי
                    </th>
                    <th>
                        שם משפחה
                    </th>
                    <th>
                        טלפון
                    </th>
                    <th>
                        מייל
                    </th>
                    <th>
                       סיסמא
                    </th>
                    <th>
                       
                    </th>
                    <th>
                       
                    </th>
                    <th>
                       
                    </th>
                    <th>
                       
                       </th>
                </tr>
            </thead>

<tbody>
{customers?.map(c => <tr key={c.id}
                   >
                    <th>{c.firstName}</th>
                    <th>{c.lastName}</th>
                    <th>{c.phone}</th>
                    <th>{c.email}</th>
                    <th>{c.password}</th>
                    <th>{c.isManager}</th>
                    <th>🚮</th>
                    <button onClick={() => {
                    }}>פרטי הזמנות</button>
                    <button onClick={() => {

                    }}>עריכה</button>

                </tr>)}

</tbody>
        </table>
    </div>
}