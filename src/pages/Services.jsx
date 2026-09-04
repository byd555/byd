import React from 'react';
import './Services.css';

export default function Services() {
  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="services-hero">
        <div className="services-hero-bg" />
        <div className="services-hero-overlay" />
        <div className="services-hero-content container">
          <h1 className="services-title">Customer Care BYD</h1>
        </div>
      </section>

      {/* Customer Care Details Section */}
      <section className="services-details container">
        <h2 className="details-title">BYD Canada</h2>
        
        <div className="details-block">
          <h3 className="details-subtitle">Customer Service</h3>
          <p className="details-text">Mon. to Sat. 8:00am-5:00pm</p>
        </div>
        
        <div className="details-block details-contact">
          <p className="details-text">
            Call us on: <a href="tel:+85267966800" className="details-link">(+852) 6796 6800</a>
          </p>
        </div>
        <div className="details-block details-contact">
          {/* <p className="details-text">
            Email us on: <a href="mailto:byd55814@gmail.com" className="details-link">byd55814@gmail.com</a>
          </p> */}
           <p className="details-text">
            Email us on: <a href="mailto:iscm@bydglobalmotorcanada.ltd" className="details-link">byd-ca.com</a>
          </p>
        </div>
        
      </section>
    </div>
  );
}