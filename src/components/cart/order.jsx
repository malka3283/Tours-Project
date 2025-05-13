import { useSelector } from "react-redux";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Button, Box, Typography, Paper, Container } from "@mui/material";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

export const Order = () => {
    const orders = useSelector(state => state.flights.ordersToPdf);
    const price = useSelector(state => state.flights.price);
    const user = useSelector(state => state.users.user);

    const generateOrderPDF = () => {
        // יצירת מסמך PDF חדש
        const doc = new jsPDF();
        
        // הוספת תמיכה בעברית
        doc.addFont("https://cdn.jsdelivr.net/npm/source-sans-pro@3.6.0/TTF/SourceSansPro-Regular.ttf", "SourceSansPro", "normal");
        doc.setFont("SourceSansPro");
        
        // הגדרת כיוון טקסט מימין לשמאל עבור עברית
        doc.setR2L(true);
        
        // הוספת כותרת
        doc.setFontSize(22);
        doc.setTextColor(41, 128, 185); // צבע כחול לכותרת
        doc.text("פרטי הזמנה", 105, 20, { align: "center" });
        
        // הוספת לוגו או כותרת משנית
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.text("טורס - חברת תעופה", 105, 30, { align: "center" });
        
        // הוספת קו מפריד
        doc.setDrawColor(41, 128, 185);
        doc.setLineWidth(0.5);
        doc.line(20, 35, 190, 35);
        
        // הוספת תאריך נוכחי
        const today = new Date();
        const formattedDate = today.toLocaleDateString('he-IL');
        doc.setFontSize(12);
        doc.text(`תאריך: ${formattedDate}`, 190, 45, { align: "right" });
        
        // הוספת מספר הזמנה
        const orderNumber = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
        doc.text(`מספר הזמנה: ${orderNumber}`, 190, 52, { align: "right" });
        
        // הוספת פרטי לקוח
        doc.setFontSize(14);
        doc.setTextColor(41, 128, 185);
        doc.text("פרטי לקוח:", 190, 65, { align: "right" });
        
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`שם: ${user?.firstName || ''} ${user?.lastName || ''}`, 190, 75, { align: "right" });
        doc.text(`אימייל: ${user?.email || ''}`, 190, 82, { align: "right" });
        doc.text(`טלפון: ${user?.phone || ''}`, 190, 89, { align: "right" });
        
        // הוספת כותרת לפרטי ההזמנה
        doc.setFontSize(14);
        doc.setTextColor(41, 128, 185);
        doc.text("פרטי ההזמנה:", 105, 105, { align: "center" });
        
        // הכנת נתונים לטבלה
        const tableColumn = ["מחיר", "מחיר משקל עודף", "משקל עודף", "כמות כרטיסים", "תאריך", "יעד", "מוצא"];
        const tableRows = [];
        
        orders.forEach(item => {
            const itemData = [
                `₪${item.price * item.nOS + item.overWight * item.priceToOverLoad}`,
                `₪${item.priceToOverLoad}`,
                item.overWight,
                item.nOS,
                item.date || formattedDate,
                item.toCity,
                item.fromCity
            ];
            tableRows.push(itemData);
        });
        
        // הוספת טבלה למסמך
        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 110,
            theme: 'grid',
            styles: { font: "SourceSansPro", halign: 'right' },
            headStyles: { fillColor: [41, 128, 185], textColor: 255 },
            margin: { right: 15, left: 15 },
            tableWidth: 'auto'
        });
        
        // הוספת סיכום מחיר
        const finalY = doc.lastAutoTable.finalY || 150;
        doc.setFontSize(16);
        doc.setTextColor(41, 128, 185);
        doc.text(`סה"כ לתשלום: ₪${price}`, 190, finalY + 20, { align: "right" });
        
        // הוספת הערות ותנאים
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text("הערות:", 190, finalY + 35, { align: "right" });
        doc.text("• מסמך זה מהווה אישור הזמנה.", 190, finalY + 42, { align: "right" });
        doc.text("• יש להציג מסמך זה בעת ההגעה לטיסה.", 190, finalY + 49, { align: "right" });
        doc.text("• לשאלות וibirורים ניתן לפנות לשירות הלקוחות בטלפון 03-1234567.", 190, finalY + 56, { align: "right" });
        
        // הוספת כותרת תחתונה
        doc.setFontSize(8);
        doc.text("טורס - חברת תעופה | רח' הרצל 123, תל אביב | טלפון: 03-1234567 | www.tours-project.com", 105, 285, { align: "center" });
        
        // שמירת המסמך
        doc.save(`הזמנה-${orderNumber}-${formattedDate}.pdf`);
    };

    return (
        <Container maxWidth="md" sx={{ my: 4 }}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
                    פרטי ההזמנה שלך
                </Typography>
                
                <Box sx={{ my: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        פרטי לקוח:
                    </Typography>
                    <Typography variant="body1">
                        שם: {user?.firstName || ''} {user?.lastName || ''}
                    </Typography>
                    <Typography variant="body1">
                        אימייל: {user?.email || ''}
                    </Typography>
                </Box>
                
                <Box sx={{ my: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        פרטי הזמנה:
                    </Typography>
                    {orders.map((item, index) => (
                        <Paper key={index} elevation={1} sx={{ p: 2, mb: 2, borderRadius: 1 }}>
                            <Typography variant="body1">
                                טיסה: {item.src}- {item.des}
                            </Typography>
                            <Typography variant="body1">
                                כמות כרטיסים: {item.nOS}
                            </Typography>
                            <Typography variant="body1">
                                משקל עודף: {item.overWight} ק"ג
                            </Typography>
                            <Typography variant="body1">
                                מחיר: ₪{item.price * item.nOS + item.overWight * item.priceToOverLoad}
                            </Typography>
                        </Paper>
                    ))}
                </Box>
                
                <Box sx={{ my: 3, textAlign: 'center' }}>
                    <Typography variant="h5" color="primary">
                        סה"כ לתשלום: ₪{price}
                    </Typography>
                </Box>
                
                <Box sx={{ mt: 4, textAlign: 'center' }}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        startIcon={<PictureAsPdfIcon />}
                        onClick={generateOrderPDF}
                        size="large"
                    >
                        הורד פרטי הזמנה כ-PDF
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};