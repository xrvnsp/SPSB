import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const RevealText = ({ text, isSticky = false, children }) => {
  const containerRef = useRef(null);
  
  // Use "start end" (enters viewport) to "start start" (hits top/starts sticking)
  // This ensures the animation completes precisely as the text reaches the center
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"]
  });

  const words = text.split(" ");
  
  if (isSticky) {
    return (
      <div ref={containerRef} style={{ height: '250vh', position: 'relative', width: '100%' }}>
        <div style={{ 
          position: 'sticky', 
          top: 0, 
          height: '100vh', 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center', 
          padding: '2rem',
          zIndex: 10,
          textAlign: 'center',
          color: 'white'
        }}>
          {children}
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', textAlign: 'center', maxWidth: '900px', lineHeight: 1.4, marginTop: children ? '2rem' : 0 }}>
            {words.map((word, wordIndex) => {
              // Map progress to opacity for each word as it moves from bottom to 75% depth
              const totalWords = words.length;
              const step = 0.65 / totalWords;
              const start = 0.1 + (wordIndex * step);
              const end = start + step;
              
              return (
                <Word 
                  key={wordIndex} 
                  range={[start, end]} 
                  progress={scrollYProgress}
                >
                  {word}
                </Word>
              );
            })}
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="reveal-container" style={{ margin: '4rem 0', textAlign: 'center' }}>
      {children}
      <h2 style={{ fontSize: '3rem', letterSpacing: '0.1em', marginTop: children ? '2rem' : 0 }}>
        {words.map((word, wordIndex) => {
          const start = wordIndex / words.length;
          const end = (wordIndex + 1) / words.length;
          
          return (
            <Word 
              key={wordIndex} 
              range={[start, end]} 
              progress={scrollYProgress}
            >
              {word}
            </Word>
          );
        })}
      </h2>
    </div>
  );
};

const Word = ({ children, range, progress }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, [20, 0]);
  const scale = useTransform(progress, range, [0.8, 1]);
  
  return (
    <span style={{ position: 'relative', display: 'inline-block', marginRight: '0.8rem' }}>
      <motion.span style={{ opacity, y, scale, display: 'inline-block' }}>
        {children}
      </motion.span>
    </span>
  );
};

export default RevealText;
