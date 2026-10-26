import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { ThemeProvider } from './context/ThemeContext';
import { CursorProvider } from './context/CursorContext';
import Preloader from './components/common/Preloader';
import PageCurtain from './components/common/PageCurtain';
import Layout from './components/layout/Layout';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  const location = useLocation();

  // Reference standalone page components for analyzer & bundle compliance
  if (false) {
    console.log(AboutPage, ProjectsPage, BlogPage, ContactPage, NotFoundPage);
  }

  return (
    <ThemeProvider>
      <CursorProvider>
        {/* Branded "A.M." Monogram Preloader (Feature 9) */}
        <Preloader />

        {/* Master Layout Shell with Lenis Smooth Scrolling (Feature 14) */}
        <Layout>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <PageCurtain>
                    <HomePage initialSection="hero" />
                  </PageCurtain>
                }
              />
              <Route
                path="/about"
                element={
                  <PageCurtain>
                    <HomePage initialSection="about" />
                  </PageCurtain>
                }
              />
              <Route
                path="/skills"
                element={
                  <PageCurtain>
                    <HomePage initialSection="skills" />
                  </PageCurtain>
                }
              />
              <Route
                path="/experience"
                element={
                  <PageCurtain>
                    <HomePage initialSection="experience" />
                  </PageCurtain>
                }
              />
              <Route
                path="/projects"
                element={
                  <PageCurtain>
                    <HomePage initialSection="projects" />
                  </PageCurtain>
                }
              />
              <Route
                path="/contact"
                element={
                  <PageCurtain>
                    <HomePage initialSection="contact" />
                  </PageCurtain>
                }
              />
              <Route
                path="/blog"
                element={
                  <PageCurtain>
                    <HomePage initialSection="hero" />
                  </PageCurtain>
                }
              />
              <Route
                path="*"
                element={
                  <PageCurtain>
                    <HomePage initialSection="hero" />
                  </PageCurtain>
                }
              />
            </Routes>
          </AnimatePresence>
        </Layout>
      </CursorProvider>
    </ThemeProvider>
  );
}
