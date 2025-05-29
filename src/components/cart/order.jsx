import { useSelector } from "react-redux";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { useEffect, useState } from "react";
import { 
    Button, 
    Box, 
    Typography, 
    Paper, 
    Container, 
    Grid, 
    Card, 
    CardContent, 
    Divider,
    Chip,
    Fade
} from "@mui/material";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import PaymentIcon from '@mui/icons-material/Payment';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import EventIcon from '@mui/icons-material/Event';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import LuggageIcon from '@mui/icons-material/Luggage';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PrintIcon from '@mui/icons-material/Print';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import "./order.css";

export const Order = () => {
    const orders = useSelector(state => state.flights.ordersToPdf);
    const price = useSelector(state => state.flights.price);
    const user = useSelector(state => state.users.user);
    
    // מצב לאינדיקטור גלילה
    const [showScrollIndicator, setShowScrollIndicator] = useState(false);

    // בדיקת אם יש צורך בגלילה
    useEffect(() => {
        const flightsList = document.querySelector('.flights-list');
        if (flightsList) {
            const hasScroll = flightsList.scrollHeight > flightsList.clientHeight;
            setShowScrollIndicator(hasScroll);
            
            // מאזין לגלילה להסתרת האינדיקטור
            const handleScroll = () => {
                const { scrollTop, scrollHeight, clientHeight } = flightsList;
                const isNearBottom = scrollTop + clientHeight >= scrollHeight - 50;
                setShowScrollIndicator(hasScroll && !isNearBottom);
            };
            
            flightsList.addEventListener('scroll', handleScroll);
            return () => flightsList.removeEventListener('scroll', handleScroll);
        }
    }, [orders]);

    const generateHebrewPDF = () => {
        const doc = new jsPDF();
        
        // צבעי מותג
        const primaryColor = [25, 118, 210];
        const accentColor = [255, 152, 0];
        
        // רקע כותרת
        doc.setFillColor(...primaryColor);
        doc.rect(0, 0, 210, 45, 'F');
        
        // כותרת בעברית
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(24);
        doc.text("אישור הזמנת טיסה", 105, 20, { align: "center" });
        
        doc.setFontSize(14);
        doc.text("חברת טורס - הטיסות שלכם בידיים טובות", 105, 32, { align: "center" });
        
        // מספר הזמנה
        const orderNumber = `TR-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
        const currentDate = new Date().toLocaleDateString('he-IL');
        
        doc.setFontSize(12);
        doc.text(`מספר הזמנה: ${orderNumber}`, 105, 40, { align: "center" });
        
        // פרטי לקוח
        doc.setFillColor(248, 249, 250);
        doc.roundedRect(15, 55, 180, 45, 3, 3, 'F');
        
        doc.setTextColor(...primaryColor);
        doc.setFontSize(16);
        doc.text("פרטי הלקוח", 190, 70, { align: "right" });
        
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.text(`שם מלא: ${user?.firstName || ''} ${user?.lastName || ''}`, 190, 80, { align: "right" });
        doc.text(`אימייל: ${user?.email || ''}`, 190, 87, { align: "right" });
        doc.text(`טלפון: ${user?.phone || 'לא צוין'}`, 190, 94, { align: "right" });
        
        // תאריך
        doc.setTextColor(...accentColor);
        doc.text(`תאריך הזמנה: ${currentDate}`, 25, 80, { align: "left" });
        doc.text("סטטוס: אושר ושולם", 25, 87, { align: "left" });
        
        // טבלת טיסות
        const tableData = [];
        
        orders.forEach((item) => {
            const totalPrice = item.price * item.nOS + item.overWight * (item.priceToOverLoad || 50);
            tableData.push([
                item.classs || 'תיירים',
                item.fromCity || item.src,
                item.toCity || item.des,
                item.date || currentDate,
                item.nOS.toString(),
                `${item.overWight} ק"ג`,
                `₪${totalPrice.toLocaleString('he-IL')}`
            ]);
        });
        
        autoTable(doc, {
            head: [['מחלקה', 'מוצא', 'יעד', 'תאריך', 'נוסעים', 'משקל עודף', 'מחיר כולל']],
            body: tableData,
            startY: 110,
            styles: { 
                fontSize: 10,
                cellPadding: 5,
                halign: 'center'
            },
            headStyles: { 
                fillColor: primaryColor,
                textColor: 255,
                fontStyle: 'bold'
            },
            alternateRowStyles: {
                fillColor: [248, 250, 252]
            },
            margin: { right: 15, left: 15 }
        });
        
        const finalY = doc.lastAutoTable.finalY + 20;
        
        // סיכום מחיר
        doc.setFillColor(76, 175, 80);
        doc.roundedRect(15, finalY, 90, 35, 3, 3, 'F');
        
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(14);
        doc.text("סה\"כ לתשלום:", 100, finalY + 15, { align: "right" });
        
        doc.setFontSize(18);
        doc.text(`₪${price.toLocaleString('he-IL')}`, 100, finalY + 28, { align: "right" });
        
        // הוראות חשובות
        const instructionsY = finalY + 45;
        doc.setFillColor(255, 248, 225);
        doc.roundedRect(15, instructionsY, 180, 50, 3, 3, 'F');
        
        doc.setTextColor(...primaryColor);
        doc.setFontSize(14);
        doc.text("הוראות חשובות:", 190, instructionsY + 15, { align: "right" });
        
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        
        const instructions = [
            "• מסמך זה מהווה אישור רשמי להזמנתכם",
            "• נדרש להגיע 2-3 שעות לפני המראה",
            "• צ'ק-אין אונליין זמין 24 שעות לפני",
            "• יש להציג תעודת זהות + אישור זה",
            "• לשאלות: 03-1234567"
        ];
        
        instructions.forEach((instruction, index) => {
            doc.text(instruction, 190, instructionsY + 25 + (index * 7), { align: "right" });
        });
        
        // פוטר
        doc.setFillColor(...primaryColor);
        doc.rect(0, 270, 210, 27, 'F');
        
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(12);
        doc.text("חברת טורס בע\"מ", 105, 280, { align: "center" });
        
        doc.setFontSize(9);
        doc.text("רחוב התעופה 123, תל אביב | טל: 03-1234567", 105, 287, { align: "center" });
        doc.text("רישיון תעופה: IL-2024-001", 105, 293, { align: "center" });
        
        // שמירה
        doc.save(`אישור-הזמנה-${orderNumber}.pdf`);
    };

    return (
        <Container maxWidth="lg" className="order-container">
            {/* כותרת עם לוגו */}
            <Paper elevation={3} className="order-header content-fade-in">
                <Box className="logo-container">
                    <img src="/logo.png" alt="טורס לוגו" className="order-logo" 
                         onError={(e) => {e.target.src = 'https://via.placeholder.com/150x60?text=TOURS'; e.target.onerror = null;}} />
                </Box>
                <Typography variant="h3" component="h1" className="order-title">
                    פרטי ההזמנה שלך
                </Typography>
                <Typography variant="subtitle1" className="order-subtitle">
                    תודה שבחרת לטוס איתנו! להלן פרטי ההזמנה שלך
                </Typography>
                <CheckCircleIcon className="success-icon" />
            </Paper>

            <Grid container spacing={4} className="order-content">
                {/* פרטי לקוח וסיכום הזמנה */}
                <Grid item xs={12} md={4}>
                    <Box className="left-column">
                        {/* פרטי לקוח */}
                        <Card className="order-card customer-card">
                            <CardContent>
                                <Typography variant="h6" component="h2" className="card-title">
                                    <PersonIcon className="card-icon" />
                                    פרטי לקוח
                                </Typography>
                                <Divider className="card-divider" />
                                
                                <Box className="customer-details">
                                    <Box className="detail-item">
                                        <PersonIcon className="detail-icon" />
                                        <Typography variant="body2" className="detail-text">
                                            <strong>שם:</strong> {user?.firstName || ''} {user?.lastName || ''}
                                        </Typography>
                                    </Box>
                                    
                                    <Box className="detail-item">
                                        <PhoneIcon className="detail-icon" />
                                        <Typography variant="body2" className="detail-text">
                                            <strong>טל:</strong> {user?.phone || ''}
                                        </Typography>
                                    </Box>
                                    
                                    <Box className="detail-item">
                                        <EmailIcon className="detail-icon" />
                                        <Typography variant="body2" className="detail-text">
                                            <strong>אימייל:</strong> {user?.email || ''}
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                        
                        {/* סיכום הזמנה */}
                        <Card className="order-card summary-card">
                            <CardContent>
                                <Typography variant="h6" component="h2" className="card-title">
                                    <PaymentIcon className="card-icon" />
                                    סיכום הזמנה
                                </Typography>
                                <Divider className="card-divider" />
                                
                                <Box className="summary-details">
                                    <Box className="summary-items">
                                        <Box className="summary-item">
                                            <Typography variant="body1">מספר פריטים:</Typography>
                                            <Typography variant="body1">{orders.length}</Typography>
                                        </Box>
                                        
                                        <Box className="summary-item">
                                            <Typography variant="body1">סה"כ כרטיסים:</Typography>
                                            <Typography variant="body1">
                                                {orders.reduce((sum, item) => sum + item.nOS, 0)}
                                            </Typography>
                                        </Box>
                                        
                                        <Box className="summary-item">
                                            <Typography variant="body1">סה"כ משקל עודף:</Typography>
                                            <Typography variant="body1">
                                                {orders.reduce((sum, item) => sum + item.overWight, 0)} ק"ג
                                            </Typography>
                                        </Box>
                                    </Box>
                                    
                                    <Divider className="summary-divider" />
                                    
                                    <Box className="total-price-container">
                                        <Typography variant="h5" component="p" className="total-label">
                                            סה"כ לתשלום:
                                        </Typography>
                                        <Typography variant="h4" component="p" className="total-price">
                                            ₪{price}
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                </Grid>
                
                {/* פרטי הזמנה עם גלילה */}
                <Grid item xs={12} md={8}>
                    <Card className="order-card flights-card content-fade-in">
                        <CardContent>
                            <Box className="flights-header">
                                <Box className="flights-title-section">
                                    <FlightTakeoffIcon className="flights-icon" />
                                    <Typography variant="h5" component="h2" className="flights-title">
                                        פרטי הטיסות שלך
                                    </Typography>
                                </Box>
                                <Typography variant="body2" color="textSecondary">
                                    {orders.length} טיסות
                                </Typography>
                            </Box>
                            
                            <Divider className="card-divider" />
                            
                            <Box className="flights-list-container" style={{ position: 'relative' }}>
                                <Box className="flights-list">
                                    {orders.map((item, index) => (
                                        <Paper key={index} elevation={0} className="flight-item">
                                            <Box className="flight-header">
                                                <Box className="route-section">
                                                    <Typography variant="h6" className="flight-route">
                                                        <FlightTakeoffIcon className="route-icon" />
                                                        {item.fromCity || item.src} → {item.toCity || item.des}
                                                    </Typography>
                                                </Box>
                                                <Chip 
                                                    label={`טיסה #${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`}
                                                    size="small"
                                                    color="primary"
                                                    variant="outlined"
                                                />
                                            </Box>
                                            
                                            <Grid container spacing={2} className="flight-details">
                                                <Grid item xs={6} sm={3}>
                                                    <Box className="detail-box">
                                                        <EventIcon className="detail-icon" />
                                                        <Typography variant="body2" className="detail-label">תאריך</Typography>
                                                        <Typography variant="body1" className="detail-value">{item.date}</Typography>
                                                    </Box>
                                                </Grid>
                                                
                                                <Grid item xs={6} sm={3}>
                                                    <Box className="detail-box">
                                                        <AirplaneTicketIcon className="detail-icon" />
                                                        <Typography variant="body2" className="detail-label">כרטיסים</Typography>
                                                        <Typography variant="body1" className="detail-value">{item.nOS}</Typography>
                                                    </Box>
                                                </Grid>
                                                
                                                <Grid item xs={6} sm={3}>
                                                    <Box className="detail-box">
                                                        <LuggageIcon className="detail-icon" />
                                                        <Typography variant="body2" className="detail-label">משקל עודף</Typography>
                                                        <Typography variant="body1" className="detail-value">{item.overWight} ק"ג</Typography>
                                                    </Box>
                                                </Grid>
                                                
                                                <Grid item xs={6} sm={3}>
                                                    <Box className="detail-box">
                                                        <PaymentIcon className="detail-icon" />
                                                        <Typography variant="body2" className="detail-label">מחיר</Typography>
                                                        <Typography variant="body1" className="detail-value price-value">
                                                            ₪{item.price * item.nOS + item.overWight * item.priceToOverLoad}
                                                        </Typography>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                            
                                            <Box className="flight-footer">
                                                <Chip 
                                                    icon={<AirplaneTicketIcon />}
                                                    label={`מחלקה: ${item.classs}`}
                                                    size="small"
                                                    color="primary"
                                                    variant="outlined"
                                                />
                                                <Chip 
                                                    icon={<EventIcon />}
                                                    label={`שעה: ${item.time}`}
                                                    size="small"
                                                    color="secondary"
                                                    variant="outlined"
                                                />
                                            </Box>
                                            
                                            {index < orders.length - 1 && <Divider className="flight-divider" />}
                                        </Paper>
                                    ))}
                                </Box>
                                
                                {/* אינדיקטור גלילה */}
                                <Fade in={showScrollIndicator}>
                                    <Box className={`scroll-indicator ${!showScrollIndicator ? 'hidden' : ''}`}>
                                        <KeyboardArrowDownIcon style={{ fontSize: '1rem', marginLeft: '5px' }} />
                                        גלול למטה לעוד טיסות
                                    </Box>
                                </Fade>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* כפתורים */}
            <Box className="order-actions">
                <Button 
                    variant="contained" 
                    color="primary" 
                    startIcon={<PictureAsPdfIcon />}
                    onClick={generateHebrewPDF}
                    size="large"
                    className="pdf-button"
                >
                    הורד פרטי הזמנה כ-PDF
                </Button>
                
                <Button 
                    variant="outlined" 
                    color="primary"
                    onClick={() => window.print()}
                    size="large"
                    className="print-button"
                    startIcon={<PrintIcon />}
                >
                    הדפס הזמנה
                </Button>
            </Box>
            
            {/* פרטי תחתית */}
            <Paper elevation={1} className="order-footer">
                <Typography variant="body2" className="footer-text">
                    תודה שבחרת לטוס עם טורס! לשאלות וברורים ניתן לפנות לשירות הלקוחות בטלפון 03-1234567
                </Typography>
                <Typography variant="body2" className="footer-text">
                    © {new Date().getFullYear()} טורס - כל הזכויות שמורות
                </Typography>
            </Paper>
        </Container>
    );
};