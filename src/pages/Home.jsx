import React, { useState, useEffect, useRef } from 'react';
import TestDriveModal from '../components/TestDriveModal';
import './Home.css';

export default function Home() {
  const [activePanel, setActivePanel] = useState(null);
  const [testDriveCar, setTestDriveCar] = useState(null);
  
  // 1. Create a reference for the video
  const videoRef = useRef(null);

  // 2. Force mute and play on mount to bypass browser autoplay blocks
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch((error) => {
        console.log("Autoplay was prevented by the browser:", error);
      });
    }
  }, []);

  const togglePanel = (panelName) => {
    setActivePanel(activePanel === panelName ? null : panelName);
  };

  return (
    <div className="home-container">
      {/* 1. Hero Section */}
      <section className="screen-section">
        {/* 3. Attach the ref to the video element */}
        <video 
          ref={videoRef}
          className="home-bg-video" 
          src="/assets/videos/hero-loop2.mp4"
          autoPlay 
          muted 
          loop 
          playsInline
        />
        <div className="overlay overlay-dark"></div>
        <div className="content-center content-top">
          <h1 className="title-large">BYD SONG PLUS DM-i</h1>
          <p className="subtitle">New Generation of Plug-in Hybrid SUV</p>
        </div>
      </section>

      {/* 2. Specs Section */}
      <section className="screen-section bg-specs">
        <div className="overlay overlay-light"></div>
        
        <div className="specs-bar">
          <div className="spec-item border-right">
            <h3>Up to 1000km</h3>
            <p>Combined Range (FWD)</p>
          </div>
          <div className="spec-item border-right">
            <h3>4.5L/100km</h3>
            <p>FWD</p>
          </div>
          <div className="spec-item border-right">
            <h3>Ocean X Face</h3>
            <p>Stylish design</p>
          </div>
          <div className="spec-item">
            <h3>DM-i</h3>
            <p>Self-developed super hybrid system</p>
          </div>
        </div>
      </section>

      {/* 3. Ocean Aesthetics */}
      <section className="screen-section bg-aesthetics">
        <div className="overlay overlay-light"></div>
        <div className="content-center content-top">
          <h2 className="title-medium">All New Ocean Aesthetics</h2>
          <p className="subtitle-long">
            BYD SONG PLUS is inspired by the ocean aesthetic design concept, each distinctive exterior detail makes your adventures styled.
          </p>
        </div>
        
        <div className="plus-action" onClick={() => togglePanel('aesthetics')}>
          <button className={`plus-btn ${activePanel === 'aesthetics' ? 'plus-btn--active' : ''}`}>+</button>
          <span className="plus-label">Learn more</span>
        </div>
      </section>

      {/* 3.5 Sliding Panel: Aesthetics */}
      <div className={`slide-panel ${activePanel === 'aesthetics' ? 'slide-panel--open' : ''}`}>
        <div className="sticky-close-wrapper">
          <button className="sticky-close" onClick={() => togglePanel('aesthetics')}>✕</button>
        </div>
        <div className="panel-content container">
          <div className="panel-row">
            <div className="panel-img-box">
              <img src="/assets/images/screenshot-3-aesthetics.jpg" alt="Ocean X Face" className="panel-img" />
            </div>
            <div className="panel-text-box">
              <h3>OCEAN X FACE</h3>
              <p>All new ocean aesthetics designed front face enhance recognition and raise features of high-tech.</p>
            </div>
          </div>
          <div className="panel-row reverse-row">
            <div className="panel-img-box">
              <img src="/assets/images/screenshot-2-specs.jpg" alt="Glistening Combination Headlights" className="panel-img" />
            </div>
            <div className="panel-text-box">
              <h3>Glistening Combination Headlights</h3>
              <p>Double U-shaped suspension headlights with built-in crystal texture light belts bring a chic and efficient look at first sight. With auto-on lights setting, BYD SONG PLUS would light up your journey.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Spacious Interior */}
      <section className="screen-section bg-interior">
        <div className="overlay overlay-light"></div>
        <div className="content-center content-top">
          <h2 className="title-medium">Spacious Interior</h2>
          <p className="subtitle-long">
            Dive into elegance with a thoughtful and ocean-styled cabin.
          </p>
        </div>

        <div className="plus-action" onClick={() => togglePanel('interior')}>
          <button className={`plus-btn ${activePanel === 'interior' ? 'plus-btn--active' : ''}`}>+</button>
          <span className="plus-label">Learn more</span>
        </div>
      </section>

      {/* 4.5 Sliding Panel: Interior */}
      <div className={`slide-panel ${activePanel === 'interior' ? 'slide-panel--open' : ''}`}>
        <div className="sticky-close-wrapper">
          <button className="sticky-close" onClick={() => togglePanel('interior')}>✕</button>
        </div>
        <div className="panel-content container">
          <div className="panel-row">
            <div className="panel-img-box">
              <img src="/assets/images/screenshot-4-interior.jpg" alt="Heart of Ocean Control Center" className="panel-img" />
            </div>
            <div className="panel-text-box">
              <h3>All New “Heart of Ocean” Styled Control Center</h3>
              <p>A simple and BYD classic design style with an optimized button layout makes the control more convenient.</p>
            </div>
          </div>
          <div className="panel-row reverse-row">
            <div className="panel-img-box">
              <img src="/assets/images/screenshot-7-cta.jpg" alt="Luxury of Quiet Space" className="panel-img" />
            </div>
            <div className="panel-text-box">
              <h3>The Luxury of Quiet Space</h3>
              <p>Utilize quality sound-proof front windshield to reduce noise, and improve the acoustic performance of the vehicle.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Ultra Safe Journey */}
      <section className="screen-section bg-safety">
        <div className="overlay overlay-light"></div>
        <div className="content-center content-top">
          <h2 className="title-medium">Ultra Safe Journey</h2>
          <p className="subtitle-long">
            Advanced driving technology for ultimate safety.
          </p>
        </div>

        <div className="plus-action" onClick={() => togglePanel('safety')}>
          <button className={`plus-btn ${activePanel === 'safety' ? 'plus-btn--active' : ''}`}>+</button>
          <span className="plus-label">Learn more</span>
        </div>
      </section>

      {/* 5.5 Sliding Panel: Safety */}
      <div className={`slide-panel ${activePanel === 'safety' ? 'slide-panel--open' : ''}`}>
        <div className="sticky-close-wrapper">
          <button className="sticky-close" onClick={() => togglePanel('safety')}>✕</button>
        </div>
        <div className="panel-content container">
          <div className="panel-row reverse-row">
            <div className="panel-img-box">
              <img src="/assets/images/screenshot-5-safety.jpg" alt="Intelligent Driving System" className="panel-img" />
            </div>
            <div className="panel-text-box">
              <h3>BYD Intelligent Driving System</h3>
              <p>Erase your worries in your every journey with its smart driving assistance.</p>
            </div>
          </div>
          <div className="panel-row">
            <div className="panel-img-box">
              <img src="/assets/images/screenshot-6-tech.jpg" alt="HD Panoramic Image" className="panel-img" />
            </div>
            <div className="panel-text-box">
              <h3>HD Panoramic Image</h3>
              <p>360° panoramic view eliminates blind spots, so that you can see the situation around the car clearly at a glance.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Smart Technology */}
      <section className="screen-section bg-tech">
        <div className="overlay overlay-light"></div>
        <div className="content-center content-top">
          <h2 className="title-medium uppercase">SMART TECHNOLOGY</h2>
          <p className="subtitle-long">
            Explore your ideal journey with intelligence. Discover more possibilities in life.
          </p>
        </div>

        <div className="plus-action" onClick={() => togglePanel('tech')}>
          <button className={`plus-btn ${activePanel === 'tech' ? 'plus-btn--active' : ''}`}>+</button>
          <span className="plus-label">Learn more</span>
        </div>
      </section>

      {/* 6.5 Sliding Panel: Tech */}
      <div className={`slide-panel ${activePanel === 'tech' ? 'slide-panel--open' : ''}`}>
        <div className="sticky-close-wrapper">
          <button className="sticky-close" onClick={() => togglePanel('tech')}>✕</button>
        </div>
        <div className="panel-content container">
          <div className="panel-row">
            g" alt="Intelligent Cockpit System" className="panel-img" />
            </div>
            <div className="panel-text-box">
              <h3>BYD Intelligent Cockpit System</h3>
              <p>The BYD SONG PLUS features an advanced intelligent cockpit system, seamlessly connecting people, vehicles, and everyday life through Android Auto and Apple CarPlay. Enjoy smooth, intuitive interaction, smart voice control, and access to your favorite apps — all powered by your smartphone.</p>
            </div>
          </div>
          <div className="panel-row reverse-row">
            <div className="panel-img-box">
              <img src="/assets/images/screenshot-6-tech.jpg" alt="Vehicle-To-Load Power Station" className="panel-img" />
            </div>
            <div className="panel-text-box">
              <h3>Vehicle-To-Load Mobile Power Station</h3>
              <p>To supply your power needs in different outdoor scenarios, such as camping or other emergencies.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 7. Bottom CTA Section */}
      <section className="screen-section bg-cta">
        <div className="overlay overlay-dark-left"></div>
        <div className="content-left content-middle">
          <h1 className="title-large uppercase mb-8">BYD SONG PLUS DM-i</h1>
          <button className="btn-outline" onClick={() => setTestDriveCar('BYD SONG PLUS DM-i')}>
            TEST DRIVE
          </button>
        </div>
      </section>

      {/* Interactive Test Drive Modal Trigger */}
      {testDriveCar && (
        <TestDriveModal modelName={testDriveCar} onClose={() => setTestDriveCar(null)} />
      )}
    </div>
  );
}