import React from 'react';

export const NseFooter: React.FC = () => {
  return (
    <footer className="w-full bg-[#061b36] text-[#cbd5e1] font-sans mt-auto">
      <div className="max-w-[1400px] mx-auto px-4 py-8 md:px-8 md:pt-11 md:pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[repeat(6,1fr)_1.2fr] gap-7 lg:gap-6">
          {/* Column 1: Market Data */}
          <div className="flex flex-col">
            <h4 className="text-[0.95rem] font-bold text-white mb-3.5 tracking-[-0.1px]">Market Data</h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-2">
              <li><a href="#live-indices" className="text-[#94a3b8] text-[0.785rem] no-underline transition-all duration-150 inline-block leading-snug hover:text-white hover:translate-x-0.5">Live Indices Watch</a></li>
              <li><a href="#stock-watch" className="text-[#94a3b8] text-[0.785rem] no-underline transition-all duration-150 inline-block leading-snug hover:text-white hover:translate-x-0.5">Equity Stock Watch</a></li>
              <li><a href="#gainers-losers" className="text-[#94a3b8] text-[0.785rem] no-underline transition-all duration-150 inline-block leading-snug hover:text-white hover:translate-x-0.5">Top Gainers/Losers</a></li>
              <li><a href="#movers" className="text-[#94a3b8] text-[0.785rem] no-underline transition-all duration-150 inline-block leading-snug hover:text-white hover:translate-x-0.5">Index Movers</a></li>
              <li><a href="#etf" className="text-[#94a3b8] text-[0.785rem] no-underline transition-all duration-150 inline-block leading-snug hover:text-white hover:translate-x-0.5">Exchange Traded Funds</a></li>
              <li><a href="#advance-charting" className="text-[#94a3b8] text-[0.785rem] no-underline transition-all duration-150 inline-block leading-snug hover:text-white hover:translate-x-0.5">Advance Charting</a></li>
              <li><a href="#return-profile" className="text-[#94a3b8] text-[0.785rem] no-underline transition-all duration-150 inline-block leading-snug hover:text-white hover:translate-x-0.5">Return Profile</a></li>
            </ul>
          </div>

          {/* Column 2: Indices */}
          <div className="flex flex-col">
            <h4 className="text-[0.95rem] font-bold text-white mb-3.5 tracking-[-0.1px]">Indices</h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-2">
              <li><a href="#broad-based" className="text-[#94a3b8] text-[0.785rem] no-underline transition-all duration-150 inline-block leading-snug hover:text-white hover:translate-x-0.5">Broad based Indices</a></li>
              <li><a href="#sectoral" className="text-[#94a3b8] text-[0.785rem] no-underline transition-all duration-150 inline-block leading-snug hover:text-white hover:translate-x-0.5">Sectoral Indices</a></li>
              <li><a href="#thematic" className="text-[#94a3b8] text-[0.785rem] no-underline transition-all duration-150 inline-block leading-snug hover:text-white hover:translate-x-0.5">Thematic Indices</a></li>
              <li><a href="#strategic" className="text-[#94a3b8] text-[0.785rem] no-underline transition-all duration-150 inline-block leading-snug hover:text-white hover:translate-x-0.5">Strategic Indices</a></li>
              <li><a href="#g-sec" className="text-[#94a3b8] text-[0.785rem] no-underline transition-all duration-150 inline-block leading-snug hover:text-white hover:translate-x-0.5">G-SEC Indices</a></li>
              <li><a href="#corporate-bond" className="text-[#94a3b8] text-[0.785rem] no-underline transition-all duration-150 inline-block leading-snug hover:text-white hover:translate-x-0.5">Corporate Bond Indices</a></li>
              <li><a href="#money-market" className="text-[#94a3b8] text-[0.785rem] no-underline transition-all duration-150 inline-block leading-snug hover:text-white hover:translate-x-0.5">Money Market Indices</a></li>
            </ul>
          </div>

          {/* Column 3: Offerings */}
          <div className="flex flex-col">
            <h4 className="text-[0.95rem] font-bold text-white mb-3.5 tracking-[-0.1px]">Offerings</h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-2">
              <li><a href="#licensing" className="text-[#94a3b8] text-[0.785rem] no-underline transition-all duration-150 inline-block leading-snug hover:text-white hover:translate-x-0.5">Index Licensing</a></li>
              <li><a href="#subscription" className="text-[#94a3b8] text-[0.785rem] no-underline transition-all duration-150 inline-block leading-snug hover:text-white hover:translate-x-0.5">Data Subscription</a></li>
              <li><a href="#customization" className="text-[#94a3b8] text-[0.785rem] no-underline transition-all duration-150 inline-block leading-snug hover:text-white hover:translate-x-0.5">Index Customization</a></li>
            </ul>
          </div>

          {/* Column 4: Reports */}
          <div className="flex flex-col">
            <h4 className="text-[0.95rem] font-bold text-white mb-3.5 tracking-[-0.1px]">Reports</h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-2">
              <li><a href="#daily-reports" className="text-[#94a3b8] text-[0.785rem] no-underline transition-all duration-150 inline-block leading-snug hover:text-white hover:translate-x-0.5">Daily Reports</a></li>
              <li><a href="#monthly-reports" className="text-[#94a3b8] text-[0.785rem] no-underline transition-all duration-150 inline-block leading-snug hover:text-white hover:translate-x-0.5">Monthly Reports</a></li>
              <li><a href="#historical-data" className="text-[#94a3b8] text-[0.785rem] no-underline transition-all duration-150 inline-block leading-snug hover:text-white hover:translate-x-0.5">Historical Data</a></li>
              <li><a href="#factsheet" className="text-[#94a3b8] text-[0.785rem] no-underline transition-all duration-150 inline-block leading-snug hover:text-white hover:translate-x-0.5">Index Factsheet</a></li>
              <li><a href="#isil-dashboard" className="text-[#94a3b8] text-[0.785rem] no-underline transition-all duration-150 inline-block leading-snug hover:text-white hover:translate-x-0.5">ISIL Dashboard</a></li>
            </ul>
          </div>

          {/* Column 5: Resources */}
          <div className="flex flex-col">
            <h4 className="text-[0.95rem] font-bold text-white mb-3.5 tracking-[-0.1px]">Resources</h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-2">
              <li><a href="#holiday-calendar" className="text-[#94a3b8] text-[0.785rem] no-underline transition-all duration-150 inline-block leading-snug hover:text-white hover:translate-x-0.5">Holiday Calendar</a></li>
              <li><a href="#data-vendors" className="text-[#94a3b8] text-[0.785rem] no-underline transition-all duration-150 inline-block leading-snug hover:text-white hover:translate-x-0.5">Authorised Data Vendors</a></li>
              <li><a href="#methodology" className="text-[#94a3b8] text-[0.785rem] no-underline transition-all duration-150 inline-block leading-snug hover:text-white hover:translate-x-0.5">Index Methodology</a></li>
              <li><a href="#weight-factors" className="text-[#94a3b8] text-[0.785rem] no-underline transition-all duration-150 inline-block leading-snug hover:text-white hover:translate-x-0.5">Investible Weight Factors</a></li>
              <li><a href="#iosco" className="text-[#94a3b8] text-[0.785rem] no-underline transition-all duration-150 inline-block leading-snug hover:text-white hover:translate-x-0.5">IOSCO Compliance</a></li>
              <li><a href="#index-concepts" className="text-[#94a3b8] text-[0.785rem] no-underline transition-all duration-150 inline-block leading-snug hover:text-white hover:translate-x-0.5">Index Concepts</a></li>
            </ul>
          </div>

          {/* Column 6: About Us */}
          <div className="flex flex-col">
            <h4 className="text-[0.95rem] font-bold text-white mb-3.5 tracking-[-0.1px]">About Us</h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-2">
              <li><a href="#media" className="text-[#94a3b8] text-[0.785rem] no-underline transition-all duration-150 inline-block leading-snug hover:text-white hover:translate-x-0.5">Media</a></li>
              <li><a href="#contact" className="text-[#94a3b8] text-[0.785rem] no-underline transition-all duration-150 inline-block leading-snug hover:text-white hover:translate-x-0.5">Contact Us</a></li>
              <li><a href="#careers" className="text-[#94a3b8] text-[0.785rem] no-underline transition-all duration-150 inline-block leading-snug hover:text-white hover:translate-x-0.5">Careers</a></li>
              <li><a href="#sitemap" className="text-[#94a3b8] text-[0.785rem] no-underline transition-all duration-150 inline-block leading-snug hover:text-white hover:translate-x-0.5">Sitemap</a></li>
            </ul>
          </div>

          {/* Column 7: Brand Motto Watermark Graphic */}
          <div className="flex flex-col items-start justify-start lg:pl-3 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-1 mt-3 lg:mt-0">
            {/* Ascending Chart Graphic */}
            <div className="mb-2" aria-hidden="true">
              <svg width="64" height="48" viewBox="0 0 64 48" fill="none">
                <path d="M4 42 L20 28 L36 34 L58 10" stroke="#1d4ed8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
                <path d="M46 10 L58 10 L58 22" stroke="#1d4ed8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
                <rect x="16" y="28" width="6" height="14" fill="#1e3a8a" opacity="0.4" rx="1" />
                <rect x="32" y="22" width="6" height="20" fill="#1e3a8a" opacity="0.5" rx="1" />
                <rect x="48" y="14" width="6" height="28" fill="#2563eb" opacity="0.6" rx="1" />
              </svg>
            </div>

            <div className="flex flex-col font-sans text-[1.15rem] font-bold leading-tight text-[#94a3b8]">
              <span>Building</span>
              <span>A Stronger</span>
              <span>Financial Future</span>
            </div>
            <div className="w-[50px] h-[3px] bg-[#f37021] rounded-xs mt-2.5" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Bottom Sub-footer */}
      <div className="border-t border-white/[0.08] bg-[#031124]">
        <div className="max-w-[1400px] mx-auto px-4 py-4 md:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
          <div className="flex items-center flex-wrap gap-3 text-[0.775rem] text-[#94a3b8]">
            <span>Copyright © 2026 NSE Indices Limited</span>
            <span className="text-white/20">|</span>
            <a href="#disclaimer" className="text-[#94a3b8] no-underline transition-colors hover:text-white hover:underline">Disclaimer</a>
            <span className="text-white/20">|</span>
            <a href="#terms" className="text-[#94a3b8] no-underline transition-colors hover:text-white hover:underline">Terms of Use</a>
            <span className="text-white/20">|</span>
            <a href="#privacy" className="text-[#94a3b8] no-underline transition-colors hover:text-white hover:underline">Privacy Policy</a>
            <span className="text-white/20">|</span>
            <a href="#help" className="text-[#94a3b8] no-underline transition-colors hover:text-white hover:underline">Help</a>
          </div>

          <div className="flex items-center gap-2.5">
            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-white/[0.08] border border-white/15 text-white flex items-center justify-center transition-all duration-200 no-underline hover:bg-white hover:text-[#061b36] hover:-translate-y-0.5 hover:shadow-[0_4px_10px_rgba(0,0,0,0.3)]"
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
              className="w-8 h-8 rounded-full bg-white/[0.08] border border-white/15 text-white flex items-center justify-center transition-all duration-200 no-underline hover:bg-white hover:text-[#061b36] hover:-translate-y-0.5 hover:shadow-[0_4px_10px_rgba(0,0,0,0.3)]"
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
              className="w-8 h-8 rounded-full bg-white/[0.08] border border-white/15 text-white flex items-center justify-center transition-all duration-200 no-underline hover:bg-white hover:text-[#061b36] hover:-translate-y-0.5 hover:shadow-[0_4px_10px_rgba(0,0,0,0.3)]"
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
