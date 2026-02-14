import FloatingHeartsBackground from './components/FloatingHeartsBackground';
import MusicToggle from './components/MusicToggle';
import HeroIntro from './components/HeroIntro';
import LoveTimeline from './components/LoveTimeline';
import MemoryGallery from './components/MemoryGallery';
import LoveQuizGame from './components/LoveQuizGame';
import HiddenSurprises from './components/HiddenSurprises';
import EmbarrassingTexts from './components/EmbarrassingTexts';
import VideoMemories from './components/VideoMemories';
import LoveCoupons from './components/LoveCoupons';
import PlaylistSection from './components/PlaylistSection';
import FinalLoveMessage from './components/FinalLoveMessage';

const Divider = () => (
    <div className="w-full flex justify-center py-4">
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-rose-500/30 to-transparent" />
    </div>
);

export default function App() {
    return (
        <div className="relative min-h-screen bg-noise">
            {/* Global ambient background */}
            <FloatingHeartsBackground />

            {/* Music toggle - fixed position */}
            <MusicToggle />

            {/* Page sections */}
            <main className="relative z-10">
                <HeroIntro />
                <Divider />
                <LoveTimeline />
                <Divider />
                <EmbarrassingTexts />
                <Divider />
                <MemoryGallery />
                <Divider />
                <VideoMemories />
                <Divider />
                <LoveQuizGame />
                <Divider />
                <LoveCoupons />
                <Divider />
                <HiddenSurprises />
                <Divider />
                <PlaylistSection />
                <Divider />
                <FinalLoveMessage />
            </main>
        </div>
    );
}
