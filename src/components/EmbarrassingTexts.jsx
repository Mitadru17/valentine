import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { fadeInUp, scaleIn, staggerContainer, modalOverlay, modalContent } from '../utils/motionVariants';

const screenshots = [
    'IMG_2247.PNG', 'IMG_2258.PNG', 'IMG_2260.PNG', 'IMG_2262.PNG',
    'IMG_2277.PNG', 'IMG_0067.PNG', 'IMG_0126.PNG', 'IMG_2250.PNG',
    'IMG_2295.PNG', 'IMG_2297.PNG', 'IMG_2307.PNG', 'IMG_2245.PNG',
    'IMG_2249.PNG', 'IMG_2259.PNG', 'IMG_2298.PNG', 'IMG_2299.PNG',
    'IMG_2300.PNG', 'IMG_2246.PNG', 'IMG_2261.PNG', 'IMG_2279.PNG',
    'IMG_2296.PNG', 'IMG_2337.PNG',
];

const teasingCaptions = [
    "Evidence exhibit A 😭",
    "No deleting this, Parnika",
    "The cringe era 💀",
    "Aww look at baby us",
    "You can't deny this 🫣",
    "Screenshots don't lie 📸",
    "Peak awkwardness achieved",
    "This is going in the vault",
    "Remember when we were shy? 🤭",
    "Exhibit B of your crimes",
    "You typed this. You. 😂",
    "The origins of us ✨",
    "I'm never letting you forget",
    "Throwback to the audacious era",
    "This existed. It still does.",
    "The emoji abuse was real 💀",
    "We were so down bad 😭",
    "Cute? Cringe? Both? Yes.",
    "The beginning of forever",
    "Look at us being all formal",
    "This is historically important 📜",
    "And she says she wasn't obvious 🤥",
];

export default function EmbarrassingTexts() {
    const [revealed, setRevealed] = useState(false);
    const [selectedImg, setSelectedImg] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const handleReveal = () => {
        setRevealed(true);
    };

    const openLightbox = (index) => {
        setSelectedImg(screenshots[index]);
        setCurrentIndex(index);
    };

    const navigate = (dir) => {
        const next = (currentIndex + dir + screenshots.length) % screenshots.length;
        setCurrentIndex(next);
        setSelectedImg(screenshots[next]);
    };

    return (
        <section className="section-container py-20 md:py-32" id="receipts-section">
            <motion.div
                ref={ref}
                className="max-w-5xl mx-auto w-full"
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
            >
                {/* Section header */}
                <motion.div className="text-center mb-12" variants={fadeInUp}>
                    <p className="text-rose-400/60 font-body text-sm tracking-[0.3em] uppercase mb-4">
                        You Can&apos;t Hide From The Past
                    </p>
                    <h2 className="romantic-heading text-4xl md:text-6xl lg:text-7xl mb-4">
                        The Receipts 💀
                    </h2>
                    <p className="text-rose-200/50 font-body max-w-lg mx-auto">
                        Remember those early days, Parnika? The ones you desperately wish you could delete? Yeah... I saved them all. You&apos;re welcome. 😘
                    </p>
                </motion.div>

                {/* Reveal gate */}
                {!revealed ? (
                    <motion.div
                        className="text-center"
                        variants={fadeInUp}
                    >
                        <motion.div
                            className="glass-card p-8 md:p-12 max-w-md mx-auto mb-6"
                            whileHover={{ scale: 1.02 }}
                        >
                            <motion.span
                                className="text-6xl block mb-4"
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                🫣
                            </motion.span>
                            <p className="text-rose-200/70 font-body text-lg mb-2">
                                Warning: Maximum cringe ahead
                            </p>
                            <p className="text-rose-300/40 font-body text-sm mb-6">
                                Parnika, you might want to cover your face for this one...
                            </p>
                            <motion.button
                                onClick={handleReveal}
                                className="btn-love text-base px-8 py-3 cursor-pointer"
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Show Me The Receipts
                                    <span>💀</span>
                                </span>
                            </motion.button>
                        </motion.div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Scrolling banner */}
                        <div className="overflow-hidden mb-8">
                            <motion.div
                                className="flex gap-2 whitespace-nowrap text-rose-400/30 font-body text-xs tracking-widest uppercase"
                                animate={{ x: ['0%', '-50%'] }}
                                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                            >
                                {Array(4).fill('NO DELETING · NO HIDING · NO DENYING · RECEIPTS ARE FOREVER · ').map((text, i) => (
                                    <span key={i}>{text}</span>
                                ))}
                            </motion.div>
                        </div>

                        {/* Screenshot grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                            {screenshots.map((file, index) => (
                                <motion.div
                                    key={file}
                                    className="group cursor-pointer relative"
                                    initial={{ opacity: 0, scale: 0.8, rotate: Math.random() * 6 - 3 }}
                                    animate={{ opacity: 1, scale: 1, rotate: Math.random() * 4 - 2 }}
                                    transition={{ delay: index * 0.05, type: 'spring', stiffness: 200 }}
                                    whileHover={{ scale: 1.08, rotate: 0, zIndex: 10 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => openLightbox(index)}
                                >
                                    <div className="glass-card p-1.5 pb-8 transition-all duration-300 group-hover:shadow-[0_8px_32px_rgba(244,63,94,0.15)]">
                                        <div className="rounded-lg overflow-hidden bg-black/30 aspect-[9/16]">
                                            <img
                                                src={`/photos/${file}`}
                                                alt={`Chat screenshot ${index + 1}`}
                                                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                                loading="lazy"
                                            />
                                        </div>
                                        {/* Caption */}
                                        <p className="absolute bottom-2 left-2 right-2 text-center text-rose-300/50 font-body text-[10px] md:text-xs group-hover:text-rose-300/80 transition-colors truncate">
                                            {teasingCaptions[index % teasingCaptions.length]}
                                        </p>
                                    </div>

                                    {/* Tape */}
                                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-3 bg-rose-300/10 rounded-sm rotate-2 backdrop-blur-sm" />
                                </motion.div>
                            ))}
                        </div>

                        {/* Bottom teasing text */}
                        <motion.p
                            className="text-center mt-10 text-rose-300/40 font-body text-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                        >
                            Don&apos;t worry Parnika, I still love you even with the cringe. Especially with the cringe. 💕
                        </motion.p>
                    </motion.div>
                )}
            </motion.div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImg && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        variants={modalOverlay}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={() => setSelectedImg(null)}
                    >
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
                        <motion.div
                            className="relative z-10 max-w-sm w-full"
                            variants={modalContent}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="glass-card p-3 pb-10">
                                <img
                                    src={`/photos/${selectedImg}`}
                                    alt="Chat screenshot"
                                    className="w-full h-auto rounded-lg max-h-[75vh] object-contain"
                                />
                                <p className="absolute bottom-3 left-3 right-3 text-center text-rose-300/60 font-body text-xs">
                                    {teasingCaptions[currentIndex % teasingCaptions.length]}
                                </p>
                            </div>

                            {/* Navigation */}
                            <div className="flex items-center justify-between mt-4">
                                <motion.button
                                    onClick={() => navigate(-1)}
                                    className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-rose-300 cursor-pointer"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    ←
                                </motion.button>
                                <span className="text-rose-300/40 font-body text-xs">
                                    {currentIndex + 1} / {screenshots.length}
                                </span>
                                <motion.button
                                    onClick={() => navigate(1)}
                                    className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-rose-300 cursor-pointer"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    →
                                </motion.button>
                            </div>

                            {/* Close */}
                            <motion.button
                                onClick={() => setSelectedImg(null)}
                                className="mt-4 btn-love text-sm mx-auto block cursor-pointer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                I&apos;ve Seen Enough 😂
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
