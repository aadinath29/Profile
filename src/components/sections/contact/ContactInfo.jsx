import React from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, ExternalLink } from 'lucide-react';
import { developer } from '../../../data/developer';

export default function ContactInfo() {
  return (
    <div className="p-8 sm:p-10 rounded-2xl border border-border bg-surface/50 backdrop-blur-sm space-y-8 flex flex-col justify-between">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-text-primary">
            Direct contact
          </h2>
          <p className="text-sm text-text-secondary">
            Open to software engineering roles, full-stack development, and technical problem-solving discussions.
          </p>
        </div>

        {/* Direct Channels */}
        <div className="space-y-4">
          <a
            href={`mailto:${developer.email}`}
            className="min-h-[48px] p-4 rounded-xl border border-border bg-surface hover:border-[#C4704A] transition-colors flex items-center gap-4 group overflow-hidden"
          >
            <div className="w-10 h-10 shrink-0 rounded-lg bg-[#C4704A]/10 border border-[#C4704A]/20 flex items-center justify-center text-[#C4704A]">
              <Mail className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1 overflow-hidden">
              <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted block">Direct Email</span>
              <span className="text-sm font-sans font-medium text-text-primary group-hover:text-[#C4704A] transition-colors break-all block">
                {developer.email}
              </span>
            </div>
          </a>

          <a
            href={`tel:${developer.phone}`}
            className="min-h-[48px] p-4 rounded-xl border border-border bg-surface hover:border-[#C4704A] transition-colors flex items-center gap-4 group overflow-hidden"
          >
            <div className="w-10 h-10 shrink-0 rounded-lg bg-[#C4704A]/10 border border-[#C4704A]/20 flex items-center justify-center text-[#C4704A]">
              <Phone className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1 overflow-hidden">
              <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted block">Phone (IST)</span>
              <span className="text-sm font-sans font-medium text-text-primary group-hover:text-[#C4704A] transition-colors break-words block">
                {developer.phone}
              </span>
            </div>
          </a>

          <div className="min-h-[48px] p-4 rounded-xl border border-border bg-surface flex items-center gap-4 overflow-hidden">
            <div className="w-10 h-10 shrink-0 rounded-lg bg-surface-subtle border border-border flex items-center justify-center text-text-muted">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1 overflow-hidden">
              <span className="text-[10px] font-mono uppercase tracking-widest text-text-muted block">Location Base</span>
              <span className="text-sm font-sans font-medium text-text-primary break-words block">
                {developer.location} (UTC+5:30)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Social Profiles Grid */}
      <div className="pt-6 border-t border-border space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-text-muted block">
          Social Profiles
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a
            href={developer.github}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] px-4 py-3 rounded-xl border border-border bg-surface hover:border-[#C4704A] text-xs font-mono text-text-primary hover:text-[#C4704A] transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-text-muted" />
          </a>

          <a
            href={developer.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] px-4 py-3 rounded-xl border border-border bg-surface hover:border-[#C4704A] text-xs font-mono text-text-primary hover:text-[#C4704A] transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-text-muted" />
          </a>
        </div>
      </div>
    </div>
  );
}
