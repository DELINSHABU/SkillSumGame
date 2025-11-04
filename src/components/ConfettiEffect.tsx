'use client';

import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  left: number;
  color: string;
  delay: number;
  xOffset: number;
}

export const ConfettiEffect = React.memo(function ConfettiEffect() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = ['#ff80ab', '#80cbc4', '#ffeb3b', '#a5d6a7', '#ce93d8', '#90caf9'];
    const newParticles: Particle[] = [];

    // Create 20 confetti particles
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: i,
        left: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.2,
        xOffset: (Math.random() - 0.5) * 200
      });
    }

    setParticles(newParticles);

    // Clear particles after animation
    const timer = setTimeout(() => {
      setParticles([]);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="confetti-particle"
          style={{
            left: `${particle.left}%`,
            top: '-10px',
            backgroundColor: particle.color,
            animationDelay: `${particle.delay}s`,
            '--x': `${particle.xOffset}px`
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
});
