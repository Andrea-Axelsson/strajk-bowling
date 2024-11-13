import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Loading = () => {
  const navigate = useNavigate();

  // Navigera till /booking efter en viss tid
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/booking');
    }, 2000); // 3 sekunder eller justera tiden efter behov
    return () => clearTimeout(timer);
  }, [navigate]);

  // Animationens inställningar
  const pulseAnimation = {
    initial: { scale: 1, opacity: 1 },
    animate: { scale: [1, 1.2, 1], opacity: [1, 0.8, 1] },
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: 'easeInOut',
    }
  };

  return (
    <section className='container-loading'>
      <article className='logo'>
        <motion.img
          src="images/logo.svg"
          alt=""
          className="logo"
          variants={pulseAnimation}
          initial="initial"
          animate="animate"
          transition={{ delay: 0 }}
        />
        <motion.h1
          className="logo__title"
          variants={pulseAnimation}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.2 }} // Stagger-effekt
        >
          STRAJK
        </motion.h1>
        <motion.h2
          className="logo__sub-title"
          variants={pulseAnimation}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.4 }} // Stagger-effekt
        >
          BOWLING
        </motion.h2>
      </article>
    </section>
  );
};

export default Loading;