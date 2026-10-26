import React from 'react';
import { Mail } from 'lucide-react';
import ContactForm from '../components/sections/contact/ContactForm';
import ContactInfo from '../components/sections/contact/ContactInfo';

export default function ContactPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12 sm:space-y-16">
      {/* Editorial Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-widest text-[#C4704A] bg-[#C4704A]/10 border border-[#C4704A]/25">
          <Mail className="w-3.5 h-3.5 text-[#C4704A]" />
          <span>DIRECT OUTREACH &bull; COLLABORATION</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-text-primary tracking-tight">
          Let's talk.
        </h1>

        <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-sans">
          Available for software engineering roles, full-stack development, and technical problem-solving. Send a message or reach out directly.
        </p>
      </div>

      {/* Two-Column Form & Direct Channels Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <div className="lg:col-span-5 order-2 lg:order-1">
          <ContactInfo />
        </div>
        <div className="lg:col-span-7 order-1 lg:order-2">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
