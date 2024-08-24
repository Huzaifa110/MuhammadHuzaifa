import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';
import Navbar from '../components/Navbar';
import WorkExperience from '../components/WorkExperience';
import EducationSection from '../components/EducationSection';
import SkillsSection from '../components/SkillSection';
import ProjectSection from '../components/ProjectSection';
import CertificationsSection from '../components/CertificationsSection';
import FooterSection from '../components/FooterSection';
import ScrollToTopButton from '../components/ScrollTopButton';

const Home = () => {

  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const handleNavbarToggle = (isOpen) => {
    setIsNavbarOpen(isOpen);
  };

  return (
    <div>
      <Navbar onToggle={handleNavbarToggle} />
      <HeroSection isNavbarOpen={isNavbarOpen} />
      <WorkExperience />
      <EducationSection className="mr-5 flex-1" />
      <SkillsSection className="ml-5 flex-1" />
      <ProjectSection />
      <CertificationsSection />
      <FooterSection />
      <ScrollToTopButton />
    </div>
  );
}

export default Home;
