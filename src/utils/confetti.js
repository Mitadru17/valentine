import confetti from 'canvas-confetti';

const heartShape = confetti.shapeFromPath({
    path: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
});

export function fireHeartBurst() {
    const defaults = {
        spread: 360,
        ticks: 80,
        gravity: 0.6,
        decay: 0.94,
        startVelocity: 20,
        shapes: [heartShape],
        colors: ['#f43f5e', '#ec4899', '#f472b6', '#fb7185', '#fda4af', '#ff6b9d'],
        scalar: 1.5,
    };

    confetti({
        ...defaults,
        particleCount: 30,
        origin: { x: 0.5, y: 0.5 },
    });

    setTimeout(() => {
        confetti({
            ...defaults,
            particleCount: 20,
            origin: { x: 0.3, y: 0.6 },
        });
    }, 150);

    setTimeout(() => {
        confetti({
            ...defaults,
            particleCount: 20,
            origin: { x: 0.7, y: 0.6 },
        });
    }, 300);
}

export function fireConfettiRain() {
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ['#f43f5e', '#ec4899', '#a855f7', '#f472b6', '#fda4af', '#c084fc'];

    (function frame() {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors,
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors,
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}

export function fireLoveBurst(x = 0.5, y = 0.5) {
    confetti({
        particleCount: 50,
        spread: 70,
        origin: { x, y },
        shapes: [heartShape],
        colors: ['#f43f5e', '#ec4899', '#f472b6', '#fb7185'],
        scalar: 1.8,
        gravity: 0.8,
        ticks: 60,
    });
}

export function fireCelebration() {
    fireConfettiRain();
    setTimeout(fireHeartBurst, 500);
    setTimeout(() => {
        confetti({
            particleCount: 60,
            spread: 100,
            origin: { y: 0.7 },
            shapes: [heartShape, 'circle'],
            colors: ['#f43f5e', '#ec4899', '#a855f7', '#f472b6', '#fbbf24'],
            scalar: 2,
        });
    }, 1200);
}
