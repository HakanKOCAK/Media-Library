import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/Landing.css';

const Landing = () => (
  <section className="landing">
    <div className="dark-overlay">
      <div className="landing-inner">
        <h1 className="x-large">Media Library</h1>
        <p className="lead">Create/Update/Delete tags added to files.</p>
        <div>
          <Link to="/register" className="btn btn-primary">Sign Up</Link>
          <Link to="/login" className="btn btn-light">Sign In</Link>
        </div>
      </div>
    </div>
  </section>
);

export default Landing;
