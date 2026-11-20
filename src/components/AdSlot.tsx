interface AdSlotProps {
  slotId: string;
  variant: 'leaderboard' | 'in-feed' | 'article-inline' | 'article-sidebar';
  className?: string;
}

const SLOT_CONFIG = {
  leaderboard: {
    containerClass: 'min-h-[96px] sm:min-h-[108px] w-full',
    dimensions: '728×90 / 970×90 Responsive Leaderboard',
  },
  'in-feed': {
    containerClass: 'min-h-[112px] sm:min-h-[124px] w-full',
    dimensions: 'Responsive Section Banner',
  },
  'article-inline': {
    containerClass: 'min-h-[120px] sm:min-h-[140px] w-full',
    dimensions: 'Responsive In-Article Display',
  },
  'article-sidebar': {
    containerClass: 'min-h-[260px] w-full',
    dimensions: '300×250 / 300×600 Sidebar Unit',
  },
};

/**
 * RevBid Ad Placeholder Component
 * --------------------------------
 * Ready for future RevBid script / ad-unit injection.
 * Replace the inner placeholder markup with the live RevBid container tag
 * matching `data-ad-slot={slotId}` once your RevBid publisher ID is active.
 */
export function AdSlot({slotId, variant, className = ''}: AdSlotProps) {
  const config = SLOT_CONFIG[variant];

  return (
    <aside
      aria-label={`Advertisement slot ${slotId}`}
      data-ad-provider="revbid"
      data-ad-slot={slotId}
      data-ad-variant={variant}
      className={`rounded-xl border border-dashed border-pink-200/90 bg-pink-50/35 px-4 py-4 flex flex-col items-center justify-center text-center ${config.containerClass} ${className}`}
    >
      <span className="text-[11px] font-semibold uppercase tracking-wider text-pink-700/80">
        Advertisement Space
      </span>
      <p className="mt-1 text-xs text-slate-500">
        RevBid Ad Placement · Slot <span className="font-mono text-slate-700">{slotId}</span> ·{' '}
        {config.dimensions}
      </p>
    </aside>
  );
}
