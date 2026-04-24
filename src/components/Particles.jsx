import { motion } from 'framer-motion';

const Particles = ({ count = 20, color = "#d4af37" }) => {
  const particles = Array.from({ length: count });

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 0 }}>
      {particles.map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 100 + "vw", 
            y: Math.random() * 100 + "vh", 
            opacity: Math.random() * 0.4 + 0.1,
            scale: Math.random() * 0.5 + 0.3
          }}
          animate={{
            y: [null, Math.random() * -100 - 50 + "px"],
            opacity: [null, 0],
            rotate: [0, 360]
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5
          }}
          style={{
            position: 'absolute',
            width: Math.random() * 6 + 4 + 'px',
            height: Math.random() * 6 + 4 + 'px',
            backgroundColor: color,
            borderRadius: '50%',
            filter: 'blur(0.5px)'
          }}
        />
      ))}
    </div>
  );
};

export default Particles;
