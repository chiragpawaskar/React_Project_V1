import React from 'react';
import './NseFooter.css';

export const NseFooter: React.FC = () => {
  return (
    <footer className="nse-footer">
      <div className="nse-footer-main">
        <div className="nse-footer-container">
          {/* Column 1: Market Data */}
          <div className="nse-footer-col">
            <h4 className="nse-footer-col-title">Market Data</h4>
            <ul className="nse-footer-links">
              <li><a href="#live-indices">Live Indices Watch</a></li>
              <li><a href="#stock-watch">Equity Stock Watch</a></li>
              <li><a href="#gainers-losers">Top Gainers/Losers</a></li>
              <li><a href="#movers">Index Movers</a></li>
              <li><a href="#etf">Exchange Traded Funds</a></li>
              <li><a href="#advance-charting">Advance Charting</a></li>
              <li><a href="#return-profile">Return Profile</a></li>
            </ul>
          </div>

          {/* Column 2: Indices */}
          <div className="nse-footer-col">
            <h4 className="nse-footer-col-title">Indices</h4>
            <ul className="nse-footer-links">
              <li><a href="#broad-based">Broad based Indices</a></li>
              <li><a href="#sectoral">Sectoral Indices</a></li>
              <li><a href="#thematic">Thematic Indices</a></li>
              <li><a href="#strategic">Strategic Indices</a></li>
              <li><a href="#g-sec">G-SEC Indices</a></li>
              <li><a href="#corporate-bond">Corporate Bond Indices</a></li>
              <li><a href="#money-market">Money Market Indices</a></li>
            </ul>
          </div>

          {/* Column 3: Offerings */}
          <div className="nse-footer-col">
            <h4 className="nse-footer-col-title">Offerings</h4>
            <ul className="nse-footer-links">
              <li><a href="#licensing">Index Licensing</a></li>
              <li><a href="#subscription">Data Subscription</a></li>
              <li><a href="#customization">Index Customization</a></li>
            </ul>
          </div>

          {/* Column 4: Reports */}
          <div className="nse-footer-col">
            <h4 className="nse-footer-col-title">Reports</h4>
            <ul className="nse-footer-links">
              <li><a href="#daily-reports">Daily Reports</a></li>
              <li><a href="#monthly-reports">Monthly Reports</a></li>
              <li><a href="#historical-data">Historical Data</a></li>
              <li><a href="#factsheet">Index Factsheet</a></li>
              <li><a href="#isil-dashboard">ISIL Dashboard</a></li>
            </ul>
          </div>

          {/* Column 5: Resources */}
          <div className="nse-footer-col">
            <h4 className="nse-footer-col-title">Resources</h4>
            <ul className="nse-footer-links">
              <li><a href="#holiday-calendar">Holiday Calendar</a></li>
              <li><a href="#data-vendors">Authorised Data Vendors</a></li>
              <li><a href="#methodology">Index Methodology</a></li>
              <li><a href="#weight-factors">Investible Weight Factors</a></li>
              <li><a href="#iosco">IOSCO Compliance</a></li>
              <li><a href="#index-concepts">Index Concepts</a></li>
            </ul>
          </div>

          {/* Column 6: About Us */}
          <div className="nse-footer-col">
            <h4 className="nse-footer-col-title">About Us</h4>
            <ul className="nse-footer-links">
              <li><a href="#media">Media</a></li>
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#sitemap">Sitemap</a></li>
            </ul>
          </div>

          {/* Column 7: Brand Motto Watermark Graphic */}
          <div className="nse-footer-brand-col">
            {/* Ascending Chart Graphic */}
            <div className="nse-future-graphic" aria-hidden="true">
              <svg width="64" height="48" viewBox="0 0 64 48" fill="none">
                <path d="M4 42 L20 28 L36 34 L58 10" stroke="#1d4ed8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
                <path d="M46 10 L58 10 L58 22" stroke="#1d4ed8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
                <rect x="16" y="28" width="6" height="14" fill="#1e3a8a" opacity="0.4" rx="1" />
                <rect x="32" y="22" width="6" height="20" fill="#1e3a8a" opacity="0.5" rx="1" />
                <rect x="48" y="14" width="6" height="28" fill="#2563eb" opacity="0.6" rx="1" />
              </svg>
            </div>

            <div className="nse-future-text">
              <span>Building</span>
              <span>A Stronger</span>
              <span>Financial Future</span>
            </div>
            <div className="nse-future-underline" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Bottom Sub-footer */}
      <div className="nse-sub-footer">
        <div className="nse-sub-footer-container">
          <div className="nse-copyright-links">
            <span>Copyright © 2026 NSE Indices Limited</span>
            <span className="nse-pipe-sep">|</span>
            <a href="#disclaimer">Disclaimer</a>
            <span className="nse-pipe-sep">|</span>
            <a href="#terms">Terms of Use</a>
            <span className="nse-pipe-sep">|</span>
            <a href="#privacy">Privacy Policy</a>
            <span className="nse-pipe-sep">|</span>
            <a href="#help">Help</a>
          </div>

          <div className="nse-social-icons">
            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="nse-social-btn"
              title="NSE on LinkedIn"
              aria-label="LinkedIn"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>

            {/* X (formerly Twitter) */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              className="nse-social-btn"
              title="NSE on X"
              aria-label="X (Twitter)"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="nse-social-btn"
              title="NSE on YouTube"
              aria-label="YouTube"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
