import { useSelector } from "react-redux";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
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
    Chip
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
import "./order.css";

export const Order = () => {
    const orders = useSelector(state => state.flights.ordersToPdf);
    const price = useSelector(state => state.flights.price);
    const user = useSelector(state => state.users.user);

    const generateOrderPDF = () => {
        // יצירת מסמך PDF חדש
        const doc = new jsPDF();
        
        // הגדרת צבעי מותג
        const primaryColor = [25, 118, 210]; // כחול של האתר
        
        // הוספת רקע לכותרת
        doc.setFillColor(...primaryColor);
        doc.rect(0, 0, 210, 40, 'F');
        
        // כותרת ראשית - בצבע לבן על רקע כחול
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(22);
        doc.text("פרטי הזמנה", 105, 20, { align: "center" });
        
        // מספר הזמנה
        const orderNumber = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
        doc.setFontSize(12);
        doc.text(`הזמנה מספר #: ${orderNumber}`, 105, 30, { align: "center" });
        
        // תאריך נוכחי
        const today = new Date();
        const formattedDate = today.toLocaleDateString('en-US');
        
        // פרטי לקוח
        doc.setTextColor(0, 0, 0);
        doc.setFillColor(245, 245, 245);
        doc.roundedRect(15, 50, 180, 40, 3, 3, 'F');
        
        doc.setTextColor(...primaryColor);
        doc.setFontSize(14);
        doc.text("Customer Details:", 20, 60);
        
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.text(`Name: ${user?.firstName || ''} ${user?.lastName || ''}`, 20, 70);
        doc.text(`Email: ${user?.email || ''}`, 20, 80);
        
        // טבלת פרטי הזמנה
        const tableColumn = ["Price", "Weight", "Tickets", "Date", "Destination", "Origin"];
        const tableRows = [];
        
        orders.forEach(item => {
            const itemData = [
                `₪${item.price * item.nOS + item.overWight * item.priceToOverLoad}`,
                `${item.overWight} kg`,
                item.nOS,
                item.date || formattedDate,
                item.des || item.toCity,
                item.src || item.fromCity
            ];
            tableRows.push(itemData);
        });
        
        // עיצוב מודרני לטבלה
        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 100,
            theme: 'grid',
            styles: { 
                halign: 'left',
                fontSize: 10,
                cellPadding: 6
            },
            headStyles: { 
                fillColor: primaryColor, 
                textColor: 255,
                fontStyle: 'bold'
            },
            alternateRowStyles: {
                fillColor: [250, 250, 250]
            },
            margin: { right: 15, left: 15 }
        });
        
        // סיכום מחיר
        const finalY = doc.lastAutoTable.finalY + 20;
        
        // מסגרת לסיכום מחיר
        doc.setDrawColor(...primaryColor);
        doc.setFillColor(245, 245, 245);
        doc.roundedRect(15, finalY, 90, 30, 3, 3, 'FD');
        
        // סה"כ לתשלום
        doc.setTextColor(...primaryColor);
        doc.setFontSize(16);
        doc.text("Total Payment:", 20, finalY + 15);
        
        doc.setFontSize(18);
        doc.text(`₪${price}`, 80, finalY + 15, { align: "right" });
        
        // הערות והנחיות
        const notesY = finalY + 40;
        doc.setDrawColor(...primaryColor);
        doc.setFillColor(255, 255, 255);
        doc.roundedRect(15, notesY, 180, 50, 3, 3, 'FD');
        
        doc.setTextColor(...primaryColor);
        doc.setFontSize(14);
        doc.text("Important Notes:", 20, notesY + 15);
        
        doc.setTextColor(80, 80, 80);
        doc.setFontSize(10);
        doc.text("• This document is an official order confirmation", 20, notesY + 25);
        doc.text("• Please present this document when arriving for your flight", 20, notesY + 35);
        doc.text("• For questions and inquiries: 03-1234567", 20, notesY + 45);
        
        // פוטר
        doc.setFillColor(...primaryColor);
        doc.rect(0, 280, 210, 17, 'F');
        
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(10);
        doc.text("חברה - גלובוס | טלפון: 03-1234567 | www.globus.com", 105, 290, { align: "center" });
        
        // שמירת המסמך
        doc.save(`Order-${orderNumber}-${formattedDate}.pdf`);
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
                                    {/* שילוב שם מלא וטלפון בשורה אחת */}
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
                                    
                                    {/* אימייל בשורה נפרדת */}
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
                
                {/* פרטי הזמנה */}
                <Grid item xs={12} md={8}>
                    <Card className="order-card flights-card content-fade-in">
                        <CardContent>
                            <Typography variant="h5" component="h2" className="card-title">
                                <ConfirmationNumberIcon className="card-icon" />
                                פרטי הטיסות
                            </Typography>
                            <Divider className="card-divider" />
                            
                            <Box className="flights-list-container">
                                <Box className="flights-list">
                                    {orders.map((item, index) => (
                                        <Paper key={index} elevation={0} className="flight-item">
                                            <Box className="flight-header">
                                                <Typography variant="h6" className="flight-route">
                                                    <FlightTakeoffIcon className="route-icon" />
                                                    {item.fromCity || item.src} - {item.toCity || item.des}
                                                </Typography>
                                                <Chip 
                                                    label={`מספר טיסה: ${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`}
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
                    onClick={generateOrderPDF}
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