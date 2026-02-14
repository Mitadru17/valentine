import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const YOUTUBE_EMBED_URL =
    'https://www.youtube.com/embed/CLeZyIID9Bo?autoplay=1&loop=1&playlist=CLeZyIID9Bo&controls=0';

export default function MusicToggle() {
    const [isPlaying, setIsPlaying] = useState(false);

    const toggleMusic = () => {
        setIsPlaying((prev) => !prev);
    };

    return (
        <>
            {/* Hidden YouTube embed — loads when toggled on */}
            {isPlaying && (
                <iframe
                    src={YOUTUBE_EMBED_URL}
                    width="0"
                    height="0"
                    allow="autoplay; encrypted-media"
                    className="fixed top-0 left-0 w-0 h-0 opacity-0 pointer-events-none"
                    title="Background Music"
                    tabIndex={-1}
                />
            )}

            <motion.button
                onClick={toggleMusic}
                className="fixed top-6 right-6 z-50 w-12 h-12 rounded-full glass-card flex items-center justify-center cursor-pointer group"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                title={isPlaying ? 'Pause music' : 'Play music'}
            >
                <AnimatePresence mode="wait">
                    {isPlaying ? (
                        <motion.div
                            key="playing"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 180 }}
                            className="flex items-center gap-[2px]"
                        >
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    className="w-[3px] bg-gradient-to-t from-rose-500 to-pink-400 rounded-full"
                                    animate={{
                                        height: ['8px', '16px', '8px'],
                                    }}
                                    transition={{
                                        duration: 0.6,
                                        repeat: Infinity,
                                        delay: i * 0.15,
                                        ease: 'easeInOut',
                                    }}
                                />
                            ))}
                        </motion.div>
                    ) : (
                        <motion.span
                            key="paused"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 180 }}
                            className="text-lg"
                        >
                            🎵
                        </motion.span>
                    )}
                </AnimatePresence>

                {/* Pulse ring when playing */}
                {isPlaying && (
                    <motion.div
                        className="absolute inset-0 rounded-full border border-rose-400/30"
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeOut',
                        }}
                    />
                )}

                {/* Hover glow */}
                <div className="absolute inset-0 rounded-full bg-rose-500/0 group-hover:bg-rose-500/10 transition-colors duration-300" />
            </motion.button>
        </>
    );
}
