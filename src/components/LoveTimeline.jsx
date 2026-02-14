import { useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef } from 'react';
import { timelineEvents } from '../data/dummyData';
import { fadeInUp, slideInLeft, slideInRight, staggerContainer, modalOverlay, modalContent } from '../utils/motionVariants';

function TimelineCard({ event, index, onOpen }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });
    const isLeft = index % 2 === 0;

    return (
        <motion.div
            ref={ref}
            className={`flex w-full items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:gap-8 gap-4`}
            variants={isLeft ? slideInLeft : slideInRight}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: index * 0.1 }}
        >
            {/* Card */}
            <motion.div
                className={`glass-card-hover glow-border p-6 md:p-8 md:w-5/12 w-full cursor-pointer group relative overflow-hidden`}
                onClick={() => onOpen(event)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/0 to-purple-500/0 group-hover:from-rose-500/5 group-hover:to-purple-500/5 transition-all duration-500 rounded-2xl" />

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                        <motion.span
                            className="text-3xl"
                            whileHover={{ scale: 1.3, rotate: 15 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            {event.emoji}
                        </motion.span>
                        <span className="text-rose-400/70 font-body text-sm tracking-wider uppercase">
                            {event.date}
                        </span>
                    </div>

                    <h3 className="font-display text-2xl md:text-3xl text-gradient-love mb-3">{event.title}</h3>
                    <p className="text-rose-100/70 font-body leading-relaxed text-sm md:text-base">{event.shortText}</p>

                    <div className="mt-4 flex items-center gap-2 text-rose-400/60 text-sm font-body group-hover:text-rose-300 transition-colors">
                        <span>Read more</span>
                        <motion.span
                            animate={{ x: [0, 4, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            →
                        </motion.span>
                    </div>
                </div>
            </motion.div>

            {/* Timeline dot */}
            <div className="hidden md:flex items-center justify-center md:w-2/12">
                <motion.div
                    className="relative"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: index * 0.1 + 0.3, type: 'spring' }}
                >
                    <div className="w-5 h-5 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full z-10 relative" />
                    <motion.div
                        className="absolute inset-0 w-5 h-5 bg-rose-500 rounded-full"
                        animate={{
                            scale: [1, 2, 1],
                            opacity: [0.5, 0, 0.5],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </motion.div>
            </div>

            {/* Spacer for alternating */}
            <div className="hidden md:block md:w-5/12" />
        </motion.div>
    );
}

function TimelineModal({ event, onClose }) {
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
                className="glass-card p-8 md:p-10 max-w-lg w-full relative z-10 overflow-hidden"
                variants={modalContent}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Decorative glow */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-rose-500/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />

                <div className="relative z-10">
                    <motion.span
                        className="text-5xl block mb-4"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', delay: 0.2 }}
                    >
                        {event.emoji}
                    </motion.span>

                    <p className="text-rose-400/70 text-sm tracking-wider uppercase mb-2 font-body">{event.date}</p>
                    <h3 className="font-display text-3xl md:text-4xl text-gradient-love mb-5">{event.title}</h3>
                    <p className="text-rose-100/80 font-body leading-relaxed text-base md:text-lg">{event.longText}</p>

                    <motion.button
                        onClick={onClose}
                        className="mt-8 btn-love text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Close with love 💕
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function LoveTimeline() {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section className="section-container py-20 md:py-32" id="timeline-section">
            <motion.div
                ref={ref}
                className="max-w-5xl mx-auto w-full"
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
            >
                {/* Section header */}
                <motion.div className="text-center mb-16 md:mb-20" variants={fadeInUp}>
                    <p className="text-rose-400/60 font-body text-sm tracking-[0.3em] uppercase mb-4">Our Journey</p>
                    <h2 className="romantic-heading text-4xl md:text-6xl lg:text-7xl mb-4">Love Timeline</h2>
                    <p className="text-rose-200/50 font-body max-w-md mx-auto">Every chapter of our story, each one more beautiful than the last.</p>
                </motion.div>

                {/* Timeline spine */}
                <div className="relative">
                    {/* Vertical line */}
                    <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-rose-500/30 to-transparent" />

                    <div className="flex flex-col gap-12 md:gap-16">
                        {timelineEvents.map((event, index) => (
                            <TimelineCard
                                key={index}
                                event={event}
                                index={index}
                                onOpen={setSelectedEvent}
                            />
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Modal */}
            <AnimatePresence>
                {selectedEvent && (
                    <TimelineModal
                        event={selectedEvent}
                        onClose={() => setSelectedEvent(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}
