import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { SKILL_CATEGORIES, CERTIFICATIONS } from '../data';
import { Certification } from '../types';
import { motion } from 'motion/react';
import { 
  Cpu, Palette, Radio, Orbit, LineChart, 
  Atom, Code2, Sparkles, Terminal, Activity, 
  Server, Network, Cloud, Box, GitBranch,
  ShieldAlert, ShieldCheck, Radar, Search, Bug, FileSearch, Code, Globe, Lock, CheckSquare, FileText, Award, Download, X, ZoomIn, ZoomOut
} from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

// Safe Lucide icon resolver mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Cpu, Palette, Radio, Orbit, LineChart, 
  Atom, Code2, Sparkles, Terminal, Activity, 
  Server, Network, Cloud, Box, GitBranch,
  ShieldAlert, ShieldCheck, Radar, Search, Bug, FileSearch, Code, Globe, Lock, CheckSquare, FileText, Award, Download
};

const CoinRotatableImage: React.FC<{ src: string; alt: string; className?: string; onSpinComplete?: () => void }> = ({ src, alt, className, onSpinComplete }) => {
  const [isSpinning, setIsSpinning] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSpinning) return;
    setIsSpinning(true);
    setTimeout(() => {
      setIsSpinning(false);
      if (onSpinComplete) onSpinComplete();
    }, 2000);
  };

  return (
    <motion.img 
      src={src} 
      alt={alt}
      className={className}
      onClick={handleClick}
      animate={isSpinning ? { rotateY: [0, 360] } : { rotateY: 0 }}
      transition={{ duration: 2, ease: "easeInOut" }}
      style={{ transformStyle: 'preserve-3d' }}
    />
  );
};

export const CertificationsDeck: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pdfWidth, setPdfWidth] = useState<number>(600);
  const [pdfScale, setPdfScale] = useState<number>(1);

  // Reset scale when cert changes
  useEffect(() => {
    if (selectedCert) {
      setPdfScale(1);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedCert]);

  useEffect(() => {
    const updateWidth = () => {
      setPdfWidth(Math.min(window.innerWidth - 16, 800));
    };
    if (selectedCert) {
      updateWidth();
      window.addEventListener('resize', updateWidth);
      return () => window.removeEventListener('resize', updateWidth);
    }
  }, [selectedCert]);

  return (
    <div className="mt-32">
      <div className="mb-16 text-left">
        <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant/70 mb-3">
          Qualifications
        </p>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface tracking-tight mb-6">
          Certifications & Awards
        </h2>
        <div className="h-1.5 w-20 btn-gradient rounded-full" />
      </div>

      <div className="flex justify-center pb-12 pt-8 lg:flex lg:flex-nowrap lg:items-center lg:gap-12">
        {CERTIFICATIONS.map((cert, index) => {
          const rotate = index % 2 === 0 ? 1 : -1;
          
          return (
            <motion.div
              key={cert.id}
              className={`relative flex-none w-[40%] md:w-[28%] lg:w-60 aspect-[4/5] rounded-2xl lg:rounded-[2rem] shadow-xl flex flex-col justify-between overflow-hidden cursor-pointer ${index !== 0 ? '-ml-[20%] md:-ml-[12%] lg:ml-0' : ''}`}
              initial={{ rotate: rotate * 0.5 }}
              animate={{ rotate: rotate * 0.5 }}
              whileHover={{
                scale: 1.05,
                y: -10,
                rotate: 0,
                zIndex: 50
              }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              <div className={`absolute inset-0 border border-slate-200 dark:border-white/20 rounded-2xl md:rounded-[2rem] overflow-hidden`}>
                {cert.image ? (
                  <div className="absolute inset-0 z-0 flex items-center justify-center bg-white/50 dark:bg-gray-900/50">
                    <CoinRotatableImage 
                      src={cert.image} 
                      alt={cert.name}
                      className="w-full h-full object-cover cursor-pointer"
                      onSpinComplete={() => setSelectedCert(cert)}
                    />
                  </div>
                ) : (
                  <>
                    <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} z-0`}></div>
                    <div className="relative z-10 p-4 md:p-8 h-full flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <span className="text-[8px] md:text-[10px] font-mono font-bold uppercase tracking-widest bg-white/30 text-white/90 px-2 md:px-3 py-1 md:py-1.5 rounded-full border border-white/30 backdrop-blur-sm shadow-sm">
                          Certified
                        </span>
                      </div>
                      <div>
                        <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/80 mb-1 md:mb-2 drop-shadow-sm line-clamp-1">
                          {cert.issuer}
                        </p>
                        <h3 className="font-display font-bold text-sm md:text-xl lg:text-2xl text-white leading-tight drop-shadow-md line-clamp-3 md:line-clamp-none">
                          {cert.name}
                        </h3>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
      {/* Certificate Modal */}
      {selectedCert && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-6 lg:p-8">
          <div 
            className="absolute inset-0 bg-black/40" 
            onClick={() => setSelectedCert(null)}
          />
          <div className="relative w-full max-w-5xl h-[100dvh] sm:h-full max-h-[100dvh] sm:max-h-[90vh] glass-panel bg-white sm:bg-white/95 dark:bg-gray-950 dark:sm:bg-gray-950/90 rounded-none sm:rounded-[2rem] flex flex-col overflow-hidden shadow-2xl ring-1 ring-slate-200 dark:ring-white/10 animate-in zoom-in-95 duration-500">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-white/10">
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-on-surface">Certificate Details</h3>
              <div className="flex items-center gap-2 md:gap-3">
                {selectedCert.documentUrl && (
                  <div className="flex items-center gap-1 bg-slate-100 dark:bg-white/5 rounded-full p-1 mr-2">
                    <button 
                      onClick={() => setPdfScale(s => Math.max(0.5, s - 0.2))}
                      className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-white dark:text-on-surface-variant dark:hover:text-on-surface dark:hover:bg-white/10 rounded-full transition-colors shadow-sm"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-medium px-2 min-w-[3rem] text-center text-slate-700 dark:text-white">{Math.round(pdfScale * 100)}%</span>
                    <button 
                      onClick={() => setPdfScale(s => Math.min(3, s + 0.2))}
                      className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-white dark:text-on-surface-variant dark:hover:text-on-surface dark:hover:bg-white/10 rounded-full transition-colors shadow-sm"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                  </div>
                )}
                {(selectedCert.documentUrl || selectedCert.image) && (
                  <button 
                    onClick={async () => {
                      const url = selectedCert.documentUrl || selectedCert.image;
                      if (!url) return;
                      try {
                        const response = await fetch(url);
                        const blob = await response.blob();
                        const blobUrl = URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = blobUrl;
                        link.download = `${selectedCert.name.replace(/\s+/g, '-')}-Certificate${selectedCert.documentUrl ? '.pdf' : '.png'}`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        URL.revokeObjectURL(blobUrl);
                      } catch (error) {
                        console.error('Download failed', error);
                        window.open(url, '_blank');
                      }
                    }}
                    className="flex items-center gap-0 sm:gap-2 p-2 sm:px-4 sm:py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-full sm:rounded-xl text-sm transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Download</span>
                  </button>
                )}
                <button 
                  onClick={() => setSelectedCert(null)}
                  className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-on-surface-variant dark:hover:text-on-surface dark:hover:bg-white/5 rounded-xl transition-colors"
                  title="Close Modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="flex-1 w-full bg-slate-50 dark:bg-black/30 overflow-auto rounded-none sm:rounded-b-[2rem] p-4 md:p-8 flex flex-col items-center">
              <div className="min-w-fit min-h-[40vh] flex flex-col items-center justify-center">
                {selectedCert.documentUrl ? (
                  <Document
                    file={selectedCert.documentUrl}
                    onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                    loading={<div className="p-12 text-slate-500 dark:text-on-surface-variant animate-pulse font-medium">Loading Document...</div>}
                    error={
                      <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-white dark:bg-gray-900 w-full rounded-xl border border-slate-200 dark:border-white/10">
                        <p className="text-slate-500 dark:text-on-surface-variant mb-4">Could not load the PDF.</p>
                        <button 
                          onClick={async () => {
                            if (!selectedCert.documentUrl) return;
                            try {
                              const response = await fetch(selectedCert.documentUrl);
                              const blob = await response.blob();
                              const blobUrl = URL.createObjectURL(blob);
                              const link = document.createElement('a');
                              link.href = blobUrl;
                              link.download = `${selectedCert.name.replace(/\s+/g, '-')}-Certificate.pdf`;
                              document.body.appendChild(link);
                              link.click();
                              document.body.removeChild(link);
                              URL.revokeObjectURL(blobUrl);
                            } catch (error) {
                              window.open(selectedCert.documentUrl, '_blank');
                            }
                          }}
                          className="px-6 py-2 bg-cyan-600 text-white rounded-xl font-medium hover:bg-cyan-700 transition-colors cursor-pointer"
                        >
                          Download Certificate
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
                ) : selectedCert.image ? (
                  <div className="bg-white dark:bg-gray-800 border border-slate-200 dark:border-white/10 p-4 rounded-xl shadow-xl w-full flex justify-center">
                    <img src={selectedCert.image} alt={selectedCert.name} className="w-full h-auto max-w-3xl object-contain max-h-[70vh]" />
                  </div>
                ) : (
                  <div className={`w-full h-full min-h-[50vh] bg-gradient-to-br ${selectedCert.color} rounded-xl shadow-xl`} />
                )}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export const SkillsVisualizer: React.FC = () => {
  return (
    <section id="skills" className="pt-12 pb-12 relative overflow-hidden px-6 sm:px-12 lg:px-20">
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-accent-cyan/5 rounded-full blur-3xl -z-10" />
      
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant/70 mb-3">
            Core Competencies
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface tracking-tight mb-6">
            Comprehensive security toolset
          </h2>
          <div className="h-1.5 w-20 btn-gradient rounded-full" />
        </div>

        {/* Categories Grid layout */}
        <motion.div 
          className="flex flex-col md:flex-row md:justify-center md:items-stretch gap-6 md:gap-8 w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
        >
          
          {SKILL_CATEGORIES.map((category) => (
            <motion.div 
              key={category.category}
              className="glass-panel rounded-[2rem] p-6 md:p-8 flex flex-col justify-between h-full w-full md:flex-1 md:max-w-[32%]"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80 } }
              }}
            >
              <div>
                <h3 className="font-display text-2xl font-bold text-on-surface tracking-tight mb-6">
                  {category.category}
                </h3>
              </div>

              {/* Skills Items list */}
              <div className="space-y-6">
                {category.items.map((skill) => {
                  const IconComponent = iconMap[skill.icon] || Code2;
                  
                  return (
                    <div key={skill.name} className="group">
                      
                      {/* Name indicator */}
                      <div className="flex items-center gap-2 text-sm font-semibold text-on-surface mb-2">
                        <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-cyan-600 dark:text-cyan-500 group-hover:scale-110 transition-transform">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <span>{skill.name}</span>
                      </div>

                    </div>
                  );
                })}
              </div>

            </motion.div>
          ))}

        </motion.div>

        {/* Certifications Deck */}
        <CertificationsDeck />

      </div>
    </section>
  );
};
