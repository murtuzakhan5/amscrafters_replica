import React, { useEffect, useState } from 'react';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseOver = (e) => {
      if (
        e.target.tagName.toLowerCase() === 'button' ||
        e.target.tagName.toLowerCase() === 'a' ||
        e.target.closest('button') ||
        e.target.closest('a') ||
        getComputedStyle(e.target).cursor === 'pointer'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <>
      {/* Small Dot */}
      <div style={{
        position: 'fixed',
        top: position.y,
        left: position.x,
        width: '8px',
        height: '8px',
        backgroundColor: '#3180b2',
        borderRadius: '50%',
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        zIndex: 999999,
        transition: 'width 0.2s, height 0.2s, background-color 0.2s',
        ...(isHovering && {
          width: '12px',
          height: '12px',
          backgroundColor: '#fff'
        })
      }} />

      {/* Outer Ring */}
      <div style={{
        position: 'fixed',
        top: position.y,
        left: position.x,
        width: '40px',
        height: '40px',
        border: '2px solid rgba(49, 128, 178, 0.5)',
        borderRadius: '50%',
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        zIndex: 999998,
        transition: 'width 0.3s ease-out, height 0.3s ease-out, border-color 0.3s ease-out, top 0.1s ease-out, left 0.1s ease-out',
        ...(isHovering && {
          width: '60px',
          height: '60px',
          borderColor: 'rgba(255, 255, 255, 0.4)',
          backgroundColor: 'rgba(255, 255, 255, 0.05)'
        })
      }} />
    </>
  );
};
