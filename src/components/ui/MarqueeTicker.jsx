import React from 'react';

export default function MarqueeTicker({
  items = [],
  renderItem,
  speed = 25,
  direction = 'left',
  pauseOnHover = true,
  className = '',
}) {
  const duplicated = [...items, ...items];
  const animClass =
    direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse';

  return (
    <div
      className={`relative w-full max-w-full overflow-hidden ${className}`}
      data-testid="marquee-ticker"
    >
      {/* Edge Gradient Fade Masks */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-background to-transparent z-10" />

      {/* Scrolling Track */}
      <div
        className={`flex items-center gap-4 w-max py-2 ${animClass} ${
          pauseOnHover ? 'hover:[animation-play-state:paused]' : ''
        }`}
        style={{ animationDuration: `${speed}s` }}
      >
        {duplicated.map((item, idx) => (
          <React.Fragment key={idx}>
            {renderItem ? (
              renderItem(item, idx)
            ) : (
              <span className="px-4 py-2 rounded-full border border-border bg-surface/50 text-sm font-mono text-text-primary whitespace-nowrap">
                {item.name || item}
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
