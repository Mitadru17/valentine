import { fireHeartBurst, fireConfettiRain, fireCelebration, fireLoveBurst } from '../utils/confetti';

export { fireHeartBurst, fireConfettiRain, fireCelebration, fireLoveBurst };

export default function ConfettiBurst({ type = 'hearts', x, y }) {
    const trigger = () => {
        switch (type) {
            case 'hearts':
                fireHeartBurst();
                break;
            case 'rain':
                fireConfettiRain();
                break;
            case 'celebration':
                fireCelebration();
                break;
            case 'love':
                fireLoveBurst(x, y);
                break;
            default:
                fireHeartBurst();
        }
    };

    return { trigger };
}
