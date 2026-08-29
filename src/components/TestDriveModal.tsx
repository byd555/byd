import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import './TestDriveModal.css';

export default function TestDriveModal({ modelName, onClose }) {
  const [form, setForm] = useState({
    name: '',
    contact: '',
    booking_date: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: err } = await supabase.from('test_drives').insert([
      {
        model_name: modelName,
        name: form.name,
        contact: form.contact,
        booking_date: form.booking_date
      }
    ]);

    setLoading(false);
    if (err) {
      setError(err.message);
    } else {
      setSuccess(true);
    }
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <button className="modal-close" onClick={onClose}>✕</button>
        <h2>Book a Test Drive</h2>
        <p className="modal-subtitle">Experience the {modelName} firsthand at our stand.</p>

        {success ? (
          <div className="modal-success">
            <p>🎉 Your test drive request has been received! Our team will reach out to confirm your appointment.</p>
            <button className="btn-primary" onClick={onClose} style={{ marginTop: '20px', width: '100%' }}>Done</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="modal-form">
            <div className="input-group">
              <input
                type="text"
                id="td-name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                placeholder=" "
              />
              <label htmlFor="td-name">Full Name</label>
            </div>

            <div className="input-group">
              <input
                type="text"
                id="td-contact"
                value={form.contact}
                onChange={(e) => setForm({ ...form, contact: e.target.value })}
                required
                placeholder=" "
              />
              <label htmlFor="td-contact">Phone Number or Email</label>
            </div>

            <div className="input-group">
              <input
                type="date"
                id="td-date"
                value={form.booking_date}
                onChange={(e) => setForm({ ...form, booking_date: e.target.value })}
                required
              />
            </div>

            {error && <p className="admin-form__error" style={{ color: '#f87171' }}>{error}</p>}

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Submitting...' : 'Confirm Booking'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}