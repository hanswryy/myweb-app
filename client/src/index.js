import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import DetailPage from './DetailPage';
import CMSDrama from './CMSDrama';
import CMSInputDrama from './CMSInputDrama';
import CMSComments from './CMSComments';
import CMSCountries from './CMSCountries';
import CMSAwards from './CMSAwards';
import CMSGenres from './CMSGenres';
import CMSActors from './CMSActors';
import CMSUsers from './CMSUsers';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/detailPage" element={<DetailPage />} />
        <Route path="/cms" element={<CMSDrama />} />
        <Route path="/cms/input" element={<CMSInputDrama />} />
        <Route path="/cms/countries" element={<CMSCountries />} />
        <Route path="/cms/comments" element={<CMSComments />} />
        <Route path="/cms/awards" element={<CMSAwards />} />
        <Route path="/cms/genres" element={<CMSGenres />} />
        <Route path="/cms/actors" element={<CMSActors />} />
        <Route path="/cms/users" element={<CMSUsers />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
