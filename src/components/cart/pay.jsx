


import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export const Pay = () => {
    const dispatch = useDispatch();
    const order = useSelector(state => state.flights.orders);
    const price = useSelector(state => state.flights.price);
    const userName = useSelector(state => state.users.user);
    
    const [creditCardNum, setCreditCardNum] = useState("");
    const [date, setDate] = useState("");
    const [cvc, setCvc] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    const toPay = () => {
        setIsProcessing(true);
        
        let ordersDetailToPay = [];
        order.forEach(element => {
            ordersDetailToPay.push({
                idOrder: 0, 
                idClassToFlight: element.id, 
                countTickets: element.nOS, 
                countOverLoad: element.overWight, 
                price: element.price
            });
        });
        
        let orderToPay = {
            idCustomer: userName.id, 
            price: price, 
            date: new Date(), 
            ordersDetails: ordersDetailToPay
        };
        
        // Here you would typically dispatch an action to process the payment
        // For example:
        // dispatch(processPayment(orderToPay));
        
        console.log("Processing payment:", orderToPay);
        
        // Simulate API call
        setTimeout(() => {
            setIsProcessing(false);
            alert("Payment processed successfully!");
            // You might want to redirect or clear the cart here
        }, 1500);
    };

    // Validate credit card has correct length (typically 16 digits)
    const isValidCreditCard = creditCardNum.replace(/\s/g, '').length === 16;
    // Validate date is not empty
    const isValidDate = date !== "";
    // Validate CVC is 3 digits
    const isValidCvc = cvc.length === 3;
    
    // Button is enabled only when all fields are valid
    const isFormValid = isValidCreditCard && isValidDate && isValidCvc;

    return (
        <div className="payment-container" style={{ direction: "rtl", maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
            <h3>הזן פרטי אשראי</h3>
            
            <div className="payment-form" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <div className="form-group">
                    <label>הכנס מספר כרטיס אשראי</label>
                    <input 
                        type="text" 
                        value={creditCardNum}
                        onChange={(e) => setCreditCardNum(e.target.value)}
                        placeholder="XXXX XXXX XXXX XXXX"
                        maxLength="19"
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>
                
                <div className="form-group">
                    <label>הכנס תוקף</label>
                    <input 
                        type="date" 
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>
                
                <div className="form-group">
                    <label>הכנס CVC</label>
                    <input 
                        type="text" 
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value.replace(/[^0-9]/g, ''))}
                        maxLength="3"
                        placeholder="123"
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>
                
                <button 
                    onClick={toPay} 
                    disabled={!isFormValid || isProcessing}
                    style={{ 
                        padding: "10px", 
                        backgroundColor: isFormValid && !isProcessing ? "#4CAF50" : "#cccccc",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: isFormValid && !isProcessing ? "pointer" : "not-allowed",
                        marginTop: "10px"
                    }}
                >
                    {isProcessing ? "מעבד תשלום..." : "לתשלום"}
                </button>
            </div>
        </div>
    );
};