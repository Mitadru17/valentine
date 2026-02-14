import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../utils/motionVariants';
import { fireCelebration, fireHeartBurst } from '../utils/confetti';

export default function FinalLoveMessage() {
    const [showClosing, setShowClosing] = useState(false);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const handleYes = () => {
        fireCelebration();
        setShowClosing(true);
    };

    const handleForever = () => {
        fireHeartBurst();
        setTimeout(fireCelebration, 600);
        setShowClosing(true);
    };

    return (
        <section className="section-container py-20 md:py-32 min-h-screen" id="final-section">
            <motion.div
                ref={ref}
                className="max-w-3xl mx-auto w-full text-center"
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
            >
                {/* Big animated heart */}
                <motion.div
                    className="mb-8"
                    variants={fadeInUp}
                >
                    <motion.span
                        className="text-8xl md:text-9xl inline-block"
                        animate={{
                            scale: [1, 1.15, 1, 1.15, 1],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatDelay: 0.5,
                        }}
                    >
                        💖
                    </motion.span>
                </motion.div>

                {/* Text reveal */}
                <motion.div variants={fadeInUp}>
                    <p className="text-rose-400/60 font-body text-sm tracking-[0.3em] uppercase mb-6">One Last Thing, Parnika</p>

                    <h2 className="romantic-heading text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight">
                        I Love You, Parnika
                    </h2>

                    <motion.div
                        className="space-y-4 max-w-xl mx-auto mb-12"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 0.8, duration: 1 }}
                    >
                        <p className="text-rose-100/70 font-body text-base md:text-lg leading-relaxed">
                            Parnika Madhukumar, I built this whole thing because a simple &quot;I love you&quot; felt too small for what I feel. You deserve a universe, but this website is a start.
                        </p>
                        <p className="text-rose-100/70 font-body text-base md:text-lg leading-relaxed">
                            Since 5 June 2025, when you said yes, my life has been the best kind of chaos. You are my sunrise, my 3 AM thought, my reason to smile at my phone like an idiot in public, and the only person who can make me nervous and calm at the same time.
                        </p>
                        <p className="text-rose-100/70 font-body text-base md:text-lg leading-relaxed">
                            You&apos;re not just my girlfriend — you&apos;re my favorite person, my safe place, and the one I want to annoy lovingly for the rest of my life.
                        </p>
                        <p className="text-rose-200/90 font-display text-xl md:text-2xl mt-6">
                            So, Parnika... will you keep being mine? Forever? 💕
                        </p>
                    </motion.div>
                </motion.div>

                {/* Two playful buttons */}
                {!showClosing ? (
                    <motion.div
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
                        variants={fadeInUp}
                    >
                        <motion.button
                            onClick={handleYes}
                            className="btn-love text-lg px-10 py-4 group relative"
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Yes, Always! 💕
                                <motion.span
                                    className="inline-block"
                                    animate={{ rotate: [0, 15, -15, 0] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                >
                                    🥰
                                </motion.span>
                            </span>
                        </motion.button>

                        <motion.button
                            onClick={handleForever}
                            className="relative px-10 py-4 rounded-full font-body font-semibold text-white overflow-hidden transition-all duration-300 text-lg"
                            style={{
                                background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                                boxShadow: '0 4px 20px rgba(168, 85, 247, 0.3)',
                            }}
                            whileHover={{
                                scale: 1.08,
                                boxShadow: '0 6px 30px rgba(168, 85, 247, 0.5)',
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Forever Yours, Mitadru
                                <motion.span
                                    className="inline-block"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    💜
                                </motion.span>
                            </span>
                        </motion.button>
                    </motion.div>
                ) : (
                    /* Closing message */
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ type: 'spring', damping: 15 }}
                        className="glass-card p-8 md:p-12 max-w-lg mx-auto"
                    >
                        <motion.span
                            className="text-6xl block mb-4"
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 10, -10, 0],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            🥰
                        </motion.span>

                        <h3 className="font-display text-3xl md:text-4xl text-gradient-love mb-4">
                            Parnika, you just made me the happiest!
                        </h3>

                        <p className="text-rose-100/70 font-body leading-relaxed">
                            Here&apos;s to Mitadru &amp; Parnika — to every laugh, every &quot;no you hang up first,&quot; every stolen hoodie, every 3 AM conversation, and every beautiful moment yet to come. You are my everything, and I&apos;m never letting go. 💕
                        </p>

                        <div className="flex items-center justify-center gap-1 mt-6">
                            {['❤️', '🧡', '💛', '💚', '💙', '💜', '🩷'].map((heart, i) => (
                                <motion.span
                                    key={i}
                                    className="text-xl"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + i * 0.1 }}
                                >
                                    {heart}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Bottom attribution */}
                <motion.p
                    className="mt-20 text-rose-300/30 font-body text-xs tracking-widest"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 2 }}
                >
                    made by mitadru, for his parnika 💕
                </motion.p>
            </motion.div>
        </section>
    );
}
