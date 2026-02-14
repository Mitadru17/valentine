import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { loveCoupons } from '../data/dummyData';
import { fadeInUp, scaleIn, staggerContainer, bounceIn } from '../utils/motionVariants';
import { fireLoveBurst, fireHeartBurst } from '../utils/confetti';

const STORAGE_KEY = 'love-coupons-claimed';

function getClaimedCoupons() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

function saveClaimed(ids) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
        /* silent */
    }
}

function CouponCard({ coupon, isClaimed, onRedeem }) {
    const [justClaimed, setJustClaimed] = useState(false);

    const handleRedeem = () => {
        if (isClaimed) return;
        setJustClaimed(true);
        onRedeem(coupon);

        if (coupon.special) {
            fireHeartBurst();
        } else {
            fireLoveBurst(0.5, 0.5);
        }
    };

    return (
        <motion.div
            className="relative group"
            variants={scaleIn}
            whileHover={!isClaimed ? { scale: 1.03, y: -4 } : {}}
            layout
        >
            <div className={`glass-card p-5 md:p-6 h-full flex flex-col transition-all duration-500 ${isClaimed
                    ? 'opacity-70 border-emerald-400/20'
                    : 'hover:border-rose-400/30'
                } ${coupon.special && !isClaimed ? 'ring-1 ring-rose-500/20' : ''}`}>

                {/* Special badge */}
                {coupon.special && !isClaimed && (
                    <motion.div
                        className="absolute -top-2 -right-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[10px] font-body font-bold px-2 py-0.5 rounded-full z-10"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        ✨ SPECIAL
                    </motion.div>
                )}

                {/* Coupon title */}
                <h3 className="font-display text-xl md:text-2xl text-gradient-love mb-2 leading-snug">
                    {coupon.title}
                </h3>

                {/* Description */}
                <p className="text-rose-200/60 font-body text-sm leading-relaxed flex-grow mb-4">
                    {coupon.description}
                </p>

                {/* Redeem button */}
                {isClaimed ? (
                    <motion.div
                        className="flex items-center justify-center gap-2 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-300 font-body text-sm font-medium"
                        initial={justClaimed ? { scale: 0 } : { scale: 1 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        <span>✓</span>
                        <span>Claimed with love 💕</span>
                    </motion.div>
                ) : (
                    <motion.button
                        onClick={handleRedeem}
                        className="w-full py-2.5 rounded-full bg-gradient-to-r from-rose-500/20 to-pink-500/20 border border-rose-400/20 text-rose-300 font-body text-sm font-medium
              hover:from-rose-500/30 hover:to-pink-500/30 hover:border-rose-400/40 hover:text-white transition-all duration-300 cursor-pointer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.96 }}
                    >
                        Redeem This 💝
                    </motion.button>
                )}

                {/* Decorative dashed border (coupon feel) */}
                <div className="absolute left-3 right-3 top-[60%] border-t border-dashed border-white/[0.06]" />
            </div>
        </motion.div>
    );
}

export default function LoveCoupons() {
    const [claimed, setClaimed] = useState([]);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    useEffect(() => {
        setClaimed(getClaimedCoupons());
    }, []);

    const handleRedeem = (coupon) => {
        const updated = [...claimed, coupon.id];
        setClaimed(updated);
        saveClaimed(updated);
    };

    const claimedCount = claimed.length;
    const totalCount = loveCoupons.length;

    return (
        <section className="section-container py-20 md:py-32" id="coupons-section">
            <motion.div
                ref={ref}
                className="max-w-5xl mx-auto w-full"
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
            >
                {/* Section header */}
                <motion.div className="text-center mb-14" variants={fadeInUp}>
                    <p className="text-rose-400/60 font-body text-sm tracking-[0.3em] uppercase mb-4">Redeem With Love</p>
                    <h2 className="romantic-heading text-4xl md:text-6xl lg:text-7xl mb-4">Love Coupons</h2>
                    <p className="text-rose-200/50 font-body max-w-lg mx-auto mb-6">
                        Each one is a little promise from Mitadru to Parnika. Tap to claim. No expiry. No limits. Just love. 💕
                    </p>

                    {/* Progress */}
                    <div className="max-w-xs mx-auto">
                        <div className="flex justify-between text-xs text-rose-300/50 font-body mb-1.5">
                            <span>{claimedCount} claimed</span>
                            <span>{totalCount} total</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${(claimedCount / totalCount) * 100}%` }}
                                transition={{ duration: 0.6, ease: 'easeOut' }}
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Coupons grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
                    <AnimatePresence>
                        {loveCoupons.map((coupon) => (
                            <CouponCard
                                key={coupon.id}
                                coupon={coupon}
                                isClaimed={claimed.includes(coupon.id)}
                                onRedeem={handleRedeem}
                            />
                        ))}
                    </AnimatePresence>
                </div>

                {/* All claimed celebration */}
                <AnimatePresence>
                    {claimedCount === totalCount && (
                        <motion.div
                            className="text-center mt-12"
                            variants={bounceIn}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.span
                                className="text-5xl block mb-3"
                                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                🎉
                            </motion.span>
                            <p className="font-display text-2xl text-gradient-love mb-2">All coupons claimed!</p>
                            <p className="text-rose-200/50 font-body text-sm">
                                Don&apos;t worry, Parnika — they&apos;re all refillable. Mitadru&apos;s love has unlimited stock. 💕
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </section>
    );
}
