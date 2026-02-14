import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, typewriterContainer, typewriterChar } from '../utils/motionVariants';

const lines = [
    'Hey Parnika,',
    "this one's for you...",
];

export default function HeroIntro() {
    const [showCTA, setShowCTA] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowCTA(true), 3500);
        return () => clearTimeout(timer);
    }, []);

    const scrollToNext = () => {
        const el = document.getElementById('timeline-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="section-container min-h-screen relative" id="hero-section">
            {/* Animated gradient background */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute inset-0"
                    animate={{
                        background: [
                            'radial-gradient(ellipse at 20% 50%, rgba(244,63,94,0.12) 0%, transparent 60%)',
                            'radial-gradient(ellipse at 80% 50%, rgba(168,85,247,0.12) 0%, transparent 60%)',
                            'radial-gradient(ellipse at 50% 80%, rgba(236,72,153,0.12) 0%, transparent 60%)',
                            'radial-gradient(ellipse at 20% 50%, rgba(244,63,94,0.12) 0%, transparent 60%)',
                        ],
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                />
                {/* Sparkle particles */}
                {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            opacity: [0, 1, 0],
                            scale: [0.5, 1.2, 0.5],
                        }}
                        transition={{
                            duration: 2 + Math.random() * 3,
                            delay: Math.random() * 4,
                            repeat: Infinity,
                        }}
                    />
                ))}
            </div>

            {/* Main content */}
            <motion.div
                className="relative z-10 text-center max-w-3xl mx-auto px-4"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
            >
                {/* Decorative top hearts */}
                <motion.div
                    className="text-5xl md:text-6xl mb-8"
                    variants={fadeIn}
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                >
                    💕
                </motion.div>

                {/* Small intro text */}
                <motion.p
                    variants={fadeIn}
                    className="text-rose-300/80 font-body text-sm md:text-base tracking-[0.3em] uppercase mb-6"
                >
                    from mitadru, with all his heart
                </motion.p>

                {/* Typewriter lines */}
                {lines.map((line, lineIdx) => (
                    <motion.div
                        key={lineIdx}
                        className="mb-2"
                        variants={typewriterContainer}
                        initial="hidden"
                        animate="visible"
                        custom={lineIdx}
                    >
                        <div className={`font-display ${lineIdx === 0 ? 'text-4xl md:text-6xl lg:text-7xl' : 'text-3xl md:text-5xl lg:text-6xl'} text-gradient-love leading-tight`}>
                            {Array.from(line).map((char, charIdx) => (
                                <motion.span
                                    key={charIdx}
                                    variants={typewriterChar}
                                    className="inline-block"
                                    style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                ))}

                {/* Heart after typewriter */}
                <motion.span
                    className="inline-block text-3xl md:text-5xl mt-2"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2.2, type: 'spring', stiffness: 200 }}
                >
                    ❤️
                </motion.span>

                {/* Subtitle */}
                <motion.p
                    className="mt-8 text-rose-200/60 font-body text-base md:text-lg max-w-xl mx-auto leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5, duration: 1 }}
                >
                    Scroll down, Rasmalai Ji. I made something for the girl who stole my heart and never gave it back. Every moment, every memory, every heartbeat — it&apos;s all you.
                </motion.p>

                {/* CTA Button */}
                {showCTA && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="mt-10"
                    >
                        <motion.button
                            onClick={scrollToNext}
                            className="btn-love text-base md:text-lg group"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Begin Our Story, Parnika
                                <motion.span
                                    animate={{ y: [0, 4, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    ↓
                                </motion.span>
                            </span>
                        </motion.button>
                    </motion.div>
                )}

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 4, duration: 1 }}
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-5 h-8 rounded-full border-2 border-rose-400/30 flex justify-center pt-1"
                    >
                        <motion.div
                            className="w-1 h-2 bg-rose-400/60 rounded-full"
                            animate={{ opacity: [1, 0.3, 1], y: [0, 8, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
}
