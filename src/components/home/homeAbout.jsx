import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  useTheme,
  useMediaQuery,
  Divider,
  IconButton,
  Stack,
  TextField
} from '@mui/material';

// Icons
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import SecurityIcon from '@mui/icons-material/Security';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import StarIcon from '@mui/icons-material/Star';
import ExploreIcon from '@mui/icons-material/Explore';
import SpeedIcon from '@mui/icons-material/Speed';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Styles
import './HomeAbout.css';

// Popular destinations data
const popularDestinations = [
  {
    id: 1,
    city: 'לונדון',
    country: 'בריטניה',
    price: 299,
    image: 'https://source.unsplash.com/800x600/?london',
    discount: 15
  },
  {
    id: 2,
    city: 'ברצלונה',
    country: 'ספרד',
    price: 199,
    image: 'https://source.unsplash.com/800x600/?barcelona',
    discount: 20
  },
  {
    id: 3,
    city: 'ניו יורק',
    country: 'ארה"ב',
    price: 499,
    image: 'https://source.unsplash.com/800x600/?newyork',
    discount: 10
  },
  {
    id: 4,
    city: 'טוקיו',
    country: 'יפן',
    price: 699,
    image: 'https://source.unsplash.com/800x600/?tokyo',
    discount: 5
  }
];

// Testimonials data
const testimonials = [
  {
    id: 1,
    name: 'דניאל כהן',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    text: 'מצאתי כרטיס טיסה במחיר מעולה לניו יורק. התהליך היה פשוט וקיבלתי אישור מיידי. ממליץ בחום!',
    rating: 5
  },
  {
    id: 2,
    name: 'מיכל לוי',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    text: 'השירות לקוחות מצוין, עזרו לי למצוא טיסה מתאימה בתקציב שלי. חסכתי המון כסף!',
    rating: 4
  },
  {
    id: 3,
    name: 'יוסי אברהם',
    avatar: 'https://randomuser.me/api/portraits/men/62.jpg',
    text: 'האתר קל לשימוש והמחירים תחרותיים. הזמנתי טיסה לפריז ללא בעיות וקיבלתי שירות מעולה.',
    rating: 5
  }
];

// Features data
const features = [
  {
    id: 1,
    title: 'מחירים תחרותיים',
    description: 'אנו משווים מחירים מאלפי אתרים כדי להציע לכם את העסקאות הטובות ביותר',
    icon: <LocalOfferIcon fontSize="large" className="feature-icon" />
  },
  {
    id: 2,
    title: 'הזמנה מאובטחת',
    description: 'כל העסקאות מאובטחות עם הצפנה מתקדמת לשמירה על פרטיותכם',
    icon: <SecurityIcon fontSize="large" className="feature-icon" />
  },
  {
    id: 3,
    title: 'תמיכה 24/7',
    description: 'צוות התמיכה שלנו זמין 24 שעות ביממה, 7 ימים בשבוע לכל שאלה או בעיה',
    icon: <SupportAgentIcon fontSize="large" className="feature-icon" />
  },
  {
    id: 4,
    title: 'אפשרויות תשלום גמישות',
    description: 'מגוון אפשרויות תשלום כולל כרטיסי אשראי, PayPal ותשלומים דחויים',
    icon: <CreditCardIcon fontSize="large" className="feature-icon" />
  },
  {
    id: 5,
    title: 'חיפוש מהיר',
    description: 'מנוע חיפוש חכם שמוצא את הטיסות המתאימות ביותר בשניות',
    icon: <SpeedIcon fontSize="large" className="feature-icon" />
  },
  {
    id: 6,
    title: 'הבטחת מחיר',
    description: 'אם תמצאו מחיר נמוך יותר, נשווה אותו ונעניק לכם הנחה נוספת של 10%',
    icon: <VerifiedUserIcon fontSize="large" className="feature-icon" />
  }
];

export const HomeAbout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box className="landing-page-container">
      {/* Hero Section */}
      <Box className="hero-section">
        <Container maxWidth="xl">
          <Grid container spacing={4} alignItems="center" className="hero-content">
            <Grid item xs={12} md={7}>
              <Typography variant="h2" component="h1" className="hero-title">
                טיסות במחירים הטובים ביותר
              </Typography>
              <Typography variant="h5" component="h2" className="hero-subtitle">
                גלו את העולם עם המחירים הטובים ביותר וחוויית הזמנה פשוטה
              </Typography>

              <Box className="hero-features">
                <Box className="feature-item">
                  <LocalOfferIcon className="feature-icon" />
                  <Typography variant="body1">מחירים תחרותיים</Typography>
                </Box>
                <Box className="feature-item">
                  <SecurityIcon className="feature-icon" />
                  <Typography variant="body1">הזמנה מאובטחת</Typography>
                </Box>
                <Box className="feature-item">
                  <SupportAgentIcon className="feature-icon" />
                  <Typography variant="body1">תמיכה 24/7</Typography>
                </Box>
              </Box>

              <Box className="hero-buttons">
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large" 
                  className="cta-button"
                  onClick={() => scrollToSection('destinations')}
                >
                  גלה יעדים פופולריים
                </Button>
                <Button 
                  variant="outlined" 
                  color="primary" 
                  size="large"
                  className="secondary-button"
                  onClick={() => scrollToSection('features')}
                >
                  למה לבחור בנו?
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={5} className="hero-image-container">
              <img 
                src="https://source.unsplash.com/1200x800/?travel,airplane" 
                alt="טיסות ברחבי העולם" 
                className="hero-image"
              />
              <Box className="scroll-indicator" onClick={() => scrollToSection('destinations')}>
                <Typography variant="body2">גלול למטה</Typography>
                <ArrowDownwardIcon />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Popular Destinations Section */}
      <Box id="destinations" className="destinations-section">
        <Container maxWidth="xl">
          <Box className="section-header">
            <Typography variant="h3" component="h2" className="section-title">
              <ExploreIcon className="section-icon" />
              יעדים פופולריים
            </Typography>
            <Typography variant="h6" className="section-subtitle">
              המחירים הטובים ביותר ליעדים המבוקשים ביותר
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {popularDestinations.map((destination) => (
              <Grid item xs={12} sm={6} md={3} key={destination.id}>
                <Card className="destination-card">
                  <Box className="destination-image-container">
                    <CardMedia
                      component="img"
                      height={isMobile ? "180" : "220"}
                      image={destination.image}
                      alt={destination.city}
                      className="destination-image"
                    />
                    <Box className="destination-discount">
                      <Typography variant="body2">
                        {destination.discount}% הנחה
                      </Typography>
                    </Box>
                  </Box>
                  <CardContent className="destination-content">
                    <Typography variant="h6" component="h3" className="destination-title">
                      {destination.city}, {destination.country}
                    </Typography>
                    <Box className="destination-price-container">
                      <Typography variant="body2" className="price-label">
                        מחיר החל מ-
                      </Typography>
                      <Typography variant="h5" component="p" className="price-value">
                        €{destination.price}
                      </Typography>
                    </Box>
                    <Button
                      variant="outlined"
                      color="primary"
                      fullWidth
                      className="view-deals-button"
                    >
                      צפה בעסקאות
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box id="features" className="features-section">
        <Container maxWidth="xl">
          <Box className="section-header">
            <Typography variant="h3" component="h2" className="section-title">
              <StarIcon className="section-icon" />
              למה לבחור בנו?
            </Typography>
            <Typography variant="h6" className="section-subtitle">
              אנחנו מציעים את השירות הטוב ביותר במחירים הטובים ביותר
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature) => (
              <Grid item xs={12} sm={6} md={4} key={feature.id}>
                <Paper elevation={2} className="feature-card">
                  <Box className="feature-icon-container">
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" component="h3" className="feature-title">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" className="feature-description">
                    {feature.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box id="testimonials" className="testimonials-section">
        <Container maxWidth="xl">
          <Box className="section-header">
            <Typography variant="h3" component="h2" className="section-title">
              <StarIcon className="section-icon" />
              מה הלקוחות שלנו אומרים
            </Typography>
            <Typography variant="h6" className="section-subtitle">
              חוויות אמיתיות מלקוחות מרוצים
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {testimonials.map((testimonial) => (
              <Grid item xs={12} md={4} key={testimonial.id}>
                <Paper elevation={3} className="testimonial-card">
                  <Box className="testimonial-header">
                    <Avatar src={testimonial.avatar} alt={testimonial.name} className="testimonial-avatar" />
                    <Box>
                      <Typography variant="h6" className="testimonial-name">
                        {testimonial.name}
                      </Typography>
                      <Box className="testimonial-rating">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={i < testimonial.rating ? "star-filled" : "star-empty"}
                          />
                        ))}
                      </Box>
                    </Box>
                  </Box>
                  <Typography variant="body1" className="testimonial-text">
                    "{testimonial.text}"
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Newsletter Section */}
      <Box className="newsletter-section">
        <Container maxWidth="md">
          <Paper elevation={3} className="newsletter-container">
            <Typography variant="h4" component="h2" className="newsletter-title">
              הצטרפו לניוזלטר

Copy


src\components\home\homeAbout.jsx
המשך



Context
— none fetched
המשך קוד ה-JSX:

              הצטרפו לניוזלטר שלנו
            </Typography>
            <Typography variant="body1" className="newsletter-subtitle">
              הירשמו עכשיו וקבלו התראות על מבצעים מיוחדים וטיסות במחירים נמוכים במיוחד
            </Typography>

            <Box className="newsletter-form">
              <TextField
                variant="outlined"
                placeholder="הזינו את כתובת האימייל שלכם"
                fullWidth
                className="newsletter-input"
              />
              <Button
                variant="contained"
                color="primary"
                size="large"
                className="newsletter-button"
              >
                הרשמה
              </Button>
            </Box>

            <Typography variant="body2" className="privacy-note">
              אנו מכבדים את פרטיותכם ולעולם לא נשתף את המידע שלכם עם צד שלישי
            </Typography>
          </Paper>
        </Container>
      </Box>

      {/* Footer Navigation */}
      <Box className="footer-section">
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box className="footer-brand">
                <Box className="footer-logo">
                  <FlightTakeoffIcon className="logo-icon" />
                  <Typography variant="h6" component="span">
                    סקיי פליי
                  </Typography>
                </Box>
                <Typography variant="body2" className="footer-description">
                  אנו מציעים את המחירים הטובים ביותר לטיסות ברחבי העולם. מצאו את הטיסה המושלמת עבורכם במחיר שלא תוכלו לסרב לו.
                </Typography>
                <Box className="social-icons">
                  <IconButton aria-label="facebook" className="social-icon">
                    <FacebookIcon />
                  </IconButton>
                  <IconButton aria-label="twitter" className="social-icon">
                    <TwitterIcon />
                  </IconButton>
                  <IconButton aria-label="instagram" className="social-icon">
                    <InstagramIcon />
                  </IconButton>
                  <IconButton aria-label="linkedin" className="social-icon">
                    <LinkedInIcon />
                  </IconButton>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="h6" className="footer-title">
                קישורים מהירים
              </Typography>
              <Stack spacing={1} className="footer-links">
                <Button className="footer-link" onClick={() => scrollToSection('destinations')}>
                  יעדים פופולריים
                </Button>
                <Button className="footer-link" onClick={() => scrollToSection('features')}>
                  למה לבחור בנו
                </Button>
                <Button className="footer-link" onClick={() => scrollToSection('testimonials')}>
                  ביקורות לקוחות
                </Button>
                <Button className="footer-link">
                  שאלות נפוצות
                </Button>
                <Button className="footer-link">
                  אודות
                </Button>
              </Stack>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" className="footer-title">
                יעדים פופולריים
              </Typography>
              <Stack spacing={1} className="footer-links">
                <Button className="footer-link">
                  טיסות לאירופה
                </Button>
                <Button className="footer-link">
                  טיסות לארה"ב
                </Button>
                <Button className="footer-link">
                  טיסות למזרח הרחוק
                </Button>
                <Button className="footer-link">
                  טיסות פנים
                </Button>
                <Button className="footer-link">
                  כל היעדים
                </Button>
              </Stack>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" className="footer-title">
                צור קשר
              </Typography>
              <Box className="contact-info">
                <Box className="contact-item">
                  <LocationOnIcon className="contact-icon" />
                  <Typography variant="body2">
                    רחוב הרצל 123, תל אביב
                  </Typography>
                </Box>
                <Box className="contact-item">
                  <PhoneIcon className="contact-icon" />
                  <Typography variant="body2">
                    03-1234567
                  </Typography>
                </Box>
                <Box className="contact-item">
                  <EmailIcon className="contact-icon" />
                  <Typography variant="body2">
                    info@skyfly.co.il
                  </Typography>
                </Box>
              </Box>
              <Box className="support-hours">
                <Typography variant="subtitle2" className="support-title">
                  שעות פעילות שירות לקוחות:
                </Typography>
                <Typography variant="body2">
                  ימים א'-ה': 08:00-20:00
                </Typography>
                <Typography variant="body2">
                  יום ו': 08:00-14:00
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Divider className="footer-divider" />

          <Box className="footer-bottom">
            <Typography variant="body2" className="copyright">
              © 2023 סקיי פליי. כל הזכויות שמורות.
            </Typography>
            <Box className="footer-terms">
              <Button className="terms-link">תנאי שימוש</Button>
              <Button className="terms-link">מדיניות פרטיות</Button>
              <Button className="terms-link">מדיניות ביטולים</Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};