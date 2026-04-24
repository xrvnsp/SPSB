import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import RevealText from './components/RevealText';
import Particles from './components/Particles';
import { Heart, Stars, Sparkles, ScrollText, Baby, Sun, Moon, Cloud, Star, Fingerprint } from 'lucide-react';

function NameRevealApp() {
  const { scrollYProgress } = useScroll();
  const [isRevealed, setIsRevealed] = useState(false);
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Dynamic Background Transitions
  const scrollBgColor = useTransform(
    scrollYProgress,
    [0, 0.15, 0.3, 0.45, 0.6, 0.8, 1],
    ["#f8fafc", "#0f172a", "#0f172a", "#1a365d", "#0f172a", "#f8fafc", "#ffffff"]
  );

  return (
    <motion.div 
      className={`app-container bg-transition slow-glow-bg ${isRevealed ? 'glow-active' : ''}`} 
      style={{ backgroundColor: isRevealed ? "#0f172a" : scrollBgColor }}
    >
      <Particles count={50} />
      
      {/* Progress Bar */}
      <motion.div
        className="progress-bar"
        style={{
          scaleX,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '6px',
          background: 'linear-gradient(90deg, #b38728, #fcf6ba, #d4af37)',
          transformOrigin: '0%',
          zIndex: 100
        }}
      />

      {/* Hero Section */}
      <section className="section-container" style={{ minHeight: '100vh' }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        >
          <div className="glass-card" style={{ padding: '5.5rem 3.5rem', maxWidth: '750px', textAlign: 'center' }}>
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 5 }}
            >
              <Heart size={80} fill="#d4af37" color="#d4af37" />
            </motion.div>
            <h1 style={{ fontSize: '4.5rem', margin: '2.5rem 0', letterSpacing: '-0.05em', lineHeight: 1 }}>A Journey of Love</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.6rem', fontWeight: 300, lineHeight: 1.6 }}>
              Every pulse, every dream, every prayer... <br />
              led us to this magical moment.
            </p>
          </div>
        </motion.div>
        <div className="scroll-indicator">
          <ScrollText size={36} color="#d4af37" strokeWidth={1} />
          <p style={{ fontSize: '0.85rem', marginTop: '1.2rem', letterSpacing: '0.4em', fontWeight: 600 }}>DISCOVER HIS STORY</p>
        </div>
      </section>

      {/* Chapter 1: The Wait */}
      <section style={{ height: '250vh', position: 'relative' }}>
        <RevealText isSticky text="For nine sacred months, we dreamed of a soul that would fill our world with endless light and quiet peace.">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2.5 }}
          >
            <Moon size={110} color="#f1f5f9" style={{ marginBottom: '1rem', opacity: 0.8 }} />
          </motion.div>
        </RevealText>
      </section>

      {/* Chapter 2: The Heartbeat */}
      <section style={{ height: '250vh', position: 'relative' }}>
        <RevealText isSticky text="A rhythmic miracle began to beat, a tiny life so precious and so sweet, anchored in a love that never ends.">
          <motion.div
            animate={{ 
              scale: [1, 1.4, 1],
              opacity: [0.7, 1, 0.7],
              filter: ["drop-shadow(0 0 15px #f43f5e)", "drop-shadow(0 0 50px #f43f5e)", "drop-shadow(0 0 15px #f43f5e)"]
            }}
            transition={{ repeat: Infinity, duration: 0.7 }}
            style={{ display: 'inline-block', marginBottom: '1.5rem' }}
          >
            <Heart size={130} fill="#f43f5e" color="#f43f5e" />
          </motion.div>
        </RevealText>
      </section>

      {/* Chapter 3: The Arrival */}
      <section style={{ height: '250vh', position: 'relative' }}>
        <RevealText isSticky text="Then a radiant beacon broke through the clouds, bringing a dawn of joy that silenced all our doubts.">
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{ 
              rotate: { repeat: Infinity, duration: 25, ease: 'linear' },
              scale: { repeat: Infinity, duration: 4 }
            }}
            style={{ marginBottom: '1rem' }}
          >
            <Sun size={130} color="#d4af37" strokeWidth={1} />
          </motion.div>
        </RevealText>
      </section>

      {/* THE ULTIMATE INTERACTIVE REVEAL */}
      <section style={{ height: '300vh', position: 'relative' }}>
        <div style={{ 
          position: 'sticky', 
          top: 0, 
          height: '100vh', 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          textAlign: 'center',
          overflow: 'hidden',
          zIndex: 20
        }}>
          <AnimatePresence mode="wait">
            {!isRevealed ? (
              <motion.div
                key="reveal-button"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.5, filter: 'blur(20px)' }}
                transition={{ duration: 1, ease: 'circOut' }}
                style={{ zIndex: 100, position: 'relative' }}
              >
                <div style={{ marginBottom: '3rem' }}>
                  <Fingerprint size={80} color="#d4af37" strokeWidth={1} style={{ opacity: 0.5 }} />
                </div>
                <button 
                  className="reveal-btn" 
                  onClick={() => setIsRevealed(true)}
                  style={{ pointerEvents: 'auto' }}
                >
                  Confirm to Reveal
                </button>
                <p style={{ marginTop: '2rem', color: 'rgba(212,175,55,0.6)', letterSpacing: '0.1em', fontSize: '1.2rem', fontWeight: 600 }}>
                  A miracle is just a touch away
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="name-reveal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 3 }}
                style={{ zIndex: 10, textAlign: 'center', width: '100%', position: 'relative' }}
              >
                <motion.div
                  initial={{ scale: 0.1, letterSpacing: '3em' }}
                  animate={{ scale: 1, letterSpacing: '0.2em' }}
                  transition={{ duration: 4, type: "spring", stiffness: 30, damping: 10 }}
                >
                  <h2 style={{ fontSize: '1.4rem', color: 'rgba(255,255,255,0.4)', marginBottom: '3rem', letterSpacing: '0.6em', fontWeight: 300 }}>INTRODUCING OUR PRINCE</h2>
                  <h1 className="gold-text" style={{ 
                    fontSize: 'clamp(5rem, 18vw, 11rem)', 
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    lineHeight: 0.85,
                    filter: 'drop-shadow(0 0 50px rgba(212,175,55,0.4))'
                  }}>
                    Nirav
                  </h1>
                  <h1 className="gold-text" style={{ 
                    fontSize: 'clamp(5rem, 18vw, 11rem)', 
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    lineHeight: 1.2,
                    filter: 'drop-shadow(0 0 50px rgba(212,175,55,0.4))'
                  }}>
                    Athiran
                  </h1>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2, duration: 1.5 }}
                  style={{ display: 'flex', justifyContent: 'center', gap: '4rem', marginTop: '5rem' }}
                >
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}>
                    <Sparkles size={64} className="gold-text" />
                  </motion.div>
                  <motion.div animate={{ rotate: -360 }} transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}>
                    <Stars size={64} className="gold-text" />
                  </motion.div>
                </motion.div>
                
                {/* Massive Reveal Blast */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 15], opacity: [0.4, 0] }}
                  transition={{ duration: 4, ease: "easeOut" }}
                  style={{
                    position: 'absolute',
                    width: '300px',
                    height: '300px',
                    background: 'radial-gradient(circle, var(--accent-gold) 0%, transparent 70%)',
                    borderRadius: '50%',
                    zIndex: -1,
                    top: '50%',
                    left: '50%',
                    translate: '-50% -50%'
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Meaning Section */}
      <section className="section-container" style={{ padding: '18rem 2rem', background: '#f8fafc' }}>
        <motion.div 
          initial={{ y: 120, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card" 
          style={{ padding: '8rem 5rem', maxWidth: '1200px', width: '100%', position: 'relative' }}
        >
          <div style={{ position: 'absolute', top: '-75px', left: '50%', transform: 'translateX(-50%)' }}>
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 10 }}
              className="glass-card" 
              style={{ padding: '35px', borderRadius: '50%', background: 'white', border: '6px solid var(--accent-gold)' }}
            >
              <Baby size={100} color="#d4af37" strokeWidth={1} />
            </motion.div>
          </div>
          
          <h2 style={{ fontSize: '4rem', marginBottom: '5rem', fontWeight: 800, letterSpacing: '-0.02em' }}>The Meaning Behind the Majesty</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '6rem', textAlign: 'left' }}>
            <div style={{ padding: '3rem', borderLeft: '6px solid var(--accent-gold)', background: 'rgba(212,175,55,0.02)', borderRadius: '0 20px 20px 0' }}>
              <h3 style={{ fontSize: '3rem', marginBottom: '1.5rem', color: 'var(--accent-gold)', letterSpacing: '0.1em' }}>NIRAV</h3>
              <p style={{ fontSize: '1.4rem', lineHeight: 2, color: 'var(--text-main)' }}>
                <strong>Sanskrit Roots:</strong> Quiet, Calm, Serene. <br />
                A name that mirrors the profound stillness of a peaceful soul, bringing tranquility to every life he touches.
              </p>
            </div>
            <div style={{ padding: '3rem', borderLeft: '6px solid var(--accent-gold)', background: 'rgba(212,175,55,0.02)', borderRadius: '0 20px 20px 0' }}>
              <h3 style={{ fontSize: '3rem', marginBottom: '1.5rem', color: 'var(--accent-gold)', letterSpacing: '0.1em' }}>ATHIRAN</h3>
              <p style={{ fontSize: '1.4rem', lineHeight: 2, color: 'var(--text-main)' }}>
                <strong>Essence:</strong> Brightness, Ray of Sun. <br />
                A signature of pure radiance, signifying a life destined to be a beacon of hope and a source of eternal light.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Final Celebration */}
      <section className="section-container" style={{ background: '#0f172a', color: 'white', height: '100vh', position: 'relative' }}>
        <motion.div
           animate={{ 
             scale: [1, 1.2, 1],
             opacity: [0.4, 1, 0.4]
           }}
           transition={{ repeat: Infinity, duration: 6 }}
        >
           <Star size={120} fill="#d4af37" color="#d4af37" />
        </motion.div>
        <h2 style={{ fontSize: '5rem', marginTop: '4rem', fontWeight: 200, letterSpacing: '-0.02em' }}>Welcome Home, <br /> 
          <span className="gold-text" style={{ fontSize: '6.5rem', fontWeight: 900 }}>Sweet Nirav</span>
        </h2>
        
        <div style={{ position: 'absolute', bottom: '5rem', left: '50%', transform: 'translateX(-50%)', opacity: 0.3 }}>
          <Cloud size={48} />
        </div>
      </section>

      <footer style={{ padding: '10rem 2rem', textAlign: 'center', background: '#0f172a', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <p style={{ letterSpacing: '0.5em', textTransform: 'uppercase', fontSize: '1rem', color: 'rgba(255,255,255,0.3)' }}>
          A Legacy Begins • Nirav Athiran • MMXXVI
        </p>
      </footer>
    </motion.div>
  );
}

export default NameRevealApp;
