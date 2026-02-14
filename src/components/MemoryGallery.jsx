import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { galleryItems } from '../data/dummyData';
import { fadeInUp, scaleIn, staggerContainer, modalOverlay, modalContent } from '../utils/motionVariants';

function PolaroidCard({ item, index, onOpen }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <motion.div
            ref={ref}
            className="group cursor-pointer"
            variants={scaleIn}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: index * 0.1 }}
            whileHover={{
                scale: 1.05,
                rotate: 0,
                zIndex: 10,
                transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onOpen(item)}
            style={{ rotate: item.rotation }}
        >
            <div className="glass-card p-3 pb-5 transition-all duration-500 group-hover:shadow-[0_12px_48px_rgba(244,63,94,0.2)]">
                {/* Photo */}
                <div className="aspect-square rounded-lg overflow-hidden relative bg-black/20">
                    <img
                        src={item.image}
                        alt={item.caption}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                    />
                    {/* Shimmer overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12" />
                </div>

                {/* Caption */}
                <p className="mt-3 text-center text-rose-200/70 font-body text-sm md:text-base group-hover:text-rose-200 transition-colors duration-300">
                    {item.caption}
                </p>

                {/* Tape decoration */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-4 bg-rose-300/10 rounded-sm rotate-1 backdrop-blur-sm" />
            </div>
        </motion.div>
    );
}

function LightboxModal({ item, onClose }) {
    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            variants={modalOverlay}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
        >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
            <motion.div
                className="glass-card p-4 md:p-6 max-w-lg w-full relative z-10"
                variants={modalContent}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="rounded-xl overflow-hidden mb-4">
                    <img
                        src={item.image}
                        alt={item.caption}
                        className="w-full h-auto max-h-[60vh] object-contain rounded-xl"
                    />
                </div>

                <p className="text-center text-rose-100 font-body text-lg mb-6">{item.caption}</p>

                <motion.button
                    onClick={onClose}
                    className="btn-love text-sm mx-auto block"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Close 💕
                </motion.button>
            </motion.div>
        </motion.div>
    );
}

export default function MemoryGallery() {
    const [selectedItem, setSelectedItem] = useState(null);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section className="section-container py-20 md:py-32" id="gallery-section">
            <motion.div
                ref={ref}
                className="max-w-6xl mx-auto w-full"
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
            >
                {/* Section header */}
                <motion.div className="text-center mb-16" variants={fadeInUp}>
                    <p className="text-rose-400/60 font-body text-sm tracking-[0.3em] uppercase mb-4">Captured Moments</p>
                    <h2 className="romantic-heading text-4xl md:text-6xl lg:text-7xl mb-4">Memories</h2>
                    <p className="text-rose-200/50 font-body max-w-md mx-auto">Snapshots of our most precious moments together.</p>
                </motion.div>

                {/* Gallery grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
                    {galleryItems.map((item, index) => (
                        <PolaroidCard
                            key={item.id}
                            item={item}
                            index={index}
                            onOpen={setSelectedItem}
                        />
                    ))}
                </div>
            </motion.div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedItem && (
                    <LightboxModal
                        item={selectedItem}
                        onClose={() => setSelectedItem(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}
