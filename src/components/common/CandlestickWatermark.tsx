import React from 'react';

export const CandlestickWatermark: React.FC = () => {
  return (
    <div
      className="nse-watermark-container"
      style={{
        position: 'absolute',
        top: '48px',
        right: '64px',
        pointerEvents: 'none',
        userSelect: 'none',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
      aria-hidden="true"
    >
      {/* Candlestick Graphic in faint blue */}
      <svg
        width="280"
        height="320"
        viewBox="0 0 280 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'absolute',
          top: '-40px',
          right: '-20px',
          opacity: 0.18,
        }}
      >
        {/* Candlestick 1 */}
        <line x1="20" y1="220" x2="20" y2="290" stroke="#1d4ed8" strokeWidth="2" />
        <rect x="14" y="240" width="12" height="36" fill="#1d4ed8" rx="1" />

        {/* Candlestick 2 */}
        <line x1="45" y1="190" x2="45" y2="270" stroke="#1d4ed8" strokeWidth="2" />
        <rect x="39" y="210" width="12" height="42" fill="#1d4ed8" rx="1" />

        {/* Candlestick 3 */}
        <line x1="70" y1="170" x2="70" y2="250" stroke="#1d4ed8" strokeWidth="2" />
        <rect x="64" y="185" width="12" height="40" fill="#1d4ed8" rx="1" />

        {/* Candlestick 4 */}
        <line x1="95" y1="140" x2="95" y2="230" stroke="#1d4ed8" strokeWidth="2" />
        <rect x="89" y="160" width="12" height="50" fill="#1d4ed8" rx="1" />

        {/* Candlestick 5 */}
        <line x1="120" y1="150" x2="120" y2="210" stroke="#1d4ed8" strokeWidth="2" />
        <rect x="114" y="165" width="12" height="30" fill="#1d4ed8" rx="1" />

        {/* Candlestick 6 */}
        <line x1="145" y1="110" x2="145" y2="190" stroke="#1d4ed8" strokeWidth="2" />
        <rect x="139" y="125" width="12" height="46" fill="#1d4ed8" rx="1" />

        {/* Candlestick 7 */}
        <line x1="170" y1="80" x2="170" y2="160" stroke="#1d4ed8" strokeWidth="2" />
        <rect x="164" y="95" width="12" height="48" fill="#1d4ed8" rx="1" />

        {/* Candlestick 8 */}
        <line x1="195" y1="60" x2="195" y2="140" stroke="#1d4ed8" strokeWidth="2" />
        <rect x="189" y="75" width="12" height="45" fill="#1d4ed8" rx="1" />

        {/* Candlestick 9 */}
        <line x1="220" y1="40" x2="220" y2="120" stroke="#1d4ed8" strokeWidth="2" />
        <rect x="214" y="52" width="12" height="52" fill="#1d4ed8" rx="1" />

        {/* Candlestick 10 */}
        <line x1="245" y1="20" x2="245" y2="100" stroke="#1d4ed8" strokeWidth="2" />
        <rect x="239" y="32" width="12" height="48" fill="#1d4ed8" rx="1" />
      </svg>

      {/* Watermark Typography */}
      <div
        style={{
          position: 'relative',
          fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
          fontSize: '2.1rem',
          fontWeight: 800,
          color: '#8ea6c7',
          lineHeight: 1.15,
          letterSpacing: '-0.5px',
          textAlign: 'left',
          opacity: 0.85,
        }}
      >
        <div>Trusted</div>
        <div>Indices</div>
        <div>Stronger</div>
        <div>Markets</div>
        <div
          style={{
            width: '44px',
            height: '4px',
            backgroundColor: '#f37021',
            borderRadius: '2px',
            marginTop: '8px',
          }}
        />
      </div>
    </div>
  );
};
