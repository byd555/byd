import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import './Contact.css';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    name: '',
    contact: '',
    message: ''
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: insertError } = await supabase
      .from('messages')
      .insert([
        { 
          name: form.name, 
          contact: form.contact, 
          message: form.message 
        }
      ]);

    setLoading(false);

    if (insertError) {
      setError('Failed to send message. Please try again.');
      console.error(insertError);
    } else {
      setSubmitted(true);
    }
  }

  return (
    <div className="contact-page">
      {/* Cinematic Background */}
      <div className="contact-bg" />
      <div className="contact-overlay" />

      <div className="contact-content">
        <section className="contact-hero">
          <h1 className="contact-title">Visit Our Stand</h1>
          <p className="contact-subtitle">Experience the new generation of BYD vehicles in person.</p>
        </section>

        <section className="contact-grid">
          {/* Left Column: Details & Map */}
          <div className="contact-panel">
            <h2 className="panel-title">Get In Touch</h2>

            <div className="contact-info-grid">
              <div className="contact-block">
                <span className="contact-label">Address</span>
                <p>Canada</p>
              </div>

              <div className="contact-block">
                <span className="contact-label">Phone</span>
                <p><a href="tel:+234000000000" className="contact-link">+1 (0) 000 000 0000</a></p>
              </div>

              <div className="contact-block">
                <span className="contact-label">Hours</span>
                <p>Mon–Sat, 8:00am–6:00pm</p>
              </div>

              <div className="contact-block">
                <span className="contact-label">WhatsApp</span>
                <p><a href="https://wa.me/000000000000" className="contact-link" target="_blank" rel="noreferrer">Chat with us on WhatsApp</a></p>
              </div>
            </div>

            <div className="contact-map">
              <iframe
                title="Location map"
                src="https://www.google.com/maps?q=Canada&output=embed"
                width="100%"
                height="240"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column: Glassmorphism Form */}
          <div className="contact-panel">
            <h2 className="panel-title">Send a Message</h2>
            
            {submitted ? (
              <div className="contact-success">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <p>Thanks — we've received your message and will get back to you shortly.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="input-group">
                  <input 
                    type="text" 
                    id="name" 
                    value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                    required 
                    placeholder=" " 
                  />
                  <label htmlFor="name">Name</label>
                </div>
                
                <div className="input-group">
                  <input 
                    type="text" 
                    id="contact" 
                    value={form.contact}
                    onChange={(e) => setForm({...form, contact: e.target.value})}
                    required 
                    placeholder=" " 
                  />
                  <label htmlFor="contact">Phone or Email</label>
                </div>
                
                <div className="input-group">
                  <textarea 
                    id="message" 
                    rows={5} 
                    value={form.message}
                    onChange={(e) => setForm({...form, message: e.target.value})}
                    required 
                    placeholder=" "
                  ></textarea>
                  <label htmlFor="message">Message</label>
                </div>

                {error && <p style={{ color: '#f87171', fontSize: '0.85rem' }}>{error}</p>}
                
                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}