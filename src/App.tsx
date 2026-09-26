import { useState } from 'react';
import CustomCursor from './components/CustomCursor';
import OpeningExperience from './components/OpeningExperience';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Campus3DViewer from './components/Campus3DViewer';
import DayInWorld from './components/DayInWorld';
import ActivityWall from './components/ActivityWall';
import ChildrenArtGallery from './components/ChildrenArtGallery';
import TeacherSection from './components/TeacherSection';
import ParentTestimonials from './components/ParentTestimonials';
import SchoolLifeVideoWall from './components/SchoolLifeVideoWall';
import VirtualTour from './components/VirtualTour';
import AdmissionCta from './components/AdmissionCta';
import Footer from './components/Footer';
import InteractiveVideoModal from './components/InteractiveVideoModal';
import BookVisitModal from './components/BookVisitModal';
import { CampusZone, DayTimelineItem, ActivityItem, TeacherProfile, ParentStory, VideoStory, VIRTUAL_TOUR_STOPS } from './data/schoolData';

interface ActiveVideoState {
  isOpen: boolean;
  videoSrc?: string;
  posterSrc: string;
  title: string;
  subtitle?: string;
  quote?: string;
  author?: string;
}

export default function App() {
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [bookVisitOpen, setBookVisitOpen] = useState<boolean>(false);
  const [videoModal, setVideoModal] = useState<ActiveVideoState>({
    isOpen: false,
    posterSrc: '',
    title: ''
  });

  const closeVideo = () => {
    setVideoModal((prev) => ({ ...prev, isOpen: false }));
  };

  const handleOpenHeroVideo = () => {
    setVideoModal({
      isOpen: true,
      videoSrc: '/videos/hero-school.mp4',
      posterSrc: '/src/assets/images/hero_school_campus_1790399923439.jpg',
      title: 'The WonderNest Story: Every Day Begins With a Question',
      subtitle: '4K Campus Life & Documentary Reel (03:45)',
      quote: 'Every day begins with a question. What will we discover today?',
      author: 'WonderNest Philosophy'
    });
  };

  const handleOpenZoneVideo = (zone: CampusZone) => {
    setVideoModal({
      isOpen: true,
      videoSrc: `/videos/${zone.id}.mp4`,
      posterSrc: zone.poster,
      title: zone.videoTitle,
      subtitle: `${zone.name} · Lead: ${zone.teacherLead}`,
      quote: zone.quote,
      author: zone.teacherLead
    });
  };

  const handleOpenDayVideo = (item: DayTimelineItem) => {
    setVideoModal({
      isOpen: true,
      videoSrc: '/videos/day-journey.mp4',
      posterSrc: item.poster,
      title: item.videoTitle,
      subtitle: `${item.time} — ${item.location}`,
      quote: item.reflection,
      author: 'A Day in Their World'
    });
  };

  const handleOpenActivityVideo = (activity: ActivityItem) => {
    setVideoModal({
      isOpen: true,
      videoSrc: `/videos/${activity.id}.mp4`,
      posterSrc: activity.poster,
      title: `Inside the Studio: ${activity.title}`,
      subtitle: `${activity.category} · ${activity.duration}`,
      quote: activity.expandedQuote,
      author: activity.quoteAuthor
    });
  };

  const handleOpenTeacherVideo = (teacher: TeacherProfile) => {
    setVideoModal({
      isOpen: true,
      videoSrc: `/videos/teacher-${teacher.id}.mp4`,
      posterSrc: teacher.photo,
      title: `Educator Profile: ${teacher.name}`,
      subtitle: `${teacher.role} · ${teacher.experience}`,
      quote: teacher.philosophy,
      author: teacher.name
    });
  };

  const handleOpenParentVideo = (story: ParentStory) => {
    setVideoModal({
      isOpen: true,
      videoSrc: `/videos/parent-${story.id}.mp4`,
      posterSrc: story.poster,
      title: `Family Conversation: ${story.parentNames}`,
      subtitle: `${story.childInfo} · ${story.location}`,
      quote: story.headline,
      author: story.parentNames
    });
  };

  const handleOpenVideoWallStory = (story: VideoStory) => {
    setVideoModal({
      isOpen: true,
      videoSrc: `/videos/${story.id}.mp4`,
      posterSrc: story.poster,
      title: story.title,
      subtitle: `${story.category} · ${story.duration}`,
      quote: story.quote,
      author: 'WonderNest Living Archive'
    });
  };

  const handleOpenTourStopVideo = (stop: typeof VIRTUAL_TOUR_STOPS[0]) => {
    setVideoModal({
      isOpen: true,
      videoSrc: `/videos/tour-${stop.id}.mp4`,
      posterSrc: stop.poster,
      title: `Architectural Walkthrough: ${stop.name}`,
      subtitle: `${stop.tag} · ${stop.coords}`,
      quote: stop.description,
      author: `Architecture Spec: ${stop.keyStat}`
    });
  };

  const scrollToCampus = () => {
    const el = document.getElementById('campus-3d');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1E2522]">
      {/* Desktop Custom Interactive Cursor */}
      <CustomCursor />

      {/* Cinematic Opening Fullscreen Sequence */}
      {showIntro && (
        <OpeningExperience onEnter={() => setShowIntro(false)} />
      )}

      {/* Persistent Navigation Bar */}
      <Navbar
        onBookVisit={() => setBookVisitOpen(true)}
        onReopenIntro={() => setShowIntro(true)}
      />

      {/* Main Experiential Flow */}
      <main>
        {/* 1. Hero Section with Large Cinematic Documentary Video Showcase */}
        <HeroSection
          onOpenHeroVideo={handleOpenHeroVideo}
          onExploreCampus={scrollToCampus}
          onBookVisit={() => setBookVisitOpen(true)}
        />

        {/* 2. Interactive 3D School Campus (Miniature Architectural Model in Three.js) */}
        <Campus3DViewer onOpenZoneVideo={handleOpenZoneVideo} />

        {/* 3. Interactive Learning Journey: "A Day in Their World" (08:30–15:30) */}
        <DayInWorld onOpenVideo={handleOpenDayVideo} />

        {/* 4. Clickable Activity Wall: The Hundred Languages */}
        <ActivityWall onSelectActivity={handleOpenActivityVideo} />

        {/* 5. Children's Creative World: "Made by Little Hands" */}
        <ChildrenArtGallery />

        {/* 6. Human-Centered Faculty: "The People Behind Their First Big Questions" */}
        <TeacherSection onOpenTeacherVideo={handleOpenTeacherVideo} />

        {/* 7. Parent Experience: "What Families Notice" */}
        <ParentTestimonials onOpenParentVideo={handleOpenParentVideo} />

        {/* 8. School Life Video Wall (Filterable Documentary Grid) */}
        <SchoolLifeVideoWall onOpenVideo={handleOpenVideoWallStory} />

        {/* 9. Virtual School Tour: "Walk Through WonderNest" */}
        <VirtualTour onOpenTourVideo={handleOpenTourStopVideo} />

        {/* 10. Admission Experience: "Come See Where Their Story Begins" */}
        <AdmissionCta
          onBookVisit={() => setBookVisitOpen(true)}
          onExploreCampus={scrollToCampus}
        />
      </main>

      {/* Minimalist Premium Footer */}
      <Footer
        onBookVisit={() => setBookVisitOpen(true)}
        onExploreCampus={scrollToCampus}
      />

      {/* Interactive Cinematic Video Player Modal */}
      <InteractiveVideoModal
        isOpen={videoModal.isOpen}
        onClose={closeVideo}
        videoSrc={videoModal.videoSrc}
        posterSrc={videoModal.posterSrc}
        title={videoModal.title}
        subtitle={videoModal.subtitle}
        quote={videoModal.quote}
        author={videoModal.author}
      />

      {/* Book Visit Appointment Interface Modal */}
      <BookVisitModal
        isOpen={bookVisitOpen}
        onClose={() => setBookVisitOpen(false)}
      />
    </div>
  );
}
