
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from './Navbar';
import Header from './Header';
import AboutUs from './AboutUs';
import './certificateSearch.css';
import Swal from 'sweetalert2';
import './Navbar.css';
import './Header.css';
import './AboutUs.css';

const CertificateSearch = () => {
  const history = useHistory();
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const savedSearchInput = sessionStorage.getItem('certificateSearchInput');
    if (savedSearchInput) {
      setSearchInput(savedSearchInput);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchInput.toLowerCase() === 'cystack.ps') {
      history.push('/datatables'); // Navigate to the DataTable page
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Certificate Not Found',
        text: `Certificate ${searchInput} not found, please try again`,
        customClass: {
          popup: 'custom-slide-in-down',
        },
        showClass: {
          popup: 'custom-slide-in-down',
        },
      });
    }

    sessionStorage.setItem('certificateSearchInput', searchInput);
  };

  return (
    <body>
      <Navbar />
      <div className="container">
        <Header />
        <div className="input-container">
          <p>Enter an <strong>Identity</strong> (Domain Name, Organization Name, etc),</p>
          <p>
            a <strong>Certificate Fingerprint</strong> (SHA-1 or SHA-256) or a <strong>crt.sh ID</strong>:
          </p>
          <form name="search_form" method="GET" onSubmit={handleSubmit}>
            <input
              type="text"
              className="input"
              name="q"
              size="64"
              maxLength="255"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <input type="submit" className="button" value="Search" />
            <div className="advanced-container">
              <span className="advanced-link">
                <a href="?a=1" className="advanced-button">
                  Advanced...
                </a>
              </span>
            </div>
          </form>
        </div>
        <AboutUs />
      </div>
      <div className="footer">
        <p className="copyright">&copy; Sectigo Limited 2015-2023. All rights reserved.</p>
        <div>
          <a href="https://sectigo.com/">
            <img src="./sectigo_s.png" alt="Sectigo" />
          </a>
          <a href="https://github.com/crtsh">
            <img src="./GitHub-Mark-32px.png" alt="GitHub" />
          </a>
        </div>
      </div>
    </body>
  );
};

export default CertificateSearch;
