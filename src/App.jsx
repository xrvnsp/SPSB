import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Particles from './components/Particles';
import { Timer, Heart, ChevronRight } from 'lucide-react';

const TARGET_DATE = new Date('2026-11-22T00:00:00');

const RANDOM_MESSAGES = [
  "Appa Amma, konja nal wait panunga vandhute irukan",
  "Seekram vandhu ungaloda velayaduven",
  "Enna romba miss panringala?",
  "Ungaloda anbu kaga wait panren",
  "I'm excited to meet you both!",
  "Can't wait to see your faces!",
  "Valicha konjam poruthuka ma",
  "vomit vandha konjam adjust panikonga ma"
];

function App() {
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [currentMessage, setCurrentMessage] = useState(RANDOM_MESSAGES[0]);

  function calculateTimeLeft() {
    const difference = +TARGET_DATE - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    const msgTimer = setInterval(() => {
      setCurrentMessage(RANDOM_MESSAGES[Math.floor(Math.random() * RANDOM_MESSAGES.length)]);
    }, 5000);

    return () => {
      clearInterval(timer);
      clearInterval(msgTimer);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="countdown-container" style={{ 
      backgroundColor: '#fffcf9', 
      minHeight: '100vh', 
      width: '100%', 
      color: '#4a3f35',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflowX: 'hidden',
      position: 'relative',
      fontFamily: "'Quicksand', sans-serif",
      padding: '2rem 1rem'
    }}>
      {/* Premium Contrast Particles */}
      <Particles count={45} color="#4a3f35" />
      
      <div style={{ flex: 1 }}></div>
      <AnimatePresence mode="wait">
        {!started ? (
          <motion.div
            key="start-screen"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ 
              textAlign: 'center', 
              zIndex: 10, 
              width: '100%', 
              maxWidth: '600px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 5 }}
              style={{ marginBottom: '2rem' }}
            >
              <Heart size={48} color="#d4af37" fill="#d4af37" strokeWidth={1} style={{ opacity: 0.3 }} />
            </motion.div>
            
            <h1 style={{ 
              fontFamily: "'Comfortaa', cursive",
              fontSize: 'clamp(2rem, 10vw, 4rem)', 
              fontWeight: 700, 
              lineHeight: 1.2,
              marginBottom: '1rem',
              color: '#4a3f35'
            }}>
              The Final <span style={{ color: '#d4af37' }}>Wait</span>
            </h1>
            <p style={{ 
              fontFamily: "'Quicksand', sans-serif", 
              color: 'rgba(74,63,53,0.5)', 
              fontSize: 'clamp(0.8rem, 4vw, 1.1rem)', 
              letterSpacing: '0.3em', 
              marginBottom: '3rem', 
              fontWeight: 700 
            }}>
              NOVEMBER 22, 2026
            </p>

            <div style={{ marginBottom: '3rem' }}>
               <p style={{ color: '#d4af37', letterSpacing: '0.2em', fontSize: '0.75rem', marginBottom: '0.5rem', fontWeight: 700 }}>WITH THE BLESSINGS OF</p>
               <h3 style={{ 
                 fontFamily: "'Sacramento', cursive", 
                 fontSize: 'clamp(2rem, 8vw, 3rem)', 
                 color: '#4a3f35', 
                 marginTop: '0.5rem' 
               }}>
                  Late Shri Singaravelu
               </h3>
            </div>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(212,175,55,0.2)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStarted(true)}
              style={{
                background: 'white',
                border: '2px solid rgba(212,175,55,0.3)',
                padding: '1.2rem 2.5rem',
                borderRadius: '100px',
                color: '#d4af37',
                fontSize: 'clamp(0.9rem, 4vw, 1.1rem)',
                fontWeight: 700,
                letterSpacing: '0.15em',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease',
                fontFamily: "'Comfortaa', cursive"
              }}
            >
              START COUNTDOWN <ChevronRight size={20} />
            </motion.button>

            <div style={{ marginTop: '4rem', opacity: 0.6 }}>
               <p style={{ letterSpacing: '0.15em', fontSize: '0.7rem', color: 'rgba(74,63,53,0.4)', fontWeight: 700 }}>CELEBRATED BY</p>
               <p style={{ fontSize: 'clamp(1rem, 5vw, 1.3rem)', fontWeight: 700, marginTop: '0.5rem', fontFamily: "'Comfortaa', cursive" }}>Santhosh & Siva bharathy</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="countdown-screen"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ textAlign: 'center', zIndex: 10, width: '100%', maxWidth: '1000px' }}
          >
            {/* Callout and Baby Wrapper */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2.5rem', marginTop: '1rem' }}>
              
              {/* Speech Bubble Callout Wrapper (Reserves space to prevent layout jumps) */}
              <div style={{ minHeight: '90px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', marginBottom: '15px' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentMessage}
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.8 }}
                    style={{
                      position: 'relative',
                      background: 'white',
                      padding: '0.8rem 1.2rem',
                      borderRadius: '18px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                      border: '2px solid rgba(212,175,55,0.2)',
                      zIndex: 20,
                      width: 'max-content',
                      maxWidth: '280px',
                      fontFamily: "'Quicksand', sans-serif",
                      fontWeight: 700,
                      fontSize: 'clamp(0.75rem, 3.5vw, 0.9rem)',
                      color: '#d4af37'
                    }}
                  >
                    {currentMessage}
                    {/* Bubble Pointer */}
                    <div style={{
                      position: 'absolute',
                      bottom: '-10px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '0',
                      height: '0',
                      borderLeft: '10px solid transparent',
                      borderRight: '10px solid transparent',
                      borderTop: '10px solid white'
                    }} />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Animated Fetus Illustration */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 50 }}
                animate={{ 
                  opacity: 1, 
                  scale: [1, 1.03, 1],
                  y: 0 
                }}
                transition={{ 
                  opacity: { duration: 1.5 },
                  scale: { repeat: Infinity, duration: 2, ease: "easeInOut" }
                }}
                style={{ position: 'relative', display: 'inline-block' }}
              >
                <div style={{
                  position: 'absolute',
                  inset: '-15px',
                  background: 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)',
                  borderRadius: '50%',
                  zIndex: -1
                }} />
                <img 
                  src="./fetus.png" 
                  alt="2-Month Fetus Illustration" 
                  style={{ 
                    width: 'clamp(180px, 40vw, 240px)', 
                    height: 'clamp(180px, 40vw, 240px)', 
                    borderRadius: '50%', 
                    objectFit: 'cover',
                    border: '6px solid white',
                    boxShadow: '0 15px 40px rgba(0,0,0,0.1)'
                  }} 
                />
              </motion.div>
            </div>

            <motion.div variants={itemVariants} style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ 
                fontFamily: "'Comfortaa', cursive", 
                fontSize: 'clamp(0.8rem, 4vw, 1.1rem)', 
                color: '#d4af37', 
                letterSpacing: '0.4em', 
                marginBottom: '1rem', 
                fontWeight: 700 
              }}>LITTLE ONE ARRIVING IN</h2>
              <div style={{ height: '3px', width: '40px', background: '#d4af37', margin: '0 auto', borderRadius: '10px', opacity: 0.2 }}></div>
            </motion.div>

            {/* Responsive Countdown Grid */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '1rem',
              width: '100%',
              padding: '0 0.5rem'
            }}>
              {Object.entries(timeLeft).map(([unit, value]) => (
                <motion.div 
                  key={unit} 
                  variants={itemVariants}
                  style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    background: 'rgba(255,255,255,0.6)',
                    padding: '1.5rem 0.5rem',
                    borderRadius: '24px',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.8)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.03)'
                  }}
                >
                  <motion.span 
                    key={value}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    style={{ 
                      fontSize: 'clamp(2.5rem, 8vw, 5rem)', 
                      fontWeight: 700, 
                      fontFamily: "'Comfortaa', cursive",
                      lineHeight: 1,
                      color: '#4a3f35'
                    }}
                  >
                    {String(value).padStart(2, '0')}
                  </motion.span>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    color: 'rgba(74,63,53,0.5)', 
                    letterSpacing: '0.2em', 
                    textTransform: 'uppercase',
                    marginTop: '0.5rem',
                    fontWeight: 700
                  }}>
                    {unit}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.div 
              variants={itemVariants}
              style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem' }}
            >
              <div style={{ textAlign: 'center' }}>
                 <p style={{ color: '#d4af37', letterSpacing: '0.2em', fontSize: '0.7rem', marginBottom: '0.5rem', fontWeight: 700 }}>WITH LOVE & BLESSINGS</p>
                 <p style={{ fontSize: 'clamp(1.1rem, 5vw, 1.4rem)', fontWeight: 700, color: '#4a3f35', fontFamily: "'Comfortaa', cursive" }}>Santhosh & Siva bharathy</p>
              </div>

              <div style={{ 
                display: 'flex', 
                gap: '0.8rem', 
                alignItems: 'center', 
                color: '#d4af37',
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}>
                <Heart size={16} fill="#d4af37" />
                <p style={{ letterSpacing: '0.15em', fontSize: 'clamp(0.7rem, 3vw, 0.9rem)', fontWeight: 700, color: 'rgba(74,63,53,0.6)' }}>
                  A NEW LEGACY IS ABOUT TO UNFOLD
                </p>
                <Heart size={16} fill="#d4af37" />
              </div>
              
              <button 
                onClick={() => setStarted(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(74,63,53,0.3)',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  letterSpacing: '0.15em',
                  textDecoration: 'underline',
                  textUnderlineOffset: '4px',
                  fontWeight: 600,
                  fontFamily: "'Quicksand', sans-serif"
                }}
              >
                RETURN TO START
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div style={{ flex: 1 }}></div>

      {/* Responsive Decorative Orbs */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '-5%',
        width: 'clamp(300px, 50vw, 500px)',
        height: 'clamp(300px, 50vw, 500px)',
        background: 'radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%)',
        borderRadius: '50%',
        zIndex: 1
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-15%',
        right: '-10%',
        width: 'clamp(350px, 60vw, 600px)',
        height: 'clamp(350px, 60vw, 600px)',
        background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)',
        borderRadius: '50%',
        zIndex: 1
      }} />
    </div>
  );
}

export default App;
