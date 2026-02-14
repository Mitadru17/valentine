import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { fadeInUp, scaleIn, staggerContainer } from '../utils/motionVariants';

export default function PlaylistSection({ playlistUrl = 'https://open.spotify.com/embed/playlist/5AsjwbeR2aiot5MEF9HcGi?utm_source=generator&theme=0' }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section className="section-container py-20 md:py-32" id="playlist-section">
            <motion.div
                ref={ref}
                className="max-w-2xl mx-auto w-full"
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
            >
                {/* Section header */}
                <motion.div className="text-center mb-12" variants={fadeInUp}>
                    <p className="text-rose-400/60 font-body text-sm tracking-[0.3em] uppercase mb-4">Our Soundtrack</p>
                    <h2 className="romantic-heading text-4xl md:text-6xl lg:text-7xl mb-4">Our Playlist</h2>
                    <p className="text-rose-200/50 font-body max-w-md mx-auto">Every song that reminds me of you and us. 🎵</p>
                </motion.div>

                {/* Playlist card */}
                <motion.div
                    className="relative group"
                    variants={scaleIn}
                >
                    {/* Glow border */}
                    <div className="absolute -inset-[2px] rounded-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-rose-500 via-purple-500 to-pink-500 blur-sm" />

                    <div className="glass-card p-4 md:p-6 relative z-10 rounded-3xl">
                        {/* Decorative note */}
                        <div className="flex items-center gap-2 mb-4 px-2">
                            <motion.span
                                className="text-2xl"
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                🎶
                            </motion.span>
                            <span className="text-rose-300/60 font-body text-sm">Press play and let the music speak...</span>
                        </div>

                        {/* Spotify embed */}
                        <div className="rounded-xl overflow-hidden bg-black/20">
                            <iframe
                                src={playlistUrl}
                                width="100%"
                                height="380"
                                frameBorder="0"
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                                className="rounded-xl"
                                title="Our Love Playlist"
                            />
                        </div>

                        {/* Bottom flourish */}
                        <div className="flex items-center justify-center gap-2 mt-4">
                            {['💕', '🎵', '💕'].map((emoji, i) => (
                                <motion.span
                                    key={i}
                                    className="text-lg opacity-40"
                                    animate={{ y: [0, -4, 0] }}
                                    transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                                >
                                    {emoji}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
