import React, { useState } from 'react';
import './About.css';

const PLATFORM_TABS = [
  {
    id: 'yisifang',
    label: 'Yisifang Platform (also known as the e⁴ platform)',
    title: 'Yisifang Platform (e⁴ Platform)',
    body: 'The first mass-produced four-motor independent drive technology in China, providing ultimate safety and vehicle agility through four-wheel independent torque vectoring.',
    points: [
      'Four-motor independent drive control.',
      'Emergency flotation capability on water.'
    ],
    image: '/assets/images/about-tab-yisifang.jpg'
  },
  {
    id: 'dmo',
    label: 'The Dual Mode Off-road (DMO) Super Hybrid Platform',
    title: 'The Dual Mode Off-road (DMO) Super Hybrid Platform',
    body: 'The DMO platform is BYD’s technological masterpiece and versatile solution. Having integrated over 20 years of BYD Group’s technological advancements, it has shattered the limits of using new energy vehicles in all scenarios. It now serves as a hub for creating models for multiple sectors, catering to all scenarios and operating conditions.',
    points: [
      'Revolutionary hybrid non-load-bearing frame: Integrated CTC battery chassis.',
      'Hybrid architecture specialized for off-road: Electric-centric design.'
    ],
    image: '/assets/images/about-tab-dmo.jpg'
  },
  {
    id: 'disus',
    label: 'DiSus-Intelligent Body Control System',
    title: 'DiSus Intelligent Body Control System',
    body: 'The first self-developed intelligent body control system launched by a Chinese automobile company, achieving collaborative control of body dynamics in vertical, lateral, and longitudinal directions.',
    points: [
      'DiSus-C, DiSus-A, and DiSus-P full-stack control systems.',
      'Maximum safety and stability under extreme road conditions.'
    ],
    image: '/assets/images/about-tab-disus.jpg'
  },
  {
    id: 'ctb',
    label: 'CTB (Cell to Body) Battery Body Integration Technology',
    title: 'CTB (Cell to Body) Technology',
    body: 'Integrates the Blade Battery into the vehicle underbody structure, creating a sandwich structure that doubles torsional rigidity and enhances crash safety.',
    points: [
      'High torsional rigidity exceeding 40,000 N·m/deg.',
      'Optimized vehicle interior space and lower center of gravity.'
    ],
    image: '/assets/images/about-tab-ctb.jpg'
  }
];

export default function About() {
  const [activeTab, setActiveTab] = useState('dmo');
  const currentPlatform = PLATFORM_TABS.find((t) => t.id === activeTab) || PLATFORM_TABS[1];

  return (
    <div className="about-page">
      {/* 1. Intro Video Section */}
      <section className="about-video-section">
        <video 
          className="about-video" 
          controls 
          playsInline 
          autoPlay
          muted
          loop
          preload="auto"
          poster="/assets/images/about-video-poster.jpg"
        >
          <source src="/assets/videos/about-corporate.mp4" type="video/mp4" />
        </video>
      </section>

      {/* 2. About BYD Overview */}
      <section className="about-hero-section bg-about-headquarters">
        <div className="about-overlay-top" />
        <div className="about-text-container">
          <h1 className="about-main-title">About BYD</h1>
          <p className="about-main-desc">
            Founded in November 1994, BYD is a high-tech company devoted to leveraging technological innovations for a better life. After more than <strong>30</strong> years of rapid growth, BYD has played a significant role in industries related to electronics, auto, renewable energy and rail transit. With a focus on energy acquisition, storage, and application, BYD offers comprehensive zero-emission new energy solutions. As a company listed on both the Hong Kong Stock Exchange and Shenzhen Stock Exchange, its annual revenue in 2023 exceeds RMB <strong>602</strong> billion.
          </p>
        </div>
      </section>

      {/* 3. Globalization Section */}
      <section className="about-section bg-globalization">
        <div className="about-section-header">
          <h2 className="section-title">Globalization</h2>
          <p className="section-subtitle"><strong>400+</strong> cities, <strong>80+</strong> countries, <strong>6</strong> continents</p>
        </div>

        <div className="global-map-area">
          {/* Europe Card */}
          <div className="europe-card">
            <h3>EUROPE</h3>
            <div className="europe-countries-grid">
              <div>Austria</div>
              <div>Belgium</div>
              <div>Czech</div>
              <div>Denmark</div>
              <div>Finland</div>
              <div>France</div>
              <div>Germany</div>
              <div>Hungary</div>
              <div>Iceland</div>
              <div>Ireland</div>
              <div>Italy</div>
              <div>Luxembourg</div>
              <div>Netherlands</div>
              <div>Norway</div>
              <div>Poland</div>
              <div>Portugal</div>
              <div>Romania</div>
              <div>Spain</div>
              <div>Sweden</div>
              <div>Switzerland</div>
              <div>United Kingdom</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Auto Section */}
      <section className="about-section bg-auto">
        <div className="about-section-header">
          <h2 className="section-title">Auto</h2>
          <p className="section-subtitle max-w-2xl">
            BYD has developed the Blade Battery and dual-mode hybrid power technology, accelerating the once-in-a-century transition from fossil fuel powered vehicles to electric vehicles.
          </p>
        </div>
      </section>

      {/* 5. Blade Battery Section */}
      <section className="about-section bg-blade-battery">
        <div className="about-section-header">
          <h2 className="section-title">Blade Battery</h2>
        </div>

        <div className="blade-content-layout">
          <div className="blade-features-list">
            <div className="blade-feature-item">
              <h3>Ultra Seguridad</h3>
              <p>Blade Battery is the only power battery that has safely passed the nail penetration test.</p>
            </div>
            <div className="blade-feature-item">
              <h3>Ultra Strength</h3>
              <p>The compressive strength can reach 445kN, which is equivalent to a 45-ton truck.</p>
            </div>
            <div className="blade-feature-item">
              <h3>Ultra-long Range</h3>
              <p>Blade Battery allows BYD Han EV a range capacity of 372 miles, which is to be extended to 434~497miles in the future.</p>
            </div>
            <div className="blade-feature-item">
              <h3>Ultra-long Lifespan</h3>
              <p>An ultra-long warranty of eight years or longer,and 310,685miles or even up to 621,371miles.</p>
            </div>
            <div className="blade-feature-item">
              <h3>Ultra-high Charging Capability</h3>
              <p>It only takes 33 minutes to charge the battery from 10% to 80%, with a maximum instantaneous discharge power of 363 kW.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. DM-i Ultra-low Fuel Consumption */}
      <section className="about-section bg-dmi">
        <div className="about-section-header">
          <h2 className="section-title">DM-i Ultra-low Fuel Consumption</h2>
        </div>

        <div className="dmi-specs-strip">
          <div className="dmi-spec-item border-right">
            <h3>Fast:</h3>
            <p>2~3 seconds faster than full combustion engine vehicles of the same class in terms of 0-62mph</p>
          </div>
          <div className="dmi-spec-item border-right">
            <h3>Economy:</h3>
            <p>Fuel consumption of power loss as low as 3.8L/62miles</p>
          </div>
          <div className="dmi-spec-item border-right">
            <h3>Quiet:</h3>
            <p>Tranquil, like EVs</p>
          </div>
          <div className="dmi-spec-item">
            <h3>Smooth:</h3>
            <p>Electronic control, super smooth</p>
          </div>
        </div>
      </section>

      {/* 7. DM-p Super Power */}
      <section className="about-section bg-dmp">
        <div className="about-section-header">
          <h2 className="section-title">DM-p Super Power</h2>
          <p className="section-subtitle">0-62 mph acceleration in 4.5 seconds</p>
        </div>
      </section>

      {/* 8. e-Platform 3.0 */}
      <section className="about-section bg-eplatform">
        <div className="about-section-header">
          <h2 className="section-title">e-Platform 3.0</h2>
          <p className="section-subtitle">Give full play to the advantages of intelligence, efficiency, safety, and aesthetics that electrification brings.</p>
        </div>

        <div className="eplatform-layout">
          <div className="eplatform-features">
            <div className="eplatform-feature-item">
              <h3>Safety</h3>
              <p>Equipped with ultra-safe blade batteries while integrating the pack into the car body, the e-platform 3.0 builds up a special pure electric vehicle frame structure to increase the rigidity of the vehicle.</p>
            </div>
            <div className="eplatform-feature-item">
              <h3>High efficiency</h3>
              <p>It enables ranges exceeding 620 miles on a single charge through the world’s first 8-in-1 electric powertrain. The power consumption per 62 miles of vehicles with the e-platform 3.0 is 10% lower than that of the same class of models.</p>
            </div>
            <div className="eplatform-feature-item">
              <h3>Intelligence</h3>
              <p>The domain controllers and the BYD OS (Operating System) facilitate high levels of intelligent driving. The decoupling of hardware and software achieves the constant self-evolution of the whole vehicle.</p>
            </div>
            <div className="eplatform-feature-item">
              <h3>Aesthetics</h3>
              <p>The vehicle features shorter overhangs and a longer wheelbase, significantly expanding the passenger space; a lower body and a longer wheelbase liberate the vehicle’s aerodynamic design, decreasing the drag coefficient to 0.21Cd.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. BYD Intelligent Cockpit System */}
      <section className="about-section bg-cockpit">
        <div className="about-section-header">
          <h2 className="section-title">BYD Intelligent Cockpit System</h2>
          <p className="section-subtitle">All smartphone functions are integrated into the in-vehicle platform.</p>
        </div>
      </section>

      {/* 10. Technology Platforms (Tabbed Interactive Section) */}
      <section className="platform-tabs-section">
        <div className="platform-display-row">
          <div className="platform-img-box">
            <img src={currentPlatform.image} alt={currentPlatform.title} />
          </div>
          <div className="platform-info-box">
            <h2>{currentPlatform.title}</h2>
            <p className="platform-body">{currentPlatform.body}</p>
            <ul className="platform-points">
              {currentPlatform.points.map((pt, idx) => (
                <li key={idx}>{pt}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tab Switcher Strip */}
        <div className="platform-tabs-bar">
          {PLATFORM_TABS.map((tab) => (
            <button
              key={tab.id}
              className={`platform-tab-btn ${activeTab === tab.id ? 'platform-tab-btn--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}