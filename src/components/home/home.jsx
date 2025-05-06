import { Outlet, useNavigate } from "react-router-dom";
import { Routing } from "../routing/routing";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loct, setUserId, signOut } from "../../redux/slices/user/userSlice";
import { getAllFlightThunk } from "../../redux/slices/flight/getAllFlightThunk";
import { getAllDestinationThunk } from "../../redux/slices/flight/getAllDestinationThunk";
import './home.css';

// MUI imports
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Container,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Badge,
  Divider,
  useMediaQuery,
  useTheme
} from "@mui/material";

// MUI icons
import PersonIcon from '@mui/icons-material/Person';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import FlightIcon from '@mui/icons-material/Flight';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import BookIcon from '@mui/icons-material/Book';

export const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);
    const cartItems = useSelector(state => state.flights.orders || []);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    
    // State for mobile drawer
    const [drawerOpen, setDrawerOpen] = useState(false);
    
    // State for user menu
    const [userMenuAnchor, setUserMenuAnchor] = useState(null);
    
    useEffect(() => {
        dispatch(loct("/about"));
        dispatch(getAllFlightThunk());
        dispatch(getAllDestinationThunk());
    }, [dispatch]);
    
    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };
    
    const handleUserMenuOpen = (event) => {
        setUserMenuAnchor(event.currentTarget);
    };
    
    const handleUserMenuClose = () => {
        setUserMenuAnchor(null);
    };
    
    const handleLogout = () => {
        handleUserMenuClose();
        // navigate('/logIn');
        dispatch(signOut())
    };
    
    // Drawer content for mobile
    const drawerContent = (
        <Box className="drawer-content">
            <List>
                <ListItem button onClick={() => { navigate('/chooseClass'); setDrawerOpen(false); }}>
                    <ListItemIcon><FlightIcon /></ListItemIcon>
                    <ListItemText primary="טיסות" />
                </ListItem>
                
                <ListItem button onClick={() => { navigate('/flightsWhisHanach'); setDrawerOpen(false); }}>
                    <ListItemIcon><LocalOfferIcon /></ListItemIcon>
                    <ListItemText primary="מבצעים" />
                </ListItem>
                
                <ListItem button onClick={() => { navigate('/find'); setDrawerOpen(false); }}>
                    <ListItemIcon><SearchIcon /></ListItemIcon>
                    <ListItemText primary="חיפוש טיסה אוטומטי" />
                </ListItem>
            </List>
            <Divider />
            <List>
                {user ? (
                    <>
                        <ListItem>
                            <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                            <ListItemText primary={`שלום ${user.firstName}`} />
                        </ListItem>
                        
                        <ListItem button onClick={() => { navigate('/orderDetail'); setDrawerOpen(false); }}>
                            <ListItemIcon><BookIcon /></ListItemIcon>
                            <ListItemText primary="ההזמנות שלי" />
                        </ListItem>
                        
                        {user.isManager === 1 && (
                            <ListItem button onClick={() => { navigate('/handle'); setDrawerOpen(false); }}>
                                <ListItemIcon><ManageAccountsIcon /></ListItemIcon>
                                <ListItemText primary="ניהול" />
                            </ListItem>
                        )}
                        
                        <ListItem button onClick={() => { handleLogout(); setDrawerOpen(false); }}>
                            <ListItemIcon><LogoutIcon /></ListItemIcon>
                            <ListItemText primary="התנתק" />
                        </ListItem>
                    </>
                ) : (
                    <ListItem button onClick={() => { navigate('/logIn'); setDrawerOpen(false); }}>
                        <ListItemIcon><PersonIcon /></ListItemIcon>
                        <ListItemText primary="התחברות / הרשמה" />
                    </ListItem>
                )}
            </List>
        </Box>
    );

    return (
        <Box className="app-container">
            <AppBar position="sticky" className="app-bar">
                <Toolbar className="toolbar">
                    {isMobile && (
                        <IconButton
                            color="inherit"
                            edge="start"
                            onClick={handleDrawerToggle}
                            className="menu-button"
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    
                    <Typography 
                        variant="h6" 
                        component="div" 
                        className="app-title"
                        onClick={() => navigate('/about')}
                    >
                        מערכת הזמנת טיסות
                    </Typography>
                    
                    {!isMobile && (
                        <Box className="nav-buttons">
                            <Button
                                color="inherit"
                                onClick={() => navigate('/chooseClass')}
                                startIcon={<FlightIcon />}
                                className="nav-button"
                            >
                                טיסות
                            </Button>
                            
                            <Button
                                color="inherit"
                                onClick={() => navigate('/flightsWhisHanach')}
                                startIcon={<LocalOfferIcon />}
                                className="nav-button"
                            >
                                מבצעים
                            </Button>
                            
                            <Button
                                color="inherit"
                                onClick={() => navigate('/find')}
                                startIcon={<SearchIcon />}
                                className="nav-button"
                            >
                                חיפוש טיסה
                            </Button>
                        </Box>
                    )}
                    
                    <Box className="toolbar-actions">
                        <IconButton
                            color="inherit"
                            onClick={() => navigate('/cart')}
                            className="action-button"
                        >
                            <Badge badgeContent={cartItems.length} color="error">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                        
                        {user ? (
                            <>
                                <IconButton
                                    onClick={handleUserMenuOpen}
                                    color="inherit"
                                    className="user-button"
                                >
                                    <Avatar className="user-avatar">
                                        {user.firstName.charAt(0)}
                                    </Avatar>
                                </IconButton>
                                
                                <Menu
                                    anchorEl={userMenuAnchor}
                                    open={Boolean(userMenuAnchor)}
                                    onClose={handleUserMenuClose}
                                    className="user-menu"
                                >
                                    <MenuItem disabled className="user-greeting">
                                        <Typography variant="body2">
                                            שלום {user.firstName}
                                        </Typography>
                                    </MenuItem>
                                    <Divider />
                                    
                                    <MenuItem onClick={() => { dispatch(setUserId(user.id)); navigate('/orderDetail'); handleUserMenuClose(); }} className="menu-item">
                                        <ListItemIcon>
                                            <BookIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="ההזמנות שלי" />
                                    </MenuItem>
                                    
                                    {user.isManager === 1 && (
                                        <MenuItem onClick={() => { navigate('/handle'); handleUserMenuClose(); }} className="menu-item">
                                            <ListItemIcon>
                                                <ManageAccountsIcon fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText primary="ניהול מערכת" />
                                        </MenuItem>
                                    )}
                                    
                                    <Divider />
                                    <MenuItem onClick={handleLogout} className="menu-item">
                                        <ListItemIcon>
                                            <LogoutIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="התנתק" />
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <Button
                                color="inherit"
                                startIcon={<PersonIcon />}
                                onClick={() => navigate('/logIn')}
                                className="login-button"
                            >
                                התחברות
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
            
            {/* Mobile drawer */}
            <Drawer
                variant="temporary"
                open={drawerOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                className="mobile-drawer"
            >
                {drawerContent}
            </Drawer>
            
            {/* Main content */}
            <Container className="main-content">
                <Routing />
                <Outlet />
            </Container>
            
            {/* Footer */}
            <Box component="footer" className="footer">
                <Container>
                    <Typography variant="body2" align="center" className="copyright">
                        © {new Date().getFullYear()} מערכת הזמנת טיסות - כל הזכויות שמורות
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
};