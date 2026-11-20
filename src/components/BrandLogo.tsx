interface BrandLogoProps {
  className?: string;
}

export function BrandLogo({className = ''}: BrandLogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 ${className}`}>
      <svg
        width="30"
        height="30"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect width="32" height="32" rx="8" fill="#0F172A" />
        <path
          d="M9 22.5V9.5L17.8 20.2V9.5"
          stroke="#FFFFFF"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21.5 9.5L23.5 22.5"
          stroke="#EC4899"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <circle cx="21.5" cy="9.5" r="1.5" fill="#F472B6" />
      </svg>
      <span className="font-sans text-xl font-bold tracking-tight text-slate-900">
        NEX<span className="text-pink-600">LIVO</span>
      </span>
    </span>
  );
}
