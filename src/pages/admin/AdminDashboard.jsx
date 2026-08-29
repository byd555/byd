import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient.js';
import { useAuth } from '../../context/AuthContext.jsx';
import './Admin.css';

const EMPTY_FORM = {
  id: null,
  name: '',
  capacity: '',
  battery_capacity: '',
  features: '',
  price: '',
  image_url: '',
  range: '',
  acceleration: '',
  drivetrain: ''
};

export default function AdminDashboard() {
  const { signOut, user } = useAuth();
  const [models, setModels] = useState([]);
  const [messages, setMessages] = useState([]);
  const [testDrives, setTestDrives] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const isEditing = form.id !== null;

  useEffect(() => {
    loadAllData();
  }, []);

  async function loadAllData() {
    setLoading(true);
    await Promise.all([loadModels(), loadMessages(), loadTestDrives()]);
    setLoading(false);
  }

  async function loadModels() {
    const { data } = await supabase.from('models').select('*').order('created_at', { ascending: false });
    setModels(data || []);
  }

  async function loadMessages() {
    const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
    setMessages(data || []);
  }

  async function loadTestDrives() {
    const { data } = await supabase.from('test_drives').select('*').order('created_at', { ascending: false });
    setTestDrives(data || []);
  }

  function handleChange(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function startEdit(model) {
    setForm({
      id: model.id,
      name: model.name || '',
      capacity: model.capacity || '',
      battery_capacity: model.battery_capacity || '',
      features: model.features || '',
      price: model.price ?? '',
      image_url: model.image_url || '',
      range: model.range || '',
      acceleration: model.acceleration || '',
      drivetrain: model.drivetrain || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function resetForm() {
    setForm(EMPTY_FORM);
  }

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage.from('car-images').upload(fileName, file);
    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from('car-images').getPublicUrl(fileName);
    handleChange('image_url', data.publicUrl);
    setUploading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      name: form.name,
      capacity: form.capacity,
      battery_capacity: form.battery_capacity,
      features: form.features,
      price: form.price === '' ? null : Number(form.price),
      image_url: form.image_url,
      range: form.range,
      acceleration: form.acceleration,
      drivetrain: form.drivetrain
    };

    const { error } = isEditing
      ? await supabase.from('models').update(payload).eq('id', form.id)
      : await supabase.from('models').insert(payload);

    setSaving(false);
    if (error) {
      setError(error.message);
      return;
    }

    resetForm();
    loadModels();
  }

  async function handleDeleteModel(id) {
    if (!window.confirm('Delete this model?')) return;
    await supabase.from('models').delete().eq('id', id);
    loadModels();
  }

  async function handleDeleteMessage(id) {
    if (!window.confirm('Delete this message?')) return;
    await supabase.from('messages').delete().eq('id', id);
    loadMessages();
  }

  async function handleDeleteTestDrive(id) {
    if (!window.confirm('Delete this appointment?')) return;
    await supabase.from('test_drives').delete().eq('id', id);
    loadTestDrives();
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-bg" />
      <div className="admin-dashboard-overlay" />

      <div className="admin-dashboard-content">
        {/* Header */}
        <header className="admin-dashboard__header container">
          <div>
            <h1>Admin Dashboard</h1>
            <p className="admin-user-email">Signed in as {user?.email}</p>
          </div>
          <button className="admin-dashboard__signout" onClick={signOut}>Log Out</button>
        </header>

        {/* Analytics & Quick Stats Strip */}
        <section className="container" style={{ marginBottom: '40px' }}>
          <div className="admin-stats-strip">
            <div className="admin-stat-card">
              <span className="stat-number">{models.length}</span>
              <span className="stat-label">Active Models</span>
            </div>
            <div className="admin-stat-card">
              <span className="stat-number">{messages.length}</span>
              <span className="stat-label">Customer Inquiries</span>
            </div>
            <div className="admin-stat-card">
              <span className="stat-number">{testDrives.length}</span>
              <span className="stat-label">Test Drive Bookings</span>
            </div>
          </div>
        </section>

        {/* 1. Vehicle Form Section */}
        <section className="admin-dashboard__form-section container">
          <div className="admin-card">
            <h2>{isEditing ? 'Edit Vehicle Model' : 'Add New Vehicle Model'}</h2>
            <form className="admin-form" onSubmit={handleSubmit}>
              
              <div className="admin-form-row">
                <label className="input-group">
                  <input value={form.name} onChange={(e) => handleChange('name', e.target.value)} required placeholder=" " />
                  <span>Vehicle Name</span>
                </label>
                <label className="input-group">
                  <input value={form.capacity} onChange={(e) => handleChange('capacity', e.target.value)} placeholder=" " />
                  <span>Capacity (e.g. 5 Seater)</span>
                </label>
              </div>

              <div className="admin-form-row">
                <label className="input-group">
                  <input value={form.battery_capacity} onChange={(e) => handleChange('battery_capacity', e.target.value)} placeholder=" " />
                  <span>Battery Capacity (e.g. 71.7 kWh)</span>
                </label>
                <label className="input-group">
                  <input type="number" value={form.price} onChange={(e) => handleChange('price', e.target.value)} placeholder=" " />
                  <span>Price (₦)</span>
                </label>
              </div>

              <div className="admin-form-row">
                <label className="input-group">
                  <input value={form.range} onChange={(e) => handleChange('range', e.target.value)} placeholder=" " />
                  <span>Range (e.g. 500 km)</span>
                </label>
                <label className="input-group">
                  <input value={form.acceleration} onChange={(e) => handleChange('acceleration', e.target.value)} placeholder=" " />
                  <span>0-100 km/h (e.g. 3.8s)</span>
                </label>
              </div>

              <div className="admin-form-row">
                <label className="input-group">
                  <input value={form.drivetrain} onChange={(e) => handleChange('drivetrain', e.target.value)} placeholder=" " />
                  <span>Drivetrain (e.g. AWD / e⁴)</span>
                </label>
              </div>

              <label className="input-group textarea-group">
                <textarea value={form.features} onChange={(e) => handleChange('features', e.target.value)} rows={3} placeholder=" " />
                <span>Description / Key Highlights</span>
              </label>

              <div className="admin-upload-area">
                <label className="admin-file-label">
                  <span>{uploading ? 'Uploading photo…' : 'Upload Car Photo'}</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} />
                </label>
                {form.image_url && !uploading && (
                  <div className="admin-form__preview" style={{ backgroundImage: `url(${form.image_url})` }} />
                )}
              </div>

              {error && <p className="admin-form__error">{error}</p>}

              <div className="admin-form__actions">
                <button type="submit" className="admin-btn-primary" disabled={saving || uploading}>
                  {saving ? 'Saving…' : isEditing ? 'Save Changes' : 'Add Model'}
                </button>
                {isEditing && (
                  <button type="button" className="admin-form__cancel" onClick={resetForm}>Cancel</button>
                )}
              </div>
            </form>
          </div>
        </section>

        {/* 2. Test Drive Bookings Management Table */}
        <section className="admin-dashboard__list container" style={{ marginBottom: '60px' }}>
          <h2>Test Drive Appointments</h2>
          {loading && <p className="admin-status-text">Loading appointments...</p>}
          {!loading && testDrives.length === 0 && <p className="admin-status-text">No test drive requests yet.</p>}

          <div className="admin-table">
            {testDrives.map((td) => (
              <div key={td.id} className="admin-table__row">
                <div className="admin-table__info" style={{ flex: 1 }}>
                  <strong style={{ fontSize: '1.05rem', color: '#38bdf8' }}>{td.model_name}</strong>
                  <span>Client: <strong>{td.name}</strong> ({td.contact})</span>
                  <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Requested Date: {td.booking_date}</span>
                </div>
                <div className="admin-table__actions">
                  <button className="admin-btn-delete" onClick={() => handleDeleteTestDrive(td.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Customer Messages Table */}
        <section className="admin-dashboard__list container" style={{ marginBottom: '60px' }}>
          <h2>Customer Inquiries</h2>
          {!loading && messages.length === 0 && <p className="admin-status-text">No customer messages yet.</p>}

          <div className="admin-table">
            {messages.map((msg) => (
              <div key={msg.id} className="admin-table__row">
                <div className="admin-table__info" style={{ flex: 1 }}>
                  <strong style={{ fontSize: '1.05rem' }}>{msg.name}</strong>
                  <span style={{ color: '#38bdf8' }}>Contact: {msg.contact}</span>
                  <p style={{ color: '#d1d5db', fontSize: '0.9rem', marginTop: '6px' }}>{msg.message}</p>
                </div>
                <div className="admin-table__actions">
                  <button className="admin-btn-delete" onClick={() => handleDeleteMessage(msg.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Current Inventory List */}
        <section className="admin-dashboard__list container">
          <h2>Current Inventory</h2>
          {!loading && models.length === 0 && <p className="admin-status-text">No inventory found.</p>}

          <div className="admin-table">
            {models.map((model) => (
              <div key={model.id} className="admin-table__row">
                <div className="admin-table__thumb" style={{ backgroundImage: model.image_url ? `url(${model.image_url})` : 'none' }} />
                <div className="admin-table__info">
                  <strong>{model.name}</strong>
                  <span>{model.capacity || 'Standard'} {model.price && `· ₦${Number(model.price).toLocaleString()}`}</span>
                </div>
                <div className="admin-table__actions">
                  <button className="admin-btn-edit" onClick={() => startEdit(model)}>Edit</button>
                  <button className="admin-btn-delete" onClick={() => handleDeleteModel(model.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}