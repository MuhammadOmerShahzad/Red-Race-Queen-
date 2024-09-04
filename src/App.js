import React, { useState, useEffect, useRef } from 'react';
import './RedQueenRace.css';

const RedQueensRace = () => {
  const [alicePlaybackRate, setAlicePlaybackRate] = useState(1);
  
  const background1Ref = useRef(null);
  const background2Ref = useRef(null);
  const foreground1Ref = useRef(null);
  const foreground2Ref = useRef(null);
  const redQueenAliceRef = useRef(null);
  
  
  useEffect(() => {
    const sceneryFrames = [
      { transform: 'translateX(100%)' },
      { transform: 'translateX(-100%)' }
    ];

    const sceneryTimingBackground = {
      duration: 36000,
      iterations: Infinity
    };

    const sceneryTimingForeground = {
      duration: 12000,
      iterations: Infinity
    };

    const background1Movement = background1Ref.current.animate(sceneryFrames, sceneryTimingBackground);
    background1Movement.currentTime = background1Movement.effect.getTiming().duration / 2;

    const background2Movement = background2Ref.current.animate(sceneryFrames, sceneryTimingBackground);

    const foreground1Movement = foreground1Ref.current.animate(sceneryFrames, sceneryTimingForeground);
    foreground1Movement.currentTime = foreground1Movement.effect.getTiming().duration / 2;

    const foreground2Movement = foreground2Ref.current.animate(sceneryFrames, sceneryTimingForeground);

    const spriteFrames = [
      { transform: 'translateY(0)' },
      { transform: 'translateY(-100%)' }
    ];

    const redQueenAliceMovement = redQueenAliceRef.current.animate(spriteFrames, {
      easing: 'steps(7, end)',
      direction: "reverse",
      duration: 600,
      playbackRate: 1,
      iterations: Infinity
    });

    const sceneries = [foreground1Movement, foreground2Movement, background1Movement, background2Movement];

    const adjustBackgroundPlayback = () => {
      if (redQueenAliceMovement.playbackRate < 0.8) {
        sceneries.forEach((anim) => {
          anim.playbackRate = redQueenAliceMovement.playbackRate / 2 * -1;
        });
      } else if (redQueenAliceMovement.playbackRate > 1.2) {
        sceneries.forEach((anim) => {
          anim.playbackRate = redQueenAliceMovement.playbackRate / 2;
        });
      } else {
        sceneries.forEach((anim) => {
          anim.playbackRate = 0;
        });
      }
    };

    adjustBackgroundPlayback();

    const decayInterval = setInterval(() => {
      if (redQueenAliceMovement.playbackRate > 0.4) {
        redQueenAliceMovement.playbackRate *= 0.9;
      }
      adjustBackgroundPlayback();
    }, 3000);

    const goFaster = () => {
      redQueenAliceMovement.playbackRate *= 1.1;
      adjustBackgroundPlayback();
    };

    document.addEventListener("click", goFaster);
    document.addEventListener("touchstart", goFaster);

    return () => {
      clearInterval(decayInterval);
      document.removeEventListener("click", goFaster);
      document.removeEventListener("touchstart", goFaster);
    };
  }, []);

  return (
    <div className="race-container">
      <div className="background" ref={background1Ref} id="background1"></div>
      <div className="background" ref={background2Ref} id="background2"></div>
      <div className="foreground" ref={foreground1Ref} id="foreground1"></div>
      <div className="foreground" ref={foreground2Ref} id="foreground2"></div>
      <div className="red-queen-alice" ref={redQueenAliceRef} id="red-queen_and_alice_sprite">
        🏃‍♀️ Alice and 👑 Queen
      </div>
    </div>
  );
};

export default RedQueensRace;
