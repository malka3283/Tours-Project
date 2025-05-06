import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loct, setUserId } from "../../redux/slices/user/userSlice";
import { getAllCustomersThunk } from "../../redux/slices/flight/getAllCustomersThunk";
import { OrderDetail } from "../orderDetail/orderDetail";
import { 
  Box, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Typography, 
  Button, 
  IconButton, 
  Dialog, 
  TextField, 
  InputAdornment,
  Tooltip,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Divider,
  Container,
  Grid
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import RefreshIcon from '@mui/icons-material/Refresh';

import './customer.css';

export const Customer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const [ord, setOrd] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const dispatch = useDispatch();
  const customers = useSelector(state => state.flights.customers);
  
  useEffect(() => {
    dispatch(loct("/customer"));
    dispatch(getAllCustomersThunk());
  }, [dispatch]);

  // פילטור לקוחות לפי חיפוש
  const filteredCustomers = customers?.filter(customer => 
    customer.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone?.includes(searchTerm)
  );

  // פתיחת פרטי הזמנות
  const handleOpenOrders = (customerId) => {
    dispatch(setUserId(customerId));
    setOrd(true);
  };

  // רענון רשימת הלקוחות
  const handleRefresh = () => {
    dispatch(getAllCustomersThunk());
  };

  return (
    <Container maxWidth="xl" className="customer-container">
      <Box className="customer-header">
        <Typography variant="h4" component="h1" className="page-title">
          ניהול לקוחות
        </Typography>
        <Box className="header-actions">
          <TextField
            variant="outlined"
            size="small"
            placeholder="חיפוש לקוח..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-field"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Tooltip title="רענן רשימה">
            <IconButton onClick={handleRefresh} color="primary">
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Card className="customers-card">
        <CardContent className="card-content">
          <TableContainer component={Paper} className="table-container">
            <Table stickyHeader aria-label="טבלת לקוחות">
              <TableHead>
                <TableRow>
                  <TableCell className="table-header">שם פרטי</TableCell>
                  <TableCell className="table-header">שם משפחה</TableCell>
                  {!isMobile && <TableCell className="table-header">טלפון</TableCell>}
                  {!isMobile && <TableCell className="table-header">מייל</TableCell>}
                  {!isTablet && <TableCell className="table-header">סיסמא</TableCell>}
                  <TableCell className="table-header" align="center">פעולות</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCustomers?.length > 0 ? (
                  filteredCustomers.map((customer) => (
                    <TableRow key={customer.id} className="table-row">
                      <TableCell>{customer.firstName}</TableCell>
                      <TableCell>{customer.lastName}</TableCell>
                      {!isMobile && <TableCell>{customer.phone}</TableCell>}
                      {!isMobile && <TableCell>{customer.email}</TableCell>}
                      {!isTablet && <TableCell>{customer.password}</TableCell>}
                      <TableCell align="center" className="action-cell">
                        <Box className="action-buttons">
                          <Tooltip title="צפה בהזמנות">
                            <IconButton 
                              color="primary" 
                              onClick={() => handleOpenOrders(customer.id)}
                              size="small"
                            >
                              <VisibilityIcon />
                            </IconButton>
                          </Tooltip>
                         
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={isMobile ? 3 : isTablet ? 5 : 6} align="center">
                      <Typography variant="body1" className="no-data-message">
                        {customers?.length > 0 ? 'לא נמצאו לקוחות התואמים לחיפוש' : 'אין לקוחות להצגה'}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* דיאלוג פרטי הזמנות */}
      <Dialog 
        open={ord} 
        onClose={() => setOrd(false)} 
        maxWidth="md" 
        fullWidth
        className="order-dialog"
      >
        <OrderDetail />
        <Box className="dialog-actions">
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => setOrd(false)}
          >
            סגור
          </Button>
        </Box>
      </Dialog>
    </Container>
  );
};