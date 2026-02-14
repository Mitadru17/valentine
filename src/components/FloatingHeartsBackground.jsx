import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function Heart({ delay, duration, left, size, opacity }) {
    return (
        <motion.div
            className="absolute pointer-events-none select-none"
            style={{ left: `${left}%`, bottom: '-5%', fontSize: `${size}rem` }}
            initial={{ y: 0, opacity: 0, rotate: 0 }}
            animate={{
                y: [0, -window.innerHeight * 1.2],
                opacity: [0, opacity, opacity, 0],
                rotate: [0, Math.random() > 0.5 ? 30 : -30],
                x: [0, (Math.random() - 0.5) * 100],
            }}
            transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: 'linear',
            }}
        >
            💗
        </motion.div>
    );
}

export default function FloatingHeartsBackground() {
    const [hearts, setHearts] = useState([]);

    useEffect(() => {
        const generated = Array.from({ length: 18 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 8,
            duration: 8 + Math.random() * 10,
            size: 0.6 + Math.random() * 1.2,
            opacity: 0.15 + Math.random() * 0.2,
        }));
        setHearts(generated);
    }, []);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {hearts.map((heart) => (
                <Heart key={heart.id} {...heart} />
            ))}

            {/* Ambient glow orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-500/[0.04] rounded-full blur-3xl animate-float-slow" />
            <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/[0.04] rounded-full blur-3xl animate-float-slower" />
            <div className="absolute top-2/3 left-1/2 w-72 h-72 bg-pink-500/[0.03] rounded-full blur-3xl animate-float" />
        </div>
    );
}
