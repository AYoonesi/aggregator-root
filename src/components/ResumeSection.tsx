import React from 'react';
import { PERSONAL_INFO, EXPERIENCES, EDUCATION, CERTIFICATIONS, FIDIBO_STREAK } from '../data/resume';
import { Briefcase, GraduationCap, Award, BookOpen, Flame, MapPin, Mail, ExternalLink, CheckCircle2 } from 'lucide-react';

export const ResumeSection: React.FC = () => {
  return (
    <div className="w-full space-y-12">
      {/* Overview & Core Skills */}
      <section className="space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-stone-400 border-b border-stone-200/60 pb-2">
          Profile & Focus
        </h2>
        <div className="bg-stone-100/60 rounded-lg p-5 border border-stone-200/60 space-y-3">
          <p className="text-sm text-stone-700 leading-relaxed font-light">
            {PERSONAL_INFO.bio}
          </p>
          <div className="pt-2 flex flex-wrap gap-2">
            {PERSONAL_INFO.skills.map((skill, idx) => (
              <span
                key={idx}
                className="text-xs px-2.5 py-1 rounded bg-white border border-stone-200 text-stone-800 font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b border-stone-200/60 pb-2">
          <Briefcase className="w-4 h-4 text-stone-500" />
          <h2 className="text-xs font-bold uppercase tracking-widest text-stone-500">
            Professional Experience
          </h2>
        </div>

        <div className="space-y-6 divide-y divide-stone-200/50">
          {EXPERIENCES.map((exp, index) => (
            <div key={index} className={index > 0 ? 'pt-6' : ''}>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <h3 className="text-base font-semibold text-stone-900">
                  {exp.organization}
                </h3>
                <span className="text-xs font-mono text-stone-500">{exp.period}</span>
              </div>
              <p className="text-xs font-medium text-stone-700 mt-0.5">{exp.role}</p>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed font-light">
                {exp.description}
              </p>
              {exp.details && (
                <p className="text-xs text-stone-500 italic mt-1 font-light">
                  • {exp.details}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b border-stone-200/60 pb-2">
          <GraduationCap className="w-4 h-4 text-stone-500" />
          <h2 className="text-xs font-bold uppercase tracking-widest text-stone-500">
            Education
          </h2>
        </div>

        <div className="space-y-6 divide-y divide-stone-200/50">
          {EDUCATION.map((edu, index) => (
            <div key={index} className={index > 0 ? 'pt-6' : ''}>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <h3 className="text-base font-semibold text-stone-900">
                  {edu.institution}
                </h3>
                <span className="text-xs font-mono text-stone-500">{edu.period}</span>
              </div>
              <p className="text-xs font-medium text-stone-700 mt-0.5">Focus: {edu.focus}</p>
              <ul className="mt-2 space-y-1 text-xs text-stone-600 font-light list-disc list-inside">
                {edu.details.map((detail, dIdx) => (
                  <li key={dIdx} className="leading-relaxed">
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b border-stone-200/60 pb-2">
          <Award className="w-4 h-4 text-stone-500" />
          <h2 className="text-xs font-bold uppercase tracking-widest text-stone-500">
            Selected Certifications & Specializations
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CERTIFICATIONS.map((group, idx) => (
            <div key={idx} className="bg-white p-4 rounded border border-stone-200/80 space-y-2">
              <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                {group.category}
              </h3>
              <ul className="space-y-1.5 text-xs text-stone-600">
                {group.items.map((item, iIdx) => (
                  <li key={iIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                    <span>{item.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Reading Streak Highlight */}
      <section className="bg-stone-900 text-stone-100 rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-medium">
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>Fidibo Reading Habit</span>
          </div>
          <h3 className="text-xl font-semibold">
            {FIDIBO_STREAK.streakDays} Consecutive Days Reading Streak
          </h3>
          <p className="text-xs text-stone-400 max-w-lg font-light">
            Dedicated lifetime learner. Over {FIDIBO_STREAK.booksReadCount} titles opened & studied across literature, philosophy, legal jurisprudence, and science.
          </p>
        </div>

        <div className="text-center sm:text-right shrink-0">
          <span className="block text-4xl font-bold font-mono text-amber-400">
            {FIDIBO_STREAK.streakDays}
          </span>
          <span className="text-[11px] text-stone-400 uppercase tracking-wider">
            Days Streak
          </span>
        </div>
      </section>
    </div>
  );
};
