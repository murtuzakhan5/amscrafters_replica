import React from 'react';
import './marquee.css';

export const MarqueeCrossing = () => {
  const line1Items = [
    { text: 'STORY-DRIVEN AGENCY', type: 'mq-gradient' },
    { text: 'EVERY PIXEL COUNTS', type: 'mq-solid' },
    { text: 'WITH OBSESSION', type: 'mq-gradient' },
    { text: 'CREATIVE MASTERY', type: 'mq-outline' },
  ];

  const line2Items = [
    { text: 'BOLD BY DESIGN', type: 'mq-outline' },
    { text: 'TRUST THE PROCESS', type: 'mq-outline' },
    { text: 'YOU BUILD BRANDS', type: 'mq-solid' },
    { text: 'WORLD CLASS', type: 'mq-solid' },
  ];

  const renderLine = (items) => (
    <>
      {items.map((item, idx) => (
        <React.Fragment key={`a-${idx}`}>
          <span className={`marquee-item ${item.type}`}>{item.text}</span>
          <span className="marquee-item mq-dot">•</span>
        </React.Fragment>
      ))}
      {items.map((item, idx) => (
        <React.Fragment key={`b-${idx}`}>
          <span className={`marquee-item ${item.type}`}>{item.text}</span>
          <span className="marquee-item mq-dot">•</span>
        </React.Fragment>
      ))}
       {items.map((item, idx) => (
        <React.Fragment key={`c-${idx}`}>
          <span className={`marquee-item ${item.type}`}>{item.text}</span>
          <span className="marquee-item mq-dot">•</span>
        </React.Fragment>
      ))}
    </>
  );

  return (
    <div className="marquee-container">
      {/* Line 1 - Rotated Down, Scrolls Left */}
      <div className="marquee-line-wrapper marquee-line-1">
        <div className="marquee-content">
          {renderLine(line1Items)}
        </div>
      </div>
      
      {/* Line 2 - Rotated Up, Scrolls Right */}
      <div className="marquee-line-wrapper marquee-line-2">
        <div className="marquee-content reverse">
          {renderLine(line2Items)}
        </div>
      </div>
    </div>
  );
};
