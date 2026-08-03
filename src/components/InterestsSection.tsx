import React from 'react';
import { PROJECTS_AND_INTERESTS } from '../data/resume';
import { BookOpen, Cpu, Sprout, Terminal, LineChart, Film, Sparkles } from 'lucide-react';

export const InterestsSection: React.FC = () => {
  const getIcon = (index: number) => {
    switch (index) {
      case 0:
        return <BookOpen className="w-4 h-4 text-stone-700" />;
      case 1:
        return <Sparkles className="w-4 h-4 text-stone-700" />;
      case 2:
        return <Terminal className="w-4 h-4 text-stone-700" />;
      case 3:
        return <LineChart className="w-4 h-4 text-stone-700" />;
      case 4:
        return <Sprout className="w-4 h-4 text-stone-700" />;
      case 5:
        return <Film className="w-4 h-4 text-stone-700" />;
      default:
        return <Cpu className="w-4 h-4 text-stone-700" />;
    }
  };

  return (
    <div className="w-full space-y-8">
      <div className="border-b border-stone-200/60 pb-3">
        <h2 className="text-xs font-bold uppercase tracking-widest text-stone-500">
          Projects & Cross-Disciplinary Endeavors
        </h2>
        <p className="text-xs text-stone-500 mt-1 font-light">
          Exploring the convergence of German Idealism, legal tech, Python automation, agriculture, macroeconomics, and classical literature.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROJECTS_AND_INTERESTS.map((project, idx) => (
          <div
            key={idx}
            className="p-5 rounded-lg bg-white border border-stone-200/80 shadow-2xs space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded bg-stone-100 border border-stone-200/60">
                  {getIcon(idx)}
                </div>
                <h3 className="text-sm font-semibold text-stone-900">
                  {project.title}
                </h3>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed font-light">
                {project.description}
              </p>
            </div>

            {project.tags && (
              <div className="pt-3 border-t border-stone-100 flex flex-wrap gap-1.5">
                {project.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-100 text-stone-600 border border-stone-200/50"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
