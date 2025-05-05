import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Card, 
  Text, 
  Button, 
  Spacer, 
  Badge, 
  Avatar, 
  Row, 
  Col, 
  Image, 
  Progress
} from '@nextui-org/react';
import { 
  FaPlane, 
  FaHotel, 
  FaCar, 
  FaUmbrellaBeach, 
  FaMapMarkerAlt, 
  FaUser, 
  FaStar, 
  FaHeart, 
  FaGlobe, 
  FaHeadset, 
  FaShieldAlt, 
  FaMoneyBillWave, 
  FaApple, 
  FaGooglePlay,
  FaArrowRight,
  FaArrowLeft,
  FaQuoteRight
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import styles from '../styles/TravelAgency.module.css';

// Data
const destinations = [
  {
    name: 'פריז',
    country: 'צרפת',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=2073&q=80',
    price: 399,
    rating: 4.8,
    featured: true,
    discount: '15%'
  },
  {
    name: 'רומא',
    country: 'איטליה',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1996&q=80',
    price: 349,
    rating: 4.7,
    featured: true
  },
  {
    name: 'ברצלונה',
    country: 'ספרד',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=2070&q=80',
    price: 329,
    rating: 4.6,
    featured: true,
    discount: '10%'
  },
  {
    name: 'אמסטרדם',
    country: 'הולנד',
    image: 'https://images.unsplash.com/photo-1576924542622-772281b13aa8?auto=format&fit=crop&w=2070&q=80',
    price: 299,
    rating: 4.5
  },
  {
    name: 'לונדון',
    country: 'אנגליה',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=2070&q=80',
    price: 379,
    rating: 4.7,
    discount: '20%'
  },
  {
    name: 'ניו יורק',
    country: 'ארה"ב',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=2070&q=80',
    price: 599,
    rating: 4.9,
    featured: true
  }
];

const testimonials = [
  {
    name: 'יעל כהן',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    destination: 'פריז',
    rating: 5,
    comment: 'חוויה מדהימה! השירות היה מעולה והמחיר היה משתלם ביותר. בהחלט אזמין שוב בעתיד.'
  },
  {
    name: 'דוד לוי',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    destination: 'ברצלונה',
    rating: 4.5,
    comment: 'נהנינו מאוד מהטיול. הכל היה מאורגן היטב והמלון היה מצוין. ממליץ בחום!'
  },
  {
    name: 'מיכל אברהם',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    destination: 'ניו יורק',
    rating: 5,
    comment: 'הטיסות היו בדיוק בזמן והמחיר היה הטוב ביותר שמצאתי. תודה רבה על השירות המעולה!'
  }
];

const features = [
  {
    icon: <FaPlane size={32} />,
    title: 'מבחר טיסות עצום',
    description: 'אנו מציעים מגוון רחב של טיסות לכל יעד בעולם במחירים הטובים ביותר'
  },
  {
    icon: <FaHeadset size={32} />,
    title: 'שירות לקוחות 24/7',
    description: 'צוות השירות שלנו זמין עבורכם בכל שעה, בכל יום, לכל שאלה או בעיה'
  },
  {
    icon: <FaShieldAlt size={32} />,
    title: 'הבטחת מחיר',
    description: 'אנו מבטיחים את המחירים הטובים ביותר ומציעים החזר כספי אם תמצאו מחיר נמוך יותר'
  },
  {
    icon: <FaMoneyBillWave size={32} />,
    title: 'ללא עמלות נסתרות',
    description: 'המחיר שאתם רואים הוא המחיר שתשלמו - ללא הפתעות או עמלות נסתרות'
  },
  {
    icon: <FaGlobe size={32} />,
    title: 'יעדים בכל העולם',
    description: 'אנו מציעים טיסות ליותר מ-1000 יעדים ברחבי העולם'
  },
  {
    icon: <FaUmbrellaBeach size={32} />,
    title: 'חבילות נופש מושלמות',
    description: 'חבילות הכוללות טיסות, מלונות, העברות ואטרקציות במחיר אטרקטיבי'
  }
];

// Star Rating Component
const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  return (
    <div className={styles.starRating}>
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} className={styles.starFilled} />
      ))}
      {hasHalfStar && <FaStar className={styles.starHalf} />}
      {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
        <FaStar key={`empty-${i}`} className={styles.starEmpty} />
      ))}
      <Text small className={styles.ratingText}>{rating}</Text>
    </div>
  );
};

// Destination Card Component
const DestinationCard = ({ destination }) => {
  return (
    <Card className={styles.destinationCard} hoverable>
      <Card.Body css={{ p: 0, overflow: 'hidden' }}>
        <div className={styles.imageContainer}>
          <Image
            src={destination.image}
            alt={destination.name}
            objectFit="cover"
            width="100%"
            height={240}
            className={styles.destinationImage}
          />
          {destination.discount && (
            <Badge color="error" className={styles.discountBadge}>
              הנחה {destination.discount}
            </Badge>
          )}
          <Button 
            light 
            auto 
            icon={<FaHeart fill="white" />} 
            className={styles.favoriteButton}
          />
        </div>
      </Card.Body>
      <Card.Footer className={styles.destinationFooter}>
        <Row justify="space-between" align="center">
          <Col>
            <Text h4 className={styles.destinationName}>{destination.name}</Text>
            <div className={styles.locationContainer}>
              <FaMapMarkerAlt className={styles.locationIcon} />
              <Text small>{destination.country}</Text>
            </div>
            <StarRating rating={destination.rating} />
          </Col>
          <Col css={{ textAlign: 'right' }}>
            <Text className={styles.priceLabel}>החל מ-</Text>
            <Text h3 className={styles.price}>${destination.price}</Text>
            <Button 
              auto 
              color="gradient" 
              className={styles.bookButton}
              iconRight={<FaArrowLeft />}
            >
              הזמן עכשיו
            </Button>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
};

// Testimonial Card Component
const TestimonialCard = ({ testimonial }) => {
  return (
    <Card className={styles.testimonialCard}>
      <Card.Body>
        <FaQuoteRight className={styles.quoteIcon} />
        <Text className={styles.testimonialComment}>
          "{testimonial.comment}"
        </Text>
        <StarRating rating={testimonial.rating} />
      </Card.Body>
      <Card.Footer className={styles.testimonialFooter}>
        <Avatar
          src={testimonial.avatar}
          size="lg"
          bordered
          color="gradient"
          className={styles.testimonialAvatar}
        />
        <div>
          <Text h5 className={styles.testimonialName}>{testimonial.name}</Text>
          <Text small className={styles.testimonialDestination}>
            טיול ל{testimonial.destination}
          </Text>
        </div>
      </Card.Footer>
    </Card>
  );
};

// Feature Card Component
const FeatureCard = ({ feature }) => {
  return (
    <Card className={styles.featureCard} hoverable>
      <Card.Body>
        <div className={styles.featureIconContainer}>
          {feature.icon}
        </div>
        <Text h4 className={styles.featureTitle}>{feature.title}</Text>
        <Text className={styles.featureDescription}>{feature.description}</Text>
      </Card.Body>
    </Card>
  );
};

export default function TravelAgency() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Auto-rotate featured destinations
  useEffect(() => {
    const featuredDestinations = destinations.filter(d => d.featured);
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredDestinations.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const featuredDestinations = destinations.filter(d => d.featured);

  return (
    <div className={styles.container} dir="rtl">
      Hero Section
      <section className={styles.heroSection}>
        <div className={styles.videoBackground}>
          <div className={styles.overlay}></div>
          <video autoPlay muted loop className={styles.backgroundVideo}>
            <source src="/videos/travel-background.mp4" type="video/mp4" />
            <Image 
              src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2074&q=80" 
              alt="Travel background"
              className={styles.fallbackImage}
            />
          </video>
        </div>
        
        <Container lg className={styles.heroContainer}>
          <Grid.Container gap={4} className={styles.heroContent}>
            <Grid xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className={styles.heroTextContent}
              >
                <Text 
                  h1 
                  className={styles.heroTitle}
                  css={{ 
                    textGradient: "45deg, $blue600 -20%, $purple600 100%",
                  }}
                >
                  גלו עולם של אפשרויות
                </Text>
                <Text h3 className={styles.heroSubtitle}>
                  הטיסות הטובות ביותר, המחירים המשתלמים ביותר והחוויות הבלתי נשכחות ביותר - הכל במקום אחד
                </Text>
                <Spacer y={1.5} />
                <Row>
                  <Button 
                    size="xl" 
                    shadow
                    color="gradient" 
                    className={styles.ctaButton}
                    iconRight={<FaArrowLeft />}
                  >
                    מבצעים מיוחדים
                  </Button>
                  <Spacer x={1} />
                  <Button 
                    size="xl" 
                    bordered
                    color="primary" 
                    className={styles.secondaryButton}
                  >
                    צור קשר
                  </Button>
                </Row>
              </motion.div>
            </Grid>
            
            <Grid xs={12} md={6} className={styles.heroImageContainer}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Card className={styles.featuredDestinationCard}>
                  <Card.Body css={{ p: 0 }}>
                    <Image
                      src={featuredDestinations[currentSlide].image}
                      alt={featuredDestinations[currentSlide].name}
                      objectFit="cover"
                      width="100%"
                      height={400}
                    />
                  </Card.Body>
                  <Card.Footer 
                    className={styles.featuredCardFooter}
                    css={{ 
                      position: "absolute", 
                      bottom: 0,
                      zIndex: 1,
                      background: "rgba(0, 0, 0, 0.7)",
                      borderTop: "none",
                      width: "100%"
                    }}
                  >
                    <Row justify="space-between" align="center">
                      <Col>
                        <Text h3 color="white">{featuredDestinations[currentSlide].name}</Text>
                        <Text color="white">{featuredDestinations[currentSlide].country}</Text>
                        <StarRating rating={featuredDestinations[currentSlide].rating} />
                      </Col>
                      <Col css={{ textAlign: 'right' }}>
                        <Text color="white" className={styles.priceLabel}>החל מ-</Text>
                        <Text h2 color="white" className={styles.price}>
                          ${featuredDestinations[currentSlide].price}
                        </Text>
                        <Button 
                          auto 
                          color="gradient" 
                          className={styles.bookButton}
                          iconRight={<FaArrowLeft />}
                        >
                          הזמן עכשיו
                        </Button>
                      </Col>
                    </Row>
                  </Card.Footer>
                </Card>
                <div className={styles.slideControls}>
                  {featuredDestinations.map((_, index) => (
                    <button
                      key={index}
                      className={`${styles.slideIndicator} ${index === currentSlide ? styles.activeSlide : ''}`}
                      onClick={() => setCurrentSlide(index)}
                    />
                  ))}
                </div>
              </motion.div>
            </Grid>
          </Grid.Container>
        </Container>
      </section>

      {/* Services Section */}
      <section className={styles.servicesSection}>
        <Container lg>
          <Text h2 className={styles.sectionTitle}>השירותים שלנו</Text>
          <Text className={styles.sectionSubtitle}>
            אנו מציעים מגוון רחב של שירותי נסיעות כדי להפוך את החופשה שלכם למושלמת
          </Text>
          
          <Grid.Container gap={2} justify="center" className={styles.servicesContainer}>
            <Grid xs={12} sm={6} md={3}>
              <motion.div
                whileHover={{ y: -10 }}
                className={styles.serviceCard}
              >
                <div className={styles.serviceIcon}>
                  <FaPlane size={40} />
                </div>
                <Text h4>טיסות</Text>
                <Text>מגוון רחב של טיסות במחירים אטרקטיביים לכל יעד בעולם</Text>
              </motion.div>
            </Grid>
            
            <Grid xs={12} sm={6} md={3}>
              <motion.div
                whileHover={{ y: -10 }}
                className={styles.serviceCard}
              >
                <div className={styles.serviceIcon}>
                  <FaHotel size={40} />
                </div>
                <Text h4>מלונות</Text>
                <Text>מבחר מלונות מ-1 עד 5 כוכבים בכל יעד, במחירים משתלמים</Text>
              </motion.div>
            </Grid>
            
            <Grid xs={12} sm={6} md={3}>
              <motion.div
                whileHover={{ y: -10 }}
                className={styles.serviceCard}
              >
                <div className={styles.serviceIcon}>
                  <FaCar size={40} />
                </div>
                <Text h4>השכרת רכב</Text>
                <Text>מגוון רחב של רכבים להשכרה בכל יעד, במחירים תחרותיים</Text>
              </motion.div>
            </Grid>
            
            <Grid xs={12} sm={6} md={3}>
              <motion.div
                whileHover={{ y: -10 }}
                className={styles.serviceCard}
              >
                <div className={styles.serviceIcon}>
                  <FaUmbrellaBeach size={40} />
                </div>
                <Text h4>חבילות נופש</Text>
                <Text>חבילות נופש מושלמות הכוללות טיסות, מלון, העברות ועוד</Text>
              </motion.div>
            </Grid>
          </Grid.Container>
        </Container>
      </section>

      {/* Popular Destinations Section */}
      <section className={styles.destinationsSection}>
        <Container lg>
          <Text h2 className={styles.sectionTitle}>יעדים פופולריים</Text>
          <Text className={styles.sectionSubtitle}>
            גלו את היעדים המבוקשים ביותר בעולם במחירים הטובים ביותר
          </Text>
          
          <Grid.Container gap={2}>
            {destinations.map((destination, index) => (
              <Grid xs={12} sm={6} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <DestinationCard destination={destination} />
                </motion.div>
              </Grid>
            ))}
          </Grid.Container>
          
          <div className={styles.viewMoreContainer}>
            <Button 
              size="lg" 
              shadow
              color="gradient" 
              className={styles.viewMoreButton}
              iconRight={<FaArrowLeft />}
            >
              צפה בכל היעדים
            </Button>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <Container lg>
          <Text h2 className={styles.sectionTitle}>למה לבחור בנו?</Text>
          <Text className={styles.sectionSubtitle}>
            אנו מציעים את השירות הטוב ביותר, המחירים התחרותיים ביותר וחוויית לקוח יוצאת דופן
          </Text>
          
          <Grid.Container gap={2}>
            {features.map((feature, index) => (
              <Grid xs={12} sm={6} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <FeatureCard feature={feature} />
                </motion.div>
              </Grid>
            ))}
          </Grid.Container>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonialsSection}>
        <Container lg>
          <Text h2 className={styles.sectionTitle}>מה הלקוחות שלנו אומרים</Text>
          <Text className={styles.sectionSubtitle}>
            אלפי לקוחות מרוצים בוחרים בנו בכל שנה. הנה כמה מהחוויות שלהם
          </Text>
          
          <Grid.Container gap={2} justify="center">
            {testimonials.map((testimonial, index) => (
              <Grid xs={12} sm={6} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <TestimonialCard testimonial={testimonial} />
                </motion.div>
              </Grid>
            ))}
          </Grid.Container>
        </Container>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <Container lg>
          <Grid.Container gap={2} justify="center">
            <Grid xs={6} sm={3}>
              <div className={styles.statItem}>
                <Text h2 className={styles.statNumber}>10K+</Text>
                <Text className={styles.statLabel}>לקוחות מרוצים</Text>
              </div>
            </Grid>
            <Grid xs={6} sm={3}>
              <div className={styles.statItem}>
                <Text h2 className={styles.statNumber}>1000+</Text>
                <Text className={styles.statLabel}>יעדים</Text>
              </div>
            </Grid>
            <Grid xs={6} sm={3}>
              <div className={styles.statItem}>
                <Text h2 className={styles.statNumber}>500+</Text>
                <Text className={styles.statLabel}>חברות תעופה</Text>
              </div>
            </Grid>
            <Grid xs={6} sm={3}>
              <div className={styles.statItem}>
                <Text h2 className={styles.statNumber}>24/7</Text>
                <Text className={styles.statLabel}>שירות לקוחות</Text>
              </div>
            </Grid>
          </Grid.Container>
        </Container>
      </section>

      {/* Newsletter Section */}
      <section className={styles.newsletterSection}>
        <Container lg>
          <Card className={styles.newsletterCard}>
            <Card.Body>
              <Grid.Container gap={2} justify="center" alignItems="center">
                <Grid xs={12} md={6}>
                  <div className={styles.newsletterContent}>
                    <Text h2 className={styles.newsletterTitle}>הירשמו לניוזלטר שלנו</Text>
                    <Text className={styles.newsletterText}>
                      הירשמו לניוזלטר שלנו וקבלו עדכונים על מבצעים מיוחדים, הנחות והצעות בלעדיות
                    </Text>
                  </div>
                </Grid>
                <Grid xs={12} md={6}>
                  <div className={styles.newsletterForm}>
                    <input 
                      type="email" 
                      placeholder="הזינו את כתובת האימייל שלכם" 
                      className={styles.newsletterInput}
                    />
                    <Button 
                      auto 
                      color="gradient" 
                      className={styles.newsletterButton}
                    >
                      הירשם
                    </Button>
                  </div>
                </Grid>
              </Grid.Container>
            </Card.Body>
          </Card>
        </Container>
      </section>

      {/* App Download Section */}
      <section className={styles.appSection}>
        <Container lg>
          <Grid.Container gap={4} alignItems="center">
            <Grid xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className={styles.appContent}>
                  <Text h2 className={styles.appTitle}>הורידו את האפליקציה שלנו</Text>
                  <Text className={styles.appDescription}>
                    הורידו את האפליקציה שלנו כדי לקבל חוויית משתמש טובה יותר, התראות על מבצעים מיוחדים, 
                    ואפשרות לנהל את ההזמנות שלכם בקלות מהטלפון הנייד
                  </Text>
                  <Spacer y={1.5} />
                  <div className={styles.appButtons}>
                    <Button 
                      icon={<FaApple size={20} />} 
                      className={styles.appStoreButton}
                    >
                      App Store
                    </Button>
                    <Spacer x={1} />
                    <Button 
                      icon={<FaGooglePlay size={20} />} 
                      className={styles.playStoreButton}
                    >
                      Google Play
                    </Button>
                  </div>
                </div>
              </motion.div>
            </Grid>
            <Grid xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className={styles.appImageContainer}>
                  <Image
                    src="/images/travel-app-mockup.png"
                    alt="Travel App Mockup"
                    className={styles.appImage}
                  />
                </div>
              </motion.div>
            </Grid>
          </Grid.Container>
        </Container>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <Container lg>
          <Grid.Container gap={2}>
            <Grid xs={12} md={4}>
              <div className={styles.footerBrand}>
                <Text h2 className={styles.footerLogo}>TravelEase</Text>
                <Text className={styles.footerDescription}>
                  אנו מציעים את המחירים הטובים ביותר לטיסות, מלונות, השכרת רכב וחבילות נופש.
                </Text>
                <div className={styles.socialIcons}>
                  <Button light auto icon={<FaGlobe />} className={styles.socialIcon} />
                  <Button light auto icon={<FaUser />} className={styles.socialIcon} />
                  <Button light auto icon={<FaHeart />} className={styles.socialIcon} />
                  <Button light auto icon={<FaHeadset />} className={styles.socialIcon} />
                </div>
              </div>
            </Grid>
            
            <Grid xs={6} md={2}>
              <div className={styles.footerLinks}>
                <Text h4 className={styles.footerLinksTitle}>חברה</Text>
                <ul>
                  <li><a href="#">אודות</a></li>
                  <li><a href="#">קריירה</a></li>
                  <li><a href="#">מדיניות פרטיות</a></li>
                  <li><a href="#">תנאי שימוש</a></li>
                </ul>
              </div>
            </Grid>
            
            <Grid xs={6} md={2}>
              <div className={styles.footerLinks}>
                <Text h4 className={styles.footerLinksTitle}>שירותים</Text>
                <ul>
                <li><a href="#">טיסות</a></li>
                  <li><a href="#">מלונות</a></li>
                  <li><a href="#">השכרת רכב</a></li>
                  <li><a href="#">חבילות נופש</a></li>
                </ul>
              </div>
            </Grid>
            
            <Grid xs={6} md={2}>
              <div className={styles.footerLinks}>
                <Text h4 className={styles.footerLinksTitle}>תמיכה</Text>
                <ul>
                  <li><a href="#">מרכז עזרה</a></li>
                  <li><a href="#">צור קשר</a></li>
                  <li><a href="#">שאלות נפוצות</a></li>
                  <li><a href="#">ביטולים</a></li>
                </ul>
              </div>
            </Grid>
            
            <Grid xs={6} md={2}>
              <div className={styles.footerLinks}>
                <Text h4 className={styles.footerLinksTitle}>צור קשר</Text>
                <ul>
                  <li>רחוב הרצל 123, תל אביב</li>
                  <li>info@travelease.com</li>
                  <li>03-1234567</li>
                </ul>
              </div>
            </Grid>
          </Grid.Container>
          
          <div className={styles.footerBottom}>
            <Text className={styles.copyright}>
              © {new Date().getFullYear()} TravelEase. כל הזכויות שמורות.
            </Text>
            <div className={styles.paymentMethods}>
              <Image src="/images/visa.png" alt="Visa" width={40} height={25} />
              <Image src="/images/mastercard.png" alt="Mastercard" width={40} height={25} />
              <Image src="/images/paypal.png" alt="PayPal" width={40} height={25} />
              <Image src="/images/amex.png" alt="American Express" width={40} height={25} />
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}