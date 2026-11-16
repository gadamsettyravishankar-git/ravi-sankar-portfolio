import { useEffect, useState } from 'react';
import AboutSection from './components/AboutSection';
import AchievementsSection from './components/AchievementsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import Navbar from './components/Navbar';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import { DEFAULT_PROFILE_PLACEHOLDERS } from './data/portfolioData';
import { ProfilePlaceholders } from './types/portfolio';

const PROFILE_STORAGE_KEY = 'ravi_portfolio_profile_v1';
const SECTION_IDS = [
  'home',
  'about',
  'skills',
  'projects',
  'achievements',
  'contact',
];

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const [profile, setProfile] = useState<ProfilePlaceholders>(() => {
    try {
      const saved = localStorage.getItem(PROFILE_STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_PROFILE_PLACEHOLDERS, ...JSON.parse(saved) };
      }
    } catch {
      // Fallback safely
    }
    return DEFAULT_PROFILE_PLACEHOLDERS;
  });

  const handleUpdateProfile = (updated: ProfilePlaceholders) => {
    setProfile(updated);
    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore storage errors
    }
  };

  const handleResetProfile = () => {
    setProfile(DEFAULT_PROFILE_PLACEHOLDERS);
    try {
      localStorage.removeItem(PROFILE_STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  };

  const jumpToEditProfile = () => {
    setIsEditingProfile(true);
    const aboutEl = document.getElementById('about');
    if (aboutEl) {
      aboutEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0.1, 0.3, 0.6],
      }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#060b19] text-slate-100">
      {/* Subtle Ambient Electric Blue & Purple Radial Depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute -top-40 left-1/4 h-[460px] w-[460px] rounded-full bg-blue-600/12 blur-[130px]" />
        <div className="absolute top-1/3 -right-24 h-[420px] w-[420px] rounded-full bg-purple-600/12 blur-[130px]" />
      </div>

      <Navbar activeSection={activeSection} />

      <main className="relative z-10">
        <HeroSection
          profile={profile}
          onEditProfileRequest={jumpToEditProfile}
        />

        <AboutSection
          profile={profile}
          onUpdateProfile={handleUpdateProfile}
          onResetProfile={handleResetProfile}
          isEditingExternal={isEditingProfile}
          onSetEditingExternal={setIsEditingProfile}
        />

        <SkillsSection />

        <ProjectsSection />

        <AchievementsSection />

        <ContactSection
          profile={profile}
          onEditPlaceholders={jumpToEditProfile}
        />
      </main>

      <Footer />
    </div>
  );
}
