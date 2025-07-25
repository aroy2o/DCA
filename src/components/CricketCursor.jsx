import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

const CricketCursor = () => {
  // State now tracks the type of cursor to display: 'bat', 'ball', or 'wicket'
  const [cursorType, setCursorType] = useState('bat');
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  
  const cursorRef = useRef(null);
  const batRef = useRef(null);
  const ballRef = useRef(null);
  const wicketRef = useRef(null);

  // Check if the device has a large screen (desktop)
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // More stable hover detection using a single 'mousemove' event listener
  useEffect(() => {
    if (!isLargeScreen) return;

    const handleMouseMove = (e) => {
      const target = e.target;
      const inputEl = target.closest('input, textarea');
      const clickableEl = target.closest('a, button, [role="button"]');

      if (inputEl) {
        setCursorType('wicket');
      } else if (clickableEl) {
        setCursorType('ball');
      } else {
        setCursorType('bat');
      }
    };
    
    // Using mousemove is more reliable than mouseover/mouseout for this use case
    document.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isLargeScreen]);

  // Effect to animate the cursor based on its type
  useEffect(() => {
    if (!batRef.current || !ballRef.current || !wicketRef.current || !isLargeScreen) return;

    // Animate based on the current cursor type
    const showBat = cursorType === 'bat';
    const showBall = cursorType === 'ball';
    const showWicket = cursorType === 'wicket';

    // Bat Animation
    gsap.to(batRef.current, {
      scale: showBat ? 1 : 0,
      opacity: showBat ? 1 : 0,
      duration: 0.3,
      ease: showBat ? 'back.out(1.7)' : 'power2.in',
    });

    // Ball Animation
    gsap.to(ballRef.current, {
      scale: showBall ? 1.5 : 0,
      opacity: showBall ? 1 : 0,
      duration: 0.3,
      ease: showBall ? 'back.out(1.7)' : 'power2.in',
    });

    // Wicket Animation
    gsap.to(wicketRef.current, {
      scale: showWicket ? 1 : 0,
      opacity: showWicket ? 1 : 0,
      duration: 0.3,
      ease: showWicket ? 'back.out(1.7)' : 'power2.in',
    });
  }, [cursorType, isLargeScreen]);

  // Effect to create and manage the cursor element
  useEffect(() => {
    if (!isLargeScreen) {
      document.body.style.cursor = 'auto';
      return;
    }

    const cursor = document.createElement('div');
    cursorRef.current = cursor;

    cursor.innerHTML = `
      <div class="cricket-cursor-container">
        <svg width="60" height="60" viewBox="0 0 60 60" class="bat-svg">
          <defs>
            <linearGradient id="willow-gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#f4ead7"/><stop offset="50%" style="stop-color:#deb887"/><stop offset="100%" style="stop-color:#b8956d"/></linearGradient>
            <filter id="bat-shadow"><feDropShadow dx="2" dy="4" stdDeviation="3" flood-color="rgba(0,0,0,0.5)"/></filter>
          </defs>
          <path d="M30 5 C34.5 5, 38 7, 40 10.5 C42 14, 42.2 18, 42.2 22 L42.2 36 C42.2 39.5, 41 42, 38.5 43.8 C36 45.6, 32 46, 30 46 C28 46, 24 45.6, 21.5 43.8 C19 42, 17.8 39.5, 17.8 36 L17.8 22 C17.8 18, 18 14, 20 10.5 C22 7, 25.5 5, 30 5 Z" fill="url(#willow-gradient)" stroke="#a0522d" stroke-width="1" filter="url(#bat-shadow)" transform="rotate(15 30 25.5)"/>
          <rect x="28.5" y="46" width="5" height="14" rx="2.5" fill="#8b4513" stroke="#3a2c17" stroke-width="0.6" transform="rotate(15 31 53)"/>
          <rect x="29" y="48.5" width="4" height="9.5" rx="2" fill="#3a2f2a" stroke="#1a120f" stroke-width="0.5" transform="rotate(15 31 53)"/>
        </svg>

        <div class="ball-container">
            <div class="cricket-ball" style="width: 24px; height: 24px; background: radial-gradient(circle at 25% 25%, white, #b71c1c 70%, #8b0000); border-radius: 50%; box-shadow: 2px 2px 5px rgba(0,0,0,0.5), inset 1px 1px 2px white; position: relative;">
                <div style="position: absolute; top: 50%; left: 10%; right: 10%; height: 2px; background: #333; transform: translateY(-50%);"></div>
            </div>
        </div>
        
        <svg width="60" height="60" viewBox="0 0 60 60" class="wicket-svg">
            <defs>
              <linearGradient id="wicket-gradient" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#e2b789" /><stop offset="100%" stop-color="#c89b6c" /></linearGradient>
              <filter id="wicket-shadow"><feDropShadow dx="1" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.4)"/></filter>
            </defs>
            <rect x="28" y="10" width="4" height="40" rx="2" fill="url(#wicket-gradient)" filter="url(#wicket-shadow)"/>
            <rect x="27" y="8" width="6" height="3" rx="1.5" fill="#a0522d" />
        </svg>
      </div>
    `;
    
    const style = document.createElement('style');
    style.id = 'cricket-cursor-styles';
    style.textContent = `
      body, a, button, [role="button"], input, select, textarea {
        cursor: none !important;
      }
      .cricket-cursor-container {
        position: relative;
        width: 60px;
        height: 60px;
        pointer-events: none;
      }
      .bat-svg, .ball-container, .wicket-svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .bat-svg {
        transform-origin: 50% 85%; /* Pivot point for bat swing effect */
      }
    `;
    
    document.head.appendChild(style);

    cursor.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      pointer-events: none;
      z-index: 10000;
      transform: translate(-50%, -50%);
    `;

    document.body.appendChild(cursor);
    
    batRef.current = cursor.querySelector('.bat-svg');
    ballRef.current = cursor.querySelector('.ball-container');
    wicketRef.current = cursor.querySelector('.wicket-svg');

    const updateCursorPosition = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: 'power2.out',
      });
    };

    document.addEventListener('mousemove', updateCursorPosition, { passive: true });

    return () => {
      document.body.style.cursor = 'auto';
      document.removeEventListener('mousemove', updateCursorPosition);
      const styleElement = document.getElementById('cricket-cursor-styles');
      if (cursor?.parentNode) cursor.parentNode.removeChild(cursor);
      if (styleElement?.parentNode) styleElement.parentNode.removeChild(styleElement);
    };
  }, [isLargeScreen]);

  return null;
}

export default CricketCursor;