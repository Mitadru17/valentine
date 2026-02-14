import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { quizQuestions } from '../data/dummyData';
import { fadeInUp, scaleIn, staggerContainer, bounceIn } from '../utils/motionVariants';
import { fireHeartBurst, fireCelebration, fireLoveBurst } from '../utils/confetti';

export default function LoveQuizGame() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selected, setSelected] = useState(null);
    const [showResponse, setShowResponse] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [started, setStarted] = useState(false);

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const question = quizQuestions[currentQuestion];

    const handleAnswer = (index) => {
        if (selected !== null) return;
        setSelected(index);
        const isCorrect = index === question.correct;

        if (isCorrect) {
            setScore((s) => s + 1);
            fireLoveBurst(0.5, 0.5);
        }

        setShowResponse(true);

        setTimeout(() => {
            if (currentQuestion < quizQuestions.length - 1) {
                setCurrentQuestion((q) => q + 1);
                setSelected(null);
                setShowResponse(false);
            } else {
                setIsComplete(true);
                fireCelebration();
            }
        }, 2000);
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setSelected(null);
        setShowResponse(false);
        setIsComplete(false);
        setStarted(false);
    };

    return (
        <section className="section-container py-20 md:py-32" id="quiz-section">
            <motion.div
                ref={ref}
                className="max-w-2xl mx-auto w-full"
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
            >
                {/* Section header */}
                <motion.div className="text-center mb-12" variants={fadeInUp}>
                    <p className="text-rose-400/60 font-body text-sm tracking-[0.3em] uppercase mb-4">Test Your Love</p>
                    <h2 className="romantic-heading text-4xl md:text-6xl lg:text-7xl mb-4">Love Quiz</h2>
                    <p className="text-rose-200/50 font-body max-w-md mx-auto">How well do you really know us? Let&apos;s find out! 💕</p>
                </motion.div>

                <motion.div className="glass-card p-6 md:p-10 relative overflow-hidden" variants={scaleIn}>
                    {/* Background decoration */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-rose-500/5 rounded-full blur-3xl" />
                    <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl" />

                    <div className="relative z-10">
                        {!started ? (
                            /* Start screen */
                            <motion.div
                                className="text-center py-8"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <motion.span
                                    className="text-6xl block mb-6"
                                    animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    💝
                                </motion.span>
                                <h3 className="font-display text-3xl text-gradient-love mb-4">Ready to play?</h3>
                                <p className="text-rose-200/60 font-body mb-8">
                                    {quizQuestions.length} questions about our love story
                                </p>
                                <motion.button
                                    onClick={() => setStarted(true)}
                                    className="btn-love text-lg"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Start Quiz 💕
                                </motion.button>
                            </motion.div>
                        ) : isComplete ? (
                            /* Completion screen */
                            <motion.div
                                className="text-center py-8"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ type: 'spring' }}
                            >
                                <motion.span
                                    className="text-7xl block mb-6"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                >
                                    {score === quizQuestions.length ? '🏆' : score >= quizQuestions.length / 2 ? '💖' : '💕'}
                                </motion.span>

                                <h3 className="font-display text-3xl md:text-4xl text-gradient-love mb-3">
                                    {score === quizQuestions.length
                                        ? 'Perfect Score!'
                                        : score >= quizQuestions.length / 2
                                            ? 'Amazing!'
                                            : 'Not bad!'}
                                </h3>

                                <p className="text-rose-100/80 font-body text-lg mb-2">
                                    You got <span className="text-rose-400 font-semibold">{score}</span> out of{' '}
                                    <span className="text-rose-400 font-semibold">{quizQuestions.length}</span> right!
                                </p>

                                <p className="text-rose-200/50 font-body mb-8">
                                    {score === quizQuestions.length
                                        ? "You know our love story by heart! 💕"
                                        : "Every answer shows how much you care 🥰"}
                                </p>

                                <motion.button
                                    onClick={resetQuiz}
                                    className="btn-love"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Play Again 🔄
                                </motion.button>
                            </motion.div>
                        ) : (
                            /* Question screen */
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentQuestion}
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -30 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* Progress */}
                                    <div className="flex items-center justify-between mb-6">
                                        <span className="text-rose-400/60 font-body text-sm">
                                            Question {currentQuestion + 1} of {quizQuestions.length}
                                        </span>
                                        <span className="text-rose-400/60 font-body text-sm">
                                            Score: {score} 💕
                                        </span>
                                    </div>

                                    {/* Progress bar */}
                                    <div className="w-full h-1.5 bg-white/5 rounded-full mb-8 overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                                            transition={{ duration: 0.5, ease: 'easeOut' }}
                                        />
                                    </div>

                                    {/* Question */}
                                    <h3 className="font-display text-2xl md:text-3xl text-white mb-8">
                                        {question.question}
                                    </h3>

                                    {/* Options */}
                                    <div className="grid gap-3">
                                        {question.options.map((option, i) => {
                                            const isCorrect = i === question.correct;
                                            const isSelected = selected === i;
                                            const showResult = selected !== null;

                                            return (
                                                <motion.button
                                                    key={i}
                                                    onClick={() => handleAnswer(i)}
                                                    disabled={selected !== null}
                                                    className={`w-full text-left p-4 rounded-xl font-body transition-all duration-300 border ${showResult
                                                            ? isCorrect
                                                                ? 'bg-emerald-500/20 border-emerald-400/50 text-emerald-200'
                                                                : isSelected
                                                                    ? 'bg-rose-500/20 border-rose-400/50 text-rose-200'
                                                                    : 'bg-white/[0.03] border-white/[0.06] text-rose-200/40'
                                                            : 'bg-white/[0.03] border-white/[0.08] text-rose-100/80 hover:bg-white/[0.08] hover:border-rose-400/30 cursor-pointer'
                                                        }`}
                                                    whileHover={selected === null ? { scale: 1.01, x: 4 } : {}}
                                                    whileTap={selected === null ? { scale: 0.99 } : {}}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: i * 0.08 }}
                                                >
                                                    <span className="flex items-center gap-3">
                                                        <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${showResult && isCorrect
                                                                ? 'bg-emerald-500/30 text-emerald-300'
                                                                : showResult && isSelected
                                                                    ? 'bg-rose-500/30 text-rose-300'
                                                                    : 'bg-white/[0.06] text-rose-300/60'
                                                            }`}>
                                                            {showResult && isCorrect ? '✓' : showResult && isSelected ? '✗' : String.fromCharCode(65 + i)}
                                                        </span>
                                                        {option}
                                                    </span>
                                                </motion.button>
                                            );
                                        })}
                                    </div>

                                    {/* Response message */}
                                    <AnimatePresence>
                                        {showResponse && (
                                            <motion.p
                                                className="mt-6 text-center font-body text-rose-200/80"
                                                variants={bounceIn}
                                                initial="hidden"
                                                animate="visible"
                                                exit={{ opacity: 0 }}
                                            >
                                                {question.response}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            </AnimatePresence>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
