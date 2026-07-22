'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

// Netlify Forms contact form. The hidden twin in public/__forms.html is
// what Netlify's build-time crawler registers; this component POSTs the
// urlencoded submission to that static path (works on the Next runtime).
export default function ContactForm() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('sending');
    try {
      const body = new URLSearchParams(new FormData(form)).toString();
      const res = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div className="card" style={{ padding: '30px 32px', maxWidth: 560 }}>
        <p className="mono" style={{ fontSize: 11, letterSpacing: '0.18em', color: 'var(--accent)', marginBottom: 10 }}>
          — Signal received —
        </p>
        <p style={{ fontSize: 15.5, color: 'var(--text-dim)', lineHeight: 1.6 }}>
          Thanks for reaching out — I&apos;ll get back to you within a day.
        </p>
      </div>
    );
  }

  return (
    <form name="contact" action="/__forms.html" method="POST" onSubmit={onSubmit} className="cform" style={{ maxWidth: 560 }}>
      <input type="hidden" name="form-name" value="contact" />
      <p style={{ display: 'none' }} aria-hidden="true">
        <label>Don&apos;t fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" /></label>
      </p>
      <div className="cform-row">
        <label>
          <span>Name</span>
          <input type="text" name="name" required placeholder="Your name" autoComplete="name" />
        </label>
        <label>
          <span>Email</span>
          <input type="email" name="email" required placeholder="you@company.com" autoComplete="email" />
        </label>
      </div>
      <label>
        <span>Company / role — optional</span>
        <input type="text" name="company" placeholder="Acme Corp · Tech Recruiter" autoComplete="organization" />
      </label>
      <label>
        <span>Message</span>
        <textarea name="message" required rows={4} placeholder="We'd like to talk to you about…" />
      </label>
      <button type="submit" disabled={status === 'sending'} data-cursor="press">
        <Send size={14} /> {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
      {status === 'error' && (
        <p className="mono" style={{ fontSize: 10.5, color: 'var(--danger)', marginTop: 4 }}>
          {typeof window !== 'undefined' && window.location.hostname === 'localhost'
            ? 'Local preview — the form only submits on the live Netlify site.'
            : 'Something broke — email me instead: jaskiratsingh314276@gmail.com'}
        </p>
      )}
    </form>
  );
}
