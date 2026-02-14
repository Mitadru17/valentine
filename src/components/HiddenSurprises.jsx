import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { surpriseItems } from '../data/dummyData';
import { fadeInUp, bounceIn, staggerContainer, modalOverlay, modalContent } from '../utils/motionVariants';
import { fireLoveBurst } from '../utils/confetti';

function SurpriseIcon({ item, onOpen }) {
    return (
        <motion.div
            className="relative group cursor-pointer"
            variants={bounceIn}
            whileHover={{ scale: 1.15, y: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
                fireLoveBurst(0.5, 0.5);
                onOpen(item);
            }}
        >
            <div className="glass-card-hover p-6 md:p-8 text-center relative overflow-hidden">
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/0 to-purple-500/0 group-hover:from-rose-500/10 group-hover:to-purple-500/10 transition-all duration-500 rounded-2xl" />

                <div className="relative z-10">
                    <motion.span
                        className="text-4xl md:text-5xl block mb-3"
                        animate={{
                            y: [0, -6, 0],
                        }}
                        transition={{
                            duration: 2 + Math.random() * 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    >
                        {item.icon}
                    </motion.span>

                    <p className="text-rose-300/80 font-body text-xs md:text-sm">{item.hint}</p>
                </div>

                {/* Sparkle on hover */}
                <motion.div
                    className="absolute top-2 right-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{ rotate: [0, 180, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                >
                    ✨
                </motion.div>
            </div>
        </motion.div>
    );
}

function SurpriseModal({ item, onClose }) {
    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            variants={modalOverlay}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
        >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            <motion.div
                className="glass-card p-8 md:p-10 max-w-md w-full relative z-10 text-center overflow-hidden"
                variants={modalContent}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-rose-500/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />

                <div className="relative z-10">
                    <motion.span
                        className="text-6xl block mb-4"
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', delay: 0.2 }}
                    >
                        {item.icon}
                    </motion.span>

                    <h3 className="font-display text-3xl text-gradient-love mb-4">{item.title}</h3>

                    <motion.p
                        className="text-rose-100/80 font-body leading-relaxed text-base md:text-lg"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        {item.message}
                    </motion.p>

                    <motion.button
                        onClick={onClose}
                        className="mt-8 btn-love text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Close 💗
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function HiddenSurprises() {
    const [selectedItem, setSelectedItem] = useState(null);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section className="section-container py-20 md:py-32" id="surprises-section">
            <motion.div
                ref={ref}
                className="max-w-4xl mx-auto w-full"
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
            >
                {/* Section header */}
                <motion.div className="text-center mb-16" variants={fadeInUp}>
                    <p className="text-rose-400/60 font-body text-sm tracking-[0.3em] uppercase mb-4">Tap to Discover</p>
                    <h2 className="romantic-heading text-4xl md:text-6xl lg:text-7xl mb-4">Hidden Surprises</h2>
                    <p className="text-rose-200/50 font-body max-w-md mx-auto">Each icon holds a secret message, just for you. 💕</p>
                </motion.div>

                {/* Surprise grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    {surpriseItems.map((item) => (
                        <SurpriseIcon
                            key={item.id}
                            item={item}
                            onOpen={setSelectedItem}
                        />
                    ))}
                </div>
            </motion.div>

            {/* Modal */}
            <AnimatePresence>
                {selectedItem && (
                    <SurpriseModal
                        item={selectedItem}
                        onClose={() => setSelectedItem(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}
