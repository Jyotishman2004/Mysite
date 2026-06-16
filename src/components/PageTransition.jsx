import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { useNavigationDirection } from '../context/NavigationDirectionContext';

// Generates random slices of backdrop-filters that tear and distort the screen
const generateGlitchSlices = () => {
    const sliceCount = 10 + Math.floor(Math.random() * 15); // 10-25 slices for a highly fragmented look
    const slices = [];
    
    for (let i = 0; i < sliceCount; i++) {
        const height = 1 + Math.random() * 12; // 1% to 13% height
        const top = Math.random() * 100; // Random vertical position
        
        // Jittery horizontal offset
        const offsetX = (Math.random() > 0.5 ? 1 : -1) * (5 + Math.random() * 60); 
        
        // Random harsh filters to distort underlying content
        const isInvert = Math.random() > 0.4;
        const hueRotate = Math.floor(Math.random() * 360);
        const saturate = 100 + Math.floor(Math.random() * 300);
        
        // Random timings so they flicker asynchronously
        const delay = Math.random() * 0.15;
        const duration = 0.05 + Math.random() * 0.1;
        
        // Occasional solid color block instead of just distortion
        const isSolid = Math.random() > 0.85;
        const colors = ['#c62828', '#000', '#fff'];
        const solidColor = isSolid ? colors[Math.floor(Math.random() * colors.length)] : 'transparent';
        
        slices.push({
            top: `${top}%`,
            height: `${height}%`,
            offsetX: `${offsetX}px`,
            filter: `invert(${isInvert ? 1 : 0}) hue-rotate(${hueRotate}deg) saturate(${saturate}%)`,
            delay,
            duration,
            solidColor
        });
    }
    return slices;
};

export const RealGlitchOverlay = ({ onComplete }) => {
    // Randomize total glitch duration between 150ms and 300ms
    const totalDurationMs = useMemo(() => 150 + Math.floor(Math.random() * 150), []);
    const slices = useMemo(() => generateGlitchSlices(), []);

    useEffect(() => {
        const timer = setTimeout(onComplete, totalDurationMs);
        return () => clearTimeout(timer);
    }, [onComplete, totalDurationMs]);

    return (
        <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
            {/* SVG TV Static Noise Layer - Organic analog noise */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 mix-blend-difference"
                style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
                    backgroundRepeat: 'repeat',
                }}
            />

            {/* Dynamically generated distortion slices */}
            {slices.map((slice, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 1, 0] }}
                    transition={{ 
                        duration: slice.duration, 
                        delay: slice.delay, 
                        times: [0, 0.1, 0.9, 1] 
                    }}
                    className="absolute left-0 right-0 border-y border-[rgba(255,255,255,0.1)]"
                    style={{
                        top: slice.top,
                        height: slice.height,
                        backdropFilter: slice.filter,
                        WebkitBackdropFilter: slice.filter,
                        transform: `translateX(${slice.offsetX})`,
                        background: slice.solidColor,
                    }}
                />
            ))}
            
            {/* Full screen brief high-contrast inversion flash */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.1, delay: Math.random() * 0.1 }}
                className="absolute inset-0"
                style={{ backdropFilter: 'invert(1) contrast(250%) grayscale(50%)' }}
            />
        </div>
    );
};

const PageTransition = ({ children, className = "" }) => {
    const [showOverlay, setShowOverlay] = useState(true);
    const { direction, setDirection } = useNavigationDirection();

    const isSwipe = direction === 'left' || direction === 'right';

    // Generate entry/exit translations.
    // On swipe: force signs to match direction (left swipe = positive x/skew, right = negative).
    // On regular nav: randomise signs like before.
    const entryParams = useMemo(() => {
        const signX = direction === 'left' ? 1 : direction === 'right' ? -1 : (Math.random() > 0.5 ? 1 : -1);
        const signY = Math.random() > 0.5 ? 1 : -1;
        const signSkew = direction === 'left' ? 1 : direction === 'right' ? -1 : (Math.random() > 0.5 ? 1 : -1);

        return {
            x: signX * (10 + Math.random() * 30),
            y: signY * (5 + Math.random() * 15),
            skewX: signSkew * (1 + Math.random() * 4),
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [direction]);

    const contentVariants = {
        initial: { 
            opacity: 0,
            x: entryParams.x,
            y: entryParams.y,
            skewX: entryParams.skewX,
        },
        in: { 
            opacity: 1,
            x: 0,
            y: 0,
            skewX: 0,
        },
        out: { 
            opacity: 0,
            x: -entryParams.x,
            y: -entryParams.y,
            skewX: -entryParams.skewX,
        }
    };

    // Clear direction after this transition mounts so future nav-link
    // clicks fall back to the default random direction.
    useEffect(() => {
        if (isSwipe) {
            const t = setTimeout(() => setDirection(null), 50);
            return () => clearTimeout(t);
        }
    }, [isSwipe, setDirection]);

    return (
        <>
            <AnimatePresence>
                {showOverlay && (
                    <RealGlitchOverlay key="real-glitch" onComplete={() => setShowOverlay(false)} />
                )}
            </AnimatePresence>
            <motion.main
                initial="initial"
                animate="in"
                exit="out"
                variants={contentVariants}
                transition={{ duration: 0.15, ease: "circOut", delay: 0.05 }}
                onAnimationComplete={() => setShowOverlay(false)}
                className={`flex-grow w-full ${className}`}
            >
                {children}
            </motion.main>
        </>
    );
};

export default PageTransition;

