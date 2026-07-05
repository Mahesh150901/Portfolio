import React from 'react';
import { EXPERIENCES } from '../data';
import { Calendar, Building, CircleDot } from 'lucide-react';
import { motion } from 'motion/react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  }
};

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="work" className="pt-12 pb-12 relative overflow-hidden bg-slate-50/50 dark:bg-black/30 backdrop-blur-sm border-y border-slate-200 dark:border-white/10 px-6 sm:px-12 lg:px-20">
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-accent-peach/10 rounded-full blur-3xl -z-10" />
      
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant/70 mb-3">
            Professional Experience
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-on-surface tracking-tight mb-6">
            Securing digital infrastructure
          </h2>
          <div className="h-1.5 w-20 btn-gradient rounded-full" />
        </div>

        {/* Timeline Layout */}
        <motion.div 
          className="relative max-w-4xl mx-auto pl-6 md:pl-8 border-l border-slate-200 dark:border-white/10 space-y-16 py-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          
          {EXPERIENCES.map((exp, index) => (
            <motion.div key={exp.id} className="relative group" variants={itemVariants}>
              
              {/* Vertical timeline connector dot */}
              <div className="absolute -left-[36px] md:-left-[44px] top-1.5 bg-white dark:bg-black p-1 rounded-full border-2 border-slate-200 dark:border-white/10 group-hover:border-cyan-400 group-hover:scale-110 transition-all duration-300">
                <CircleDot className="w-3 h-3 text-slate-400 dark:text-on-surface group-hover:text-cyan-500 transition-colors" />
              </div>

              {/* Experience Card */}
              <div className="glass-panel glass-panel-hover rounded-[1.5rem] p-6 md:p-8">
                
                {/* Header Meta Info */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    {exp.logo ? (
                      <img src={exp.logo} alt={`${exp.company} logo`} className="w-12 h-12 md:w-16 md:h-16 rounded-xl object-contain bg-slate-50 dark:bg-white/10 p-1 border border-slate-200 dark:border-white/10" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center border border-slate-200 dark:border-white/10">
                        <Building className="w-4 h-4 md:w-5 md:h-5 text-cyan-500" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-display text-lg md:text-xl lg:text-2xl font-bold text-on-surface tracking-tight">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 mt-1.5 text-xs text-on-surface-variant font-medium">
                        <span>{exp.company}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono text-on-surface-variant/90 w-fit">
                    <Calendar className="w-3.5 h-3.5 text-accent-peach" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-white/10">
                  {exp.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[10px] font-mono uppercase text-on-surface-variant/95 shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

              </div>
            </motion.div>
          ))}

        </motion.div>

      </div>
    </section>
  );
};
