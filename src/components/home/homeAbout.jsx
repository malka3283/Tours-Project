import React, { useEffect, useState, useRef } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia,
  Button,
  useMediaQuery,
  useTheme,
  Paper,
  Divider,
  Avatar,
  IconButton,
  Fade,
  Slide,
  Zoom,
  Rating,
  TextField,
  InputAdornment,
  Chip
} from '@mui/material';

// Icons
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SecurityIcon from '@mui/icons-material/Security';
import PublicIcon from '@mui/icons-material/Public';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import FlightIcon from '@mui/icons-material/Flight';
import HotelIcon from '@mui/icons-material/Hotel';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SendIcon from '@mui/icons-material/Send';

import './HomeAbout.css';

export const HomeAbout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  
  // Refs for scroll animations
  const featuresRef = useRef(null);
  const destinationsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const searchRef = useRef(null);
  
  // State for animations
  const [featuresVisible, setFeaturesVisible] = useState(false);
  const [destinationsVisible, setDestinationsVisible] = useState(false);
  const [testimonialsVisible, setTestimonialsVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  
  // State for destination carousel
  const [currentDestination, setCurrentDestination] = useState(0);
  
  // Popular destinations data
  const destinations = [
    {
      city: "פריז",
      country: "צרפת",
      image: "https://source.unsplash.com/featured/?paris,eiffel",
      description: "עיר האורות, הרומנטיקה והאמנות",
      price: "החל מ-499€",
      rating: 4.8,
      tags: ["רומנטי", "תרבות", "אוכל"]
    },
    {
      city: "טוקיו",
      country: "יפן",
      image: "https://source.unsplash.com/featured/?tokyo,japan",
      description: "שילוב מושלם של מסורת וטכנולוגיה",
      price: "החל מ-799€",
      rating: 4.9,
      tags: ["אסיה", "טכנולוגיה", "תרבות"]
    },
    {
      city: "ניו יורק",
      country: "ארה״ב",
      image: "https://source.unsplash.com/featured/?newyork,skyline",
      description: "העיר שאף פעם לא ישנה",
      price: "החל מ-599€",
      rating: 4.7,
      tags: ["קניות", "אורבני", "תרבות"]
    },
    {
      city: "ברצלונה",
      country: "ספרד",
      image: "https://source.unsplash.com/featured/?barcelona,sagrada",
      description: "אדריכלות, חופים וטאפאס",
      price: "החל מ-349€",
      rating: 4.6,
      tags: ["חופים", "אוכל", "אדריכלות"]
    },
    {
      city: "בנגקוק",
      country: "תאילנד",
      image: "https://source.unsplash.com/featured/?bangkok,thailand",
      description: "מקדשים, שווקים ואוכל רחוב מדהים",
      price: "החל מ-649€",
      rating: 4.5,
      tags: ["אסיה", "אוכל", "תרבות"]
    },
    {
      city: "רומא",
      country: "איטליה",
      image: "https://source.unsplash.com/featured/?rome,colosseum",
      description: "עיר נצחית עם היסטוריה עשירה",
      price: "החל מ-399€",
      rating: 4.7,
      tags: ["היסטוריה", "אוכל", "אמנות"]
    }
  ];
  
  // Features data
  const features = [
    {
      icon: <FlightTakeoffIcon fontSize="large" />,
      title: "יעדים גלובליים",
      description: "גישה ליותר מ-500 חברות תעופה ו-10,000+ יעדים ברחבי העולם. מצא את הטיסה המושלמת להרפתקה הבאה שלך."
    },
    {
      icon: <LocalOfferIcon fontSize="large" />,
      title: "הבטחת המחיר הטוב ביותר",
      description: "אנו מבטיחים את התעריפים הטובים ביותר. מצאת מחיר טוב יותר במקום אחר? נשווה אותו וניתן לך הנחה נוספת."
    },
    {
      icon: <SupportAgentIcon fontSize="large" />,
      title: "תמיכה 24/7",
      description: "צוות התמיכה המסור שלנו זמין סביב השעון כדי לסייע בכל שאלה או בעיה הקשורה להזמנה שלך."
    },
    {
      icon: <SecurityIcon fontSize="large" />,
      title: "הזמנה מאובטחת",
      description: "המידע האישי ופרטי התשלום שלך מוגנים באמצעות טכנולוגיית הצפנה מתקדמת."
    }
  ];
  
  // Testimonials data
  const testimonials = [
    {
      name: "שרה כהן",
      location: "תל אביב",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      text: "תהליך ההזמנה היה חלק להפליא. מצאתי עסקה נהדרת על הטיסה שלי לברצלונה ושירות הלקוחות היה יוצא מן הכלל כשהייתי צריכה לשנות את ההזמנה שלי.",
      rating: 5
    },
    {
      name: "מיכאל לוי",
      location: "חיפה",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      text: "אני משתמש בשירות הזה לכל נסיעות העסקים שלי בשנה האחרונה. הממשק אינטואיטיבי, המחירים תחרותיים, ואני אוהב את התראות הדוא\"ל על ירידות מחירים.",
      rating: 4.5
    },
    {
      name: "עדי פרץ",
      location: "ירושלים",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      text: "מציאת טיסות לחופשת המשפחה שלנו הייתה קלה מאוד. המסננים עזרו לי למצוא את זמני הטיסה המושלמים ותכונת השוואת המחירים חסכה לנו הרבה כסף!",
      rating: 5
    }
  ];
  
  // Scroll animation effect
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.target === featuresRef.current && entry.isIntersecting) {
          setFeaturesVisible(true);
        } else if (entry.target === destinationsRef.current && entry.isIntersecting) {
          setDestinationsVisible(true);
        } else if (entry.target === testimonialsRef.current && entry.isIntersecting) {
          setTestimonialsVisible(true);
        } else if (entry.target === searchRef.current && entry.isIntersecting) {
          setSearchVisible(true);
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    if (featuresRef.current) observer.observe(featuresRef.current);
    if (destinationsRef.current) observer.observe(destinationsRef.current);
    if (testimonialsRef.current) observer.observe(testimonialsRef.current);
    if (searchRef.current) observer.observe(searchRef.current);
    
    return () => {
      if (featuresRef.current) observer.unobserve(featuresRef.current);
      if (destinationsRef.current) observer.unobserve(destinationsRef.current);
      if (testimonialsRef.current) observer.unobserve(testimonialsRef.current);
      if (searchRef.current) observer.unobserve(searchRef.current);
    };
  }, []);
  
  // Handle destination carousel navigation
  const nextDestination = () => {
    setCurrentDestination((prev) => 
      prev === destinations.length - (isTablet ? 1 : isLargeScreen ? 4 : 3) ? 0 : prev + 1
    );
  };
  
  const prevDestination = () => {
    setCurrentDestination((prev) => 
      prev === 0 ? destinations.length - (isTablet ? 1 : isLargeScreen ? 4 : 3) : prev - 1
    );
  };
  
  // Visible destinations based on screen size
  const visibleDestinations = isTablet 
    ? destinations.slice(currentDestination, currentDestination + 1)
    : isLargeScreen
      ? destinations.slice(currentDestination, currentDestination + 4)
      : destinations.slice(currentDestination, currentDestination + 3);

  return (
    <Box className="home-about-container">
      {/* Hero Section with Search */}
      <Box className="hero-section">
        <Container maxWidth="xl">
          <Grid container spacing={4} alignItems="center" className="hero-grid">
            <Grid item xs={12} md={6} className="hero-content">
              <Fade in={true} timeout={1000}>
                <Box>
                  <Typography 
                    variant={isMobile ? "h3" : "h1"} 
                    component="h1" 
                    className="hero-title"
                    gutterBottom
                  >
                    <span className="text-gradient">המסע שלך</span> מתחיל איתנו
                  </Typography>
                  
                  <Typography 
                    variant="h6" 
                    className="hero-subtitle"
                    sx={{ mb: 4 }}
                  >
                    גלה את העולם עם חווית הזמנת טיסות חלקה. 
                    מחירים משתלמים, אפשרויות גמישות ושירות יוצא מן הכלל.
                  </Typography>
                  
                  <Box ref={searchRef} className="search-box-container">
                    <Slide direction="up" in={searchVisible} timeout={800}>
                      <Paper elevation={6} className="search-box">
                        <Box className="search-tabs">
                          <Box className="search-tab active">
                            <FlightIcon fontSize="small" />
                            <Typography variant="body2">טיסות</Typography>
                          </Box>
                          <Box className="search-tab">
                            <HotelIcon fontSize="small" />
                            <Typography variant="body2">מלונות</Typography>
                          </Box>
                          <Box className="search-tab">
                            <DirectionsCarIcon fontSize="small" />
                            <Typography variant="body2">רכב</Typography>
                          </Box>
                          <Box className="search-tab">
                            <LocalActivityIcon fontSize="small" />
                            <Typography variant="body2">אטרקציות</Typography>
                          </Box>
                        </Box>
                        
                        <Box className="search-fields">
                          <Grid container spacing={2}>
                            <Grid item xs={12} md={5}>
                              <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="מאיפה?"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <LocationOnIcon className="search-icon" />
                                    </InputAdornment>
                                  ),
                                }}
                                className="search-input"
                              />
                            </Grid>
                            <Grid item xs={12} md={5}>
                              <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="לאן?"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <LocationOnIcon className="search-icon" />
                                    </InputAdornment>
                                  ),
                                }}
                                className="search-input"
                              />
                            </Grid>
                            <Grid item xs={12} md={2}>
                              <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="תאריך נסיעה"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <EventIcon className="search-icon" />
                                    </InputAdornment>
                                  ),
                                }}
                                className="search-input"
                              />
                            </Grid>
                            <Grid item xs={12} md={2}>
                              <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="תאריך חזרה"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <EventIcon className="search-icon" />
                                    </InputAdornment>
                                  ),
                                }}
                                className="search-input"
                              />
                            </Grid>
                            <Grid item xs={12} md={2}>
                              <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="מספר נסעים"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <PersonIcon className="search-icon" />
                                    </InputAdornment>
                                  ),
                                }}
                                className="search-input"
                              />
                            </Grid>
                            <Grid item xs={12} md={2}>
                              <Button 
                                fullWidth 
                                variant="contained" 
                                className="search-button"
                                endIcon={<SearchIcon />}
                              >
                                חיפוש
                              </Button>
                            </Grid>
                          </Grid>
                          
                          <Box className="search-options">
                            <Chip 
                              icon={<EventIcon />} 
                              label="כל התאריכים" 
                              variant="outlined" 
                              className="search-chip"
                              clickable
                            />
                            <Chip 
                              icon={<PersonIcon />} 
                              label="נוסע אחד" 
                              variant="outlined" 
                              className="search-chip"
                              clickable
                            />
                            <Chip 
                              icon={<FlightIcon />} 
                              label="מחלקת תיירים" 
                              variant="outlined" 
                              className="search-chip"
                              clickable
                            />
                          </Box>
                        </Box>
                      </Paper>
                    </Slide>
                  </Box>
                </Box>
              </Fade>
            </Grid>
            
            <Grid item xs={12} md={6} className="hero-image-container">
              <Zoom in={true} timeout={1000}>
                <Box className="hero-image-wrapper">
                  <Box 
                    component="img"
                    src="https://source.unsplash.com/random/1200x800/?airplane,travel,sunset"
                    alt="Travel"
                    className="hero-image"
                  />
                  <Box className="floating-card-container">
                    <Paper elevation={6} className="floating-card">
                      <Box className="floating-card-content">
                        <Box className="floating-card-icon">
                          <VerifiedUserIcon />
                        </Box>
                        <Box>
                          <Typography variant="body2" className="floating-card-title">
                            הבטחת מחיר
                          </Typography>
                          <Typography variant="caption" className="floating-card-subtitle">
                            המחירים הטובים ביותר מובטחים
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
                    
                    <Paper elevation={6} className="floating-card">
                      <Box className="floating-card-content">
                        <Box className="floating-card-icon secondary">
                          <SupportAgentIcon />
                        </Box>
                        <Box>
                          <Typography variant="body2" className="floating-card-title">
                            תמיכה 24/7
                          </Typography>
                          <Typography variant="caption" className="floating-card-subtitle">
                            זמינו תמיד לעזור לך
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
                  </Box>
                </Box>
              </Zoom>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="xl">
        <Box className="stats-section">
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={6} sm={3}>
              <Box className="stat-item">
                <Typography variant="h3" className="stat-number">500+</Typography>
                <Typography variant="body2" className="stat-label">חברות תעופה</Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box className="stat-item">
                <Typography variant="h3" className="stat-number">10K+</Typography>
                <Typography variant="body2" className="stat-label">יעדים</Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box className="stat-item">
                <Typography variant="h3" className="stat-number">2M+</Typography>
                <Typography variant="body2" className="stat-label">לקוחות מרוצים</Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box className="stat-item">
                <Typography variant="h3" className="stat-number">24/7</Typography>
                <Typography variant="body2" className="stat-label">תמיכת לקוחות</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* Features Section */}
      <Container maxWidth="xl" ref={featuresRef}>
        <Box className="section-header">
          <Typography 
            variant="h2" 
            component="h2" 
            className="section-title"
          >
            למה <span className="text-gradient">לבחור בנו</span>
          </Typography>
          <Typography 
            variant="h6" 
            className="section-subtitle"
          >
            אנו מחויבים להפוך את חווית הנסיעה שלך ליוצאת מן הכלל מההתחלה ועד הסוף
          </Typography>
        </Box>

        <Grid container spacing={4} className="features-grid">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Zoom in={featuresVisible} timeout={500 + index * 200}>
                <Card className="feature-card">
                  <CardContent className="feature-card-content">
                    <Box className="feature-icon-wrapper">
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" component="h3" className="feature-title">
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" className="feature-description">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Zoom>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Popular Destinations */}
      <Box className="destinations-section" ref={destinationsRef}>
        <Container maxWidth="xl">
          <Box className="section-header">
            <Typography 
              variant="h2" 
              component="h2" 
              className="section-title"
            >
              יעדים <span className="text-gradient">ibriחים</span>
            </Typography>
            <Typography 
              variant="h6" 
              className="section-subtitle"
            >
              גלה את היעדים המבוקשים ביותר שלנו
            </Typography>
          </Box>
          
          <Box className="destinations-carousel-container">
            <Box className="destinations-carousel-controls">
              <IconButton 
                className="carousel-control prev" 
                onClick={prevDestination}
                disabled={currentDestination === 0}
              >
                <ArrowBackIosIcon />
              </IconButton>
              <IconButton 
                className="carousel-control next" 
                onClick={nextDestination}
                disabled={currentDestination === destinations.length - (isTablet ? 1 : isLargeScreen ? 4 : 3)}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </Box>
            
            <Box className="destinations-carousel">
              {visibleDestinations.map((destination, index) => (
                <Fade in={destinationsVisible} timeout={500 + index * 200} key={index}>
                  <Card className="destination-card">
                    <Box className="destination-image-container">
                      <CardMedia
                        component="img"
                        height="220"
                        image={destination.image}
                        alt={destination.city}
                        className="destination-image"
                      />
                      <Box className="destination-price">
                        <Typography variant="body2">
                          {destination.price}
                        </Typography>
                      </Box>
                    </Box>
                    <CardContent className="destination-content">
                      <Box className="destination-rating">
                        <Rating 
                          value={destination.rating} 
                          readOnly 
                          precision={0.1}
                          size="small"
                          icon={<StarIcon fontSize="inherit" />}
                        />
                        <Typography variant="body2" className="rating-value">
                          {destination.rating}
                        </Typography>
                      </Box>
                      <Typography variant="h5" component="h3" className="destination-title">
                        {destination.city}
                      </Typography>
                      <Typography variant="body2" className="destination-country">
                        {destination.country}
                      </Typography>
                      <Typography variant="body2" className="destination-description">
                        {destination.description}
                      </Typography>
                      <Box className="destination-tags">
                        {destination.tags.map((tag, idx) => (
                          <Chip 
                            key={idx} 
                            label={tag} 
                            size="small" 
                            className="destination-tag"
                          />
                        ))}
                      </Box>
                      <Button 
                        variant="outlined" 
                        className="destination-button"
                        endIcon={<ArrowForwardIcon />}
                      >
                        גלה עוד
                      </Button>
                    </CardContent>
                  </Card>
                </Fade>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box className="cta-section">
        <Container maxWidth="xl">
          <Grid container spacing={4} alignItems="center" justifyContent="center">
            <Grid item xs={12} md={8} textAlign="center">
              <Typography 
                variant="h2" 
                component="h2" 
                className="cta-title"
                gutterBottom
              >
                מוכנים להרפתקה הבאה שלכם?
              </Typography>
              <Typography 
                variant="h6" 
                className="cta-subtitle"
                sx={{ mb: 4 }}
              >
                הצטרפו לאלפי נוסעים מרוצים שמצאו את הטיסות המושלמות שלהם איתנו
              </Typography>
              <Button 
                size="large" 
                variant="contained" 
                className="cta-button"
                endIcon={<FlightTakeoffIcon />}
              >
                חפש טיסות עכשיו
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Testimonials */}
      <Container maxWidth="xl" ref={testimonialsRef}>
        <Box className="section-header">
          <Typography 
            variant="h2" 
            component="h2" 
            className="section-title"
          >
            מה <span className="text-gradient">הלקוחות שלנו</span> אומרים
          </Typography>
          <Typography 
            variant="h6" 
            className="section-subtitle"
          >
            אל תסתמכו רק על המילה שלנו
          </Typography>
        </Box>

        <Grid container spacing={4} className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Fade in={testimonialsVisible} timeout={500 + index * 200}>
                <Card className="testimonial-card">
                  <CardContent className="testimonial-content">
                    <Box className="testimonial-quote-icon">
                      <FormatQuoteIcon />
                    </Box>
                    <Typography variant="body1" className="testimonial-text">
                      {testimonial.text}
                    </Typography>
                    <Box className="testimonial-rating">
                      <Rating 
                        value={testimonial.rating} 
                        readOnly 
                        precision={0.5}
                        size="small"
                      />
                    </Box>
                    <Divider className="testimonial-divider" />
                    <Box className="testimonial-author">
                      <Avatar 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="testimonial-avatar"
                      />
                      <Box>
                        <Typography variant="subtitle1" className="testimonial-name">
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" className="testimonial-location">
                          {testimonial.location}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Newsletter Section */}
      <Box className="newsletter-section">
        <Container maxWidth="md">
          <Paper elevation={6} className="newsletter-container">
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={7}>
                <Typography variant="h4" className="newsletter-title">
                  הישארו מעודכנים
                </Typography>
                <Typography variant="body1" className="newsletter-description">
                  הירשמו לניוזלטר שלנו וקבלו עדכונים על מבצעים מיוחדים, טיפים לטיולים ועוד
                </Typography>
              </Grid>
              <Grid item xs={12} md={5}>
                <Box className="newsletter-form">
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="הזינו את כתובת האימייל שלכם"
                    className="newsletter-input"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button 
                            variant="contained" 
                            className="newsletter-button"
                            endIcon={<SendIcon />}
                          >
                            הרשמה
                          </Button>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>

      {/* Trust Badges */}
      <Container maxWidth="xl">
        <Box className="trust-badges">
          <Typography variant="subtitle1" className="trust-title">
            שותפים מהימנים
          </Typography>
          <Box className="trust-logos">
            {[1, 2, 3, 4, 5].map((item) => (
              <Box 
                key={item}
                component="img"
                src={`https://via.placeholder.com/120x60?text=Partner${item}`}
                alt={`Partner ${item}`}
                className="trust-logo"
              />
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HomeAbout;