import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

// IMPORTANT: Replace these with your real EmailJS credentials from https://emailjs.com
const SERVICE_ID = 'YOUR_SERVICE_ID';
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const isValidEmail = (email) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Client-side validation (T1-F25-02, T2-F25-01, T2-F25-03)
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please complete all required fields before sending.');
      return;
    }

    if (!isValidEmail(formData.email.trim())) {
      setStatus('error');
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    setStatus('submitting');

    try {
      // Dual-key payload mapping supporting both user_* and direct keys (T1-F25-03, T4-JOURNEY-04)
      const templateParams = {
        user_name: formData.name.trim(),
        user_email: formData.email.trim(),
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.slice(0, 2000).trim(), // 2000 char clamp (T2-F25-02)
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

      // Form reset on success (T2-F25-05, T4-JOURNEY-04)
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('[ContactForm] EmailJS submission failure:', err);
      // Persistent error recovery state (T1-F25-05, T2-F25-04)
      setStatus('error');
      setErrorMessage('Network transmission failed. Please try again or email directly at aadinathbmagar75@gmail.com');
    }
  };

  return (
    <div className="p-8 sm:p-10 rounded-2xl border border-border bg-surface/50 backdrop-blur-sm space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-text-primary">
          Send a message
        </h2>
        <p className="text-sm text-text-secondary">
          Have a role, project, or question? Leave a note below.
        </p>
      </div>

      {status === 'success' && (
        <div className="p-5 rounded-xl bg-[#C4704A]/10 border border-[#C4704A]/30 text-[#C4704A] space-y-2">
          <div className="flex items-center gap-2 font-semibold">
            <CheckCircle2 className="w-5 h-5 text-[#C4704A]" />
            <span>Message sent</span>
          </div>
          <p className="text-xs text-text-secondary">
            Thanks for reaching out. I'll get back to you soon.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="text-xs font-mono text-[#C4704A] underline hover:text-[#A85C38] pt-2 block"
          >
            Send another message
          </button>
        </div>
      )}

      {status === 'error' && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p className="text-xs leading-relaxed">{errorMessage}</p>
        </div>
      )}

      {status !== 'success' && (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="user_name" className="block text-sm font-sans font-medium text-text-primary mb-1.5">
              Your Name *
            </label>
            <input
              id="user_name"
              name="user_name"
              type="text"
              required
              data-cursor="hidden"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Sarah Connor"
              className="w-full min-h-[48px] px-4 py-3 rounded-lg bg-surface border border-border text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:border-[#C4704A] focus:ring-1 focus:ring-[#C4704A]/30 transition-colors font-sans text-sm"
            />
          </div>

          <div>
            <label htmlFor="user_email" className="block text-sm font-sans font-medium text-text-primary mb-1.5">
              Your Email *
            </label>
            <input
              id="user_email"
              name="user_email"
              type="email"
              required
              data-cursor="hidden"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="e.g. sarah@startup.io"
              className="w-full min-h-[48px] px-4 py-3 rounded-lg bg-surface border border-border text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:border-[#C4704A] focus:ring-1 focus:ring-[#C4704A]/30 transition-colors font-sans text-sm"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor="message" className="block text-sm font-sans font-medium text-text-primary">
                Message Content *
              </label>
              <span className="text-[10px] font-mono text-text-muted">
                {formData.message.length} / 2000
              </span>
            </div>
            <textarea
              id="message"
              name="message"
              rows="5"
              required
              maxLength={2000}
              data-cursor="hidden"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Briefly describe your project or role requirements..."
              className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:border-[#C4704A] focus:ring-1 focus:ring-[#C4704A]/30 transition-colors font-sans text-sm resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full min-h-[48px] px-6 py-3.5 rounded-lg bg-[#C4704A] text-white font-medium text-sm flex items-center justify-center gap-2 hover:bg-[#A85C38] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Transmitting...</span>
              </>
            ) : (
              <>
                <span>Send message</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
