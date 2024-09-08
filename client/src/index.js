import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import DetailPage from './DetailPage';
import CMSDrama from './CMSDrama';
import CMSInputDrama from './CMSInputDrama';
import Countries from './Countries';
import CMSComments from './CMSComments';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/detailPage" element={<DetailPage />} />
        <Route path="/cms" element={<CMSDrama />} />
        <Route path="/cms/input" element={<CMSInputDrama />} />
        <Route path="/countries" element={<Countries />} />
        <Route path="/cms/comments" element={<CMSComments />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
