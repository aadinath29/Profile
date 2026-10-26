// TODO: Replace with real testimonials
import React from 'react';
import { Quote, Building2, UserCheck } from 'lucide-react';
import { testimonials } from '../../../data/developer';
import SectionHeading from '../../ui/SectionHeading';
import MarqueeTicker from '../../ui/MarqueeTicker';

function TestimonialCard({ testimonial }) {
  return (
    <div
      className="w-[320px] sm:w-[380px] max-w-[85vw] p-6 rounded-2xl border border-border bg-surface/40 backdrop-blur-sm shadow-sm hover:border-accent-cyan/40 transition-all duration-300 flex flex-col justify-between space-y-4"
    >
      <div className="space-y-3">
        {/* Quote Icon & Placeholder Indicator */}
        <div className="flex items-center justify-between text-accent-cyan">
          <Quote className="w-5 h-5 opacity-70" />
          <span className="text-[10px] font-mono tracking-wider uppercase text-text-muted px-2 py-0.5 rounded-full border border-border bg-surface/50">
            Endorsement Preview
          </span>
        </div>

        {/* Verbatim Recommendation Quote */}
        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans italic break-words">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </div>

      {/* Attribution Details */}
      <div className="pt-3 border-t border-border/40 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan shrink-0">
          <UserCheck className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <div className="text-xs font-semibold text-text-primary truncate">
            {testimonial.author}
          </div>
          <div className="text-[11px] text-text-muted truncate">
            {testimonial.role}
          </div>
          <div className="text-[11px] font-mono text-accent-gold flex items-center gap-1 truncate">
            <Building2 className="w-3 h-3 shrink-0" />
            <span className="truncate">{testimonial.company}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      data-testid="testimonials-section"
      className="w-full space-y-10 sm:space-y-14 overflow-hidden"
    >
      {/* Section Heading */}
      <SectionHeading
        eyebrow="REPUTATION & ENDORSEMENTS"
        title="Colleague Testimonials"
        subtitle="Feedback from project managers, technical leads, and academic faculty reflecting dedication to engineering quality."
      />

      {/* Dual-Row Opposing Marquee */}
      <div className="space-y-6">
        {/* Row 1: Leftward Translation */}
        <MarqueeTicker
          items={testimonials}
          speed={32}
          direction="left"
          pauseOnHover={true}
          renderItem={(item, idx) => (
            <TestimonialCard key={`row1-${item.id || idx}`} testimonial={item} />
          )}
        />

        {/* Row 2: Rightward Translation (Reverse) */}
        <MarqueeTicker
          items={testimonials}
          speed={38}
          direction="right"
          pauseOnHover={true}
          renderItem={(item, idx) => (
            <TestimonialCard key={`row2-${item.id || idx}`} testimonial={item} />
          )}
        />
      </div>
    </section>
  );
}
