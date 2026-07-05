import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { TopNavBar } from './components/TopNavBar';
import { ThreeCanvas } from './components/ThreeCanvas';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { SkillsVisualizer } from './components/SkillsVisualizer';
import { ArrowRight, ArrowUp, Linkedin, Mail, FileText, X, Download, ZoomIn, ZoomOut } from 'lucide-react';
import { motion } from 'motion/react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const RESUME_URL = `${import.meta.env.BASE_URL}resume.pdf`;

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pdfWidth, setPdfWidth] = useState<number>(800);
  const [pdfScale, setPdfScale] = useState<number>(1);

  useEffect(() => {
    if (isResumeOpen) {
      document.body.style.overflow = 'hidden';
      setPdfScale(1);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isResumeOpen]);

  useEffect(() => {
    const updateWidth = () => {
      setPdfWidth(Math.min(window.innerWidth - 16, 800));
    };
    if (isResumeOpen) {
      updateWidth();
      window.addEventListener('resize', updateWidth);
      return () => window.removeEventListener('resize', updateWidth);
    }
  }, [isResumeOpen]);

  useEffect(() => {
    const updateWidth = () => {
      setPdfWidth(Math.min(window.innerWidth - 64, 800));
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const handleScrollToWork = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('work');
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative min-h-screen bg-background font-sans text-on-surface antialiased overflow-x-hidden selection:bg-cyan-200">
      
      {/* 1. Global Navigation Bar */}
      <TopNavBar isHidden={isResumeOpen} onOpenResume={() => setIsResumeOpen(true)} />

      {/* 2. Main Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-start pt-32 pb-16 px-6 sm:px-12 lg:px-20 overflow-hidden">
        
        {/* Background 3D glass interactive canvas */}
        <ThreeCanvas />

        {/* Hero Copywriting Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-start select-none pointer-events-none">
          <motion.div 
            className="max-w-4xl flex flex-col items-start"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1 
              className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-on-surface leading-tight tracking-tighter mb-6 drop-shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              Mahesh Manikanta <br />
              Kambhampati
            </motion.h1>

            <motion.p 
              className="font-sans text-lg sm:text-xl text-on-surface-variant max-w-2xl leading-relaxed mb-12 font-light pointer-events-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              Proactive Security Analyst with hands-on experience detecting and mitigating cybersecurity threats across endpoints, networks, and cloud environments using SIEM, EDR, MDR, and DLP platforms.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 pointer-events-auto relative mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              <div className="relative inline-flex group">
                <div className="absolute inset-0 rounded-full border border-cyan-400 dark:border-cyan-500 animate-wave-ring opacity-0 pointer-events-none"></div>
                <div className="absolute inset-0 rounded-full border border-cyan-400 dark:border-cyan-500 animate-wave-ring-delayed-1 opacity-0 pointer-events-none"></div>
                <div className="absolute inset-0 rounded-full border border-cyan-400 dark:border-cyan-500 animate-wave-ring-delayed-2 opacity-0 pointer-events-none"></div>
                <button
                  onClick={handleScrollToWork}
                  className="relative z-10 btn-gradient text-white px-10 py-5 rounded-full font-semibold text-base shadow-[0_0_20px_rgba(14,165,233,0.5)] hover:scale-105 hover:shadow-[0_0_30px_rgba(14,165,233,0.7)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cyan-500/50"
                >
                  Explore Work 
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>

      </section>

      {/* 4. Experience Timeline Section */}
      <ExperienceTimeline />

      {/* 5. Skills Grid Section */}
      <SkillsVisualizer />

      {isResumeOpen && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-6 lg:p-8">
          <div 
            className="absolute inset-0 bg-black/40" 
            onClick={() => setIsResumeOpen(false)}
          />
          <div className="relative w-full max-w-5xl h-[100dvh] sm:h-full max-h-[100dvh] sm:max-h-[90vh] glass-panel bg-white sm:bg-white/95 dark:bg-gray-950 dark:sm:bg-gray-950/90 rounded-none sm:rounded-[2rem] flex flex-col overflow-hidden shadow-2xl ring-1 ring-slate-200 dark:ring-white/10 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-white/10">
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-on-surface">Resume</h3>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-white/5 rounded-full p-1 mr-2 hidden sm:flex">
                  <button 
                    onClick={() => setPdfScale(s => Math.max(0.5, s - 0.2))}
                    className="p-1.5 text-on-surface-variant hover:text-on-surface hover:bg-white/10 rounded-full transition-colors shadow-sm"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-medium px-2 min-w-[3rem] text-center dark:text-white">{Math.round(pdfScale * 100)}%</span>
                  <button 
                    onClick={() => setPdfScale(s => Math.min(3, s + 0.2))}
                    className="p-1.5 text-on-surface-variant hover:text-on-surface hover:bg-white/10 rounded-full transition-colors shadow-sm"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </div>
                <button 
                  onClick={async () => {
                    try {
                      const response = await fetch(RESUME_URL);
                      const blob = await response.blob();
                      const blobUrl = URL.createObjectURL(blob);
                      const link = document.createElement('a');
                      link.href = blobUrl;
                      link.download = 'resume.pdf';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      URL.revokeObjectURL(blobUrl);
                    } catch (error) {
                      console.error('Download failed', error);
                      window.open(RESUME_URL, '_blank');
                    }
                  }}
                  className="flex items-center gap-0 sm:gap-2 p-2 sm:px-4 sm:py-2 text-sm font-medium text-white bg-cyan-600 rounded-xl hover:bg-cyan-700 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Download</span>
                </button>
                <button 
                  onClick={() => setIsResumeOpen(false)}
                  className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-white/5 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 w-full bg-slate-50/50 dark:bg-black/30 overflow-auto rounded-none sm:rounded-b-[2rem] p-4 flex flex-col items-center">
              <div className="min-w-fit flex flex-col items-center justify-center w-full">
                <Document
                  file={RESUME_URL}
                  onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                  loading={<div className="p-12 text-on-surface-variant animate-pulse font-medium">Loading Document...</div>}
                  error={
                    <div className="flex flex-col items-center justify-center h-full text-center p-8">
                      <p className="text-on-surface-variant mb-4">Could not load the PDF.</p>
                      <button 
                        onClick={async () => {
                          try {
                            const response = await fetch(RESUME_URL);
                            const blob = await response.blob();
                            const blobUrl = URL.createObjectURL(blob);
                            const link = document.createElement('a');
                            link.href = blobUrl;
                            link.download = 'resume.pdf';
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                            URL.revokeObjectURL(blobUrl);
                          } catch (error) {
                            window.open(RESUME_URL, '_blank');
                          }
                        }}
                        className="px-6 py-2 bg-cyan-600 text-white rounded-xl font-medium hover:bg-cyan-700 transition-colors cursor-pointer"
                      >
                        Download Resume
                      </button>
                    </div>
                  }
                >
                  {Array.from(new Array(numPages || 0), (el, index) => (
                    <div key={`page_${index + 1}`} className="mb-6 shadow-xl rounded-sm overflow-hidden flex justify-center bg-white dark:bg-gray-800 border border-slate-200 dark:border-white/10" style={{ width: 'max-content', margin: '0 auto 1.5rem auto' }}>
                      <Page 
                        pageNumber={index + 1}
                        width={pdfWidth}
                        scale={pdfScale}
                        renderTextLayer={true}
                        renderAnnotationLayer={true}
                      />
                    </div>
                  ))}
                </Document>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* 8. Global Professional Footer */}
      <footer className="py-6 bg-slate-100 dark:bg-black text-slate-900 dark:text-white relative transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500 dark:text-neutral-400">
          
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="font-light">© Mahesh Manikanta Kambhampati.</p>
          </div>

          <div className="flex gap-4 items-center">
            <button onClick={() => setIsResumeOpen(true)} className="relative group p-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:bg-cyan-400/5 dark:hover:bg-cyan-400/10 dark:text-cyan-400 transition-all hover:scale-105 cursor-pointer" aria-label="Resume">
              <FileText className="w-5 h-5" strokeWidth={1.5} />
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium text-[10px] px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg whitespace-nowrap">Resume</span>
            </button>
            <a href="mailto:maheshmanikantakambhampati@gmail.com" className="relative group p-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:bg-cyan-400/5 dark:hover:bg-cyan-400/10 dark:text-cyan-400 transition-all hover:scale-105" aria-label="Email">
              <Mail className="w-5 h-5" strokeWidth={1.5} />
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium text-[10px] px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg whitespace-nowrap">Email</span>
            </a>
            <a href="https://www.linkedin.com/in/manikambhampati" target="_blank" rel="noreferrer" className="relative group p-2 rounded-xl bg-[#0a66c2]/10 hover:bg-[#0a66c2]/20 text-[#0a66c2] dark:bg-white/5 dark:hover:bg-white/10 dark:text-[#70b5f9] transition-all hover:scale-105" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" fill="currentColor" strokeWidth={1.5} />
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium text-[10px] px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg whitespace-nowrap">LinkedIn</span>
            </a>
            <button 
              onClick={handleScrollToTop}
              className="relative group p-2 rounded-full bg-slate-200 hover:bg-slate-300 dark:bg-white/10 dark:hover:bg-white/20 text-slate-900 dark:text-white transition-colors cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium text-[10px] px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg whitespace-nowrap">Scroll to Top</span>
            </button>
          </div>

        </div>
      </footer>
    </div>
  );
}
