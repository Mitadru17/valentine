import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { fadeInUp, staggerContainer, modalOverlay, modalContent } from '../utils/motionVariants';

const videos = [
    {
        src: '/videos/pookie 2.MP4',
        label: 'Pookie Mode 🥺',
        vibe: 'When Parnika is being the cutest human alive',
        category: '🥺',
    },
    {
        src: '/videos/funny 1.MP4',
        label: 'Comedy Hour 😂',
        vibe: "This is what dating Parnika looks like (chaotic)",
        category: '😂',
    },
    {
        src: '/videos/kiss 1.MOV',
        label: 'Stolen Moment 💋',
        vibe: "Some things are better watched than described...",
        category: '💋',
    },
    {
        src: '/videos/pookie.MOV',
        label: 'Certified Pookie 💕',
        vibe: "More evidence that she's illegally adorable",
        category: '🥺',
    },
    {
        src: '/videos/pookie 3.MP4',
        label: 'Triple Pookie Threat 🫠',
        vibe: "At this point I'm just showing off my girlfriend",
        category: '🥺',
    },
    {
        src: '/videos/funny.MOV',
        label: 'Unhinged Together 💀',
        vibe: "When we're both chaotic at the same time",
        category: '😂',
    },
    {
        src: '/videos/kiss 2.MOV',
        label: 'Replay Forever 💋',
        vibe: "I could watch this on loop until the end of time",
        category: '💋',
    },
];

function VideoCard({ video, index, onPlay }) {
    return (
        <motion.div
            className="group cursor-pointer relative"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, type: 'spring', stiffness: 150 }}
            whileHover={{ scale: 1.04, y: -6 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onPlay(video)}
        >
            <div className="glass-card p-2.5 pb-4 transition-all duration-500 group-hover:shadow-[0_12px_40px_rgba(244,63,94,0.2)] group-hover:border-rose-400/30">
                {/* Video thumbnail with play overlay */}
                <div className="relative rounded-lg overflow-hidden bg-black/40 aspect-video">
                    <video
                        src={video.src}
                        className="w-full h-full object-cover"
                        muted
                        preload="metadata"
                        playsInline
                    />
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors duration-300">
                        <motion.div
                            className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center"
                            whileHover={{ scale: 1.15 }}
                            animate={{ scale: [1, 1.08, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <span className="text-white text-lg ml-0.5">▶</span>
                        </motion.div>
                    </div>

                    {/* Category badge */}
                    <div className="absolute top-2 right-2 text-lg">
                        {video.category}
                    </div>
                </div>

                {/* Label & vibe */}
                <div className="mt-2.5 px-1">
                    <p className="font-display text-base md:text-lg text-gradient-love leading-snug">
                        {video.label}
                    </p>
                    <p className="text-rose-300/40 font-body text-xs mt-0.5 truncate">
                        {video.vibe}
                    </p>
                </div>
            </div>

            {/* Film strip decoration */}
            <div className="absolute -left-1 top-4 bottom-4 w-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="h-full flex flex-col justify-between">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-1 h-1 rounded-full bg-rose-400/30" />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default function VideoMemories() {
    const [playing, setPlaying] = useState(null);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section className="section-container py-20 md:py-32" id="videos-section">
            <motion.div
                ref={ref}
                className="max-w-5xl mx-auto w-full"
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
            >
                {/* Header */}
                <motion.div className="text-center mb-14" variants={fadeInUp}>
                    <p className="text-rose-400/60 font-body text-sm tracking-[0.3em] uppercase mb-4">
                        Press Play On Us
                    </p>
                    <h2 className="romantic-heading text-4xl md:text-6xl lg:text-7xl mb-4">
                        Our Reels 🎬
                    </h2>
                    <p className="text-rose-200/50 font-body max-w-lg mx-auto">
                        The pookie moments, the funny chaos, and the stolen kisses — all caught on camera. No filter, just us. 💕
                    </p>
                </motion.div>

                {/* Video grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {videos.map((video, index) => (
                        <VideoCard
                            key={video.src}
                            video={video}
                            index={index}
                            onPlay={setPlaying}
                        />
                    ))}
                </div>

                {/* Bottom note */}
                <motion.p
                    className="text-center mt-10 text-rose-300/30 font-body text-xs tracking-wider"
                    variants={fadeInUp}
                >
                    every second with you is worth replaying forever
                </motion.p>
            </motion.div>

            {/* Video player modal */}
            <AnimatePresence>
                {playing && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        variants={modalOverlay}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={() => setPlaying(null)}
                    >
                        <div className="absolute inset-0 bg-black/85 backdrop-blur-lg" />
                        <motion.div
                            className="relative z-10 w-full max-w-2xl"
                            variants={modalContent}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Video label */}
                            <div className="text-center mb-4">
                                <p className="font-display text-2xl md:text-3xl text-gradient-love">
                                    {playing.label}
                                </p>
                                <p className="text-rose-300/50 font-body text-sm mt-1">
                                    {playing.vibe}
                                </p>
                            </div>

                            {/* Video player */}
                            <div className="glass-card p-2 md:p-3 rounded-2xl">
                                <video
                                    src={playing.src}
                                    className="w-full rounded-xl max-h-[70vh]"
                                    controls
                                    autoPlay
                                    playsInline
                                />
                            </div>

                            {/* Close button */}
                            <motion.button
                                onClick={() => setPlaying(null)}
                                className="mt-5 btn-love text-sm mx-auto block cursor-pointer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Close 💕
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
