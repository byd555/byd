import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import TestDriveModal from '../components/TestDriveModal';
import './Models.css';

export default function Models() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCar, setExpandedCar] = useState(null);
  
  // Comparison State
  const [comparedIds, setComparedIds] = useState([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  // Test Drive Modal State
  const [testDriveCar, setTestDriveCar] = useState(null);

  useEffect(() => {
    fetchCars();
  }, []);

  async function fetchCars() {
    try {
      const { data, error } = await supabase.from('models').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setCars(data || []);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  const toggleExpand = (id) => {
    setExpandedCar(expandedCar === id ? null : id);
  };

  const handleCompareToggle = (id) => {
    if (comparedIds.includes(id)) {
      setComparedIds(comparedIds.filter(item => item !== id));
    } else {
      if (comparedIds.length >= 2) {
        alert("You can compare a maximum of 2 cars at a time.");
        return;
      }
      setComparedIds([...comparedIds, id]);
    }
  };

  const comparedCars = cars.filter(c => comparedIds.includes(c.id));

  return (
    <div className="models-page">
      {/* Hero Section */}
      <section className="models-hero">
        <div className="models-hero-bg" />
        <div className="models-hero-overlay" />
        <div className="models-hero-content container">
          <p className="models-kicker">DISCOVER THE RANGE</p>
          <h1 className="models-title">BYD LINEUP</h1>
          <p className="models-subtitle">Pioneering electric vehicles and super hybrids engineered for precision and elegance.</p>
        </div>
      </section>

      {/* Floating Compare Action Bar */}
      {comparedIds.length > 0 && (
        <div className="compare-floating-bar">
          <span>Comparing {comparedIds.length}/2 cars</span>
          <button className="btn-compare-action" onClick={() => setShowCompareModal(true)} disabled={comparedIds.length < 2}>
            {comparedIds.length < 2 ? 'Select 1 more to compare' : 'View Comparison'}
          </button>
          <button className="btn-clear-compare" onClick={() => setComparedIds([])}>Clear</button>
        </div>
      )}

      {/* Grid Section */}
      <main className="models-grid-section container">
        {loading ? (
          <div className="models-loading">Loading vehicles...</div>
        ) : cars.length === 0 ? (
          <div className="models-loading">No vehicle models available in inventory yet. Check back soon!</div>
        ) : (
          <div className="models-grid">
            {cars.map((car) => {
              const isSelected = comparedIds.includes(car.id);
              return (
                <div key={car.id} className="model-card">
                  
                  {/* Top Image Area with Compare Checkbox */}
                  <div className="model-img-box">
                    <img src={car.image_url || '/assets/images/screenshot-1-hero.jpg'} alt={car.name} className="model-img" />
                    <label className="compare-checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={isSelected} 
                        onChange={() => handleCompareToggle(car.id)} 
                      />
                      <span>Compare</span>
                    </label>
                  </div>

                  {/* Card Main Info */}
                  <div className="model-info">
                    <p className="model-type">{car.capacity || 'Standard Edition'}</p>
                    <h2 className="model-name">{car.name}</h2>
                    <p className="model-price">{car.price ? `$${Number(car.price).toLocaleString()}` : 'Price on Request'}</p>
                    
                    <button 
                      className={`btn-learn-more ${expandedCar === car.id ? 'active' : ''}`}
                      onClick={() => toggleExpand(car.id)}
                    >
                      {expandedCar === car.id ? 'Close Details' : 'Learn More'}
                    </button>
                  </div>

                  {/* Expandable Drawer */}
                  <div className={`model-drawer ${expandedCar === car.id ? 'model-drawer--open' : ''}`}>
                    <div className="model-drawer-inner">
                      <p className="model-desc">{car.features || 'Equipped with cutting-edge BYD engineering, intelligent cockpit features, and advanced safety standards.'}</p>
                      
                      <div className="model-specs-grid">
                        <div className="model-spec">
                          <span className="spec-label">Battery</span>
                          <span className="spec-value">{car.battery_capacity || 'N/A'}</span>
                        </div>
                        <div className="model-spec">
                          <span className="spec-label">Range</span>
                          <span className="spec-value">{car.range || 'Standard'}</span>
                        </div>
                        <div className="model-spec">
                          <span className="spec-label">0-100 km/h</span>
                          <span className="spec-value">{car.acceleration || 'N/A'}</span>
                        </div>
                        <div className="model-spec">
                          <span className="spec-label">Drivetrain</span>
                          <span className="spec-value">{car.drivetrain || 'AWD / FWD'}</span>
                        </div>
                      </div>

                      <button className="btn-test-drive" onClick={() => setTestDriveCar(car.name)}>
                        Book Test Drive
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Side-by-Side Comparison Modal */}
      {showCompareModal && (
        <div className="modal-backdrop">
          <div className="modal-card compare-modal-card">
            <button className="modal-close" onClick={() => setShowCompareModal(false)}>✕</button>
            <h2>Vehicle Comparison</h2>
            
            <div className="compare-table-grid">
              {comparedCars.map((car) => (
                <div key={car.id} className="compare-col">
                  <img src={car.image_url} alt={car.name} className="compare-thumb" />
                  <h3>{car.name}</h3>
                  <p className="compare-price">{car.price ? `${Number(car.price).toLocaleString()}` : 'N/A'}</p>
                  <ul className="compare-specs-list">
                    <li><span>Capacity:</span> {car.capacity || 'N/A'}</li>
                    <li><span>Battery:</span> {car.battery_capacity || 'N/A'}</li>
                    <li><span>Range:</span> {car.range || 'N/A'}</li>
                    <li><span>0-100:</span> {car.acceleration || 'N/A'}</li>
                    <li><span>Drivetrain:</span> {car.drivetrain || 'N/A'}</li>
                  </ul>
                </div>
              ))}
            </div>
            
            <button className="btn-primary" onClick={() => setShowCompareModal(false)} style={{ marginTop: '24px', width: '100%' }}>
              Close Comparison
            </button>
          </div>
        </div>
      )}

      {/* Test Drive Booking Modal */}
      {testDriveCar && (
        <TestDriveModal modelName={testDriveCar} onClose={() => setTestDriveCar(null)} />
      )}
    </div>
  );
}