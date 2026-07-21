const Logo = ({ height = 40 }: { height?: number }) => (
  <svg viewBox="0 0 480 120" style={{ height: `${height}px`, width: 'auto' }} xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(0, 0)">
      {/* Yellow Ticket */}
      <path d="M20,10 h60 a5,5 0 0,1 5,5 v35 a5,5 0 0,1 -5,5 h-60 a5,5 0 0,1 -5,-5 v-35 a5,5 0 0,1 5,-5 z" fill="#F0C020" />
      <rect x="25" y="15" width="50" height="25" rx="3" fill="#F4D03F" />
      
      {/* Red Reel */}
      <path d="M15,65 a35,35 0 1,0 70,0 a35,35 0 1,0 -70,0 z" fill="#D31D28" />
      <circle cx="50" cy="65" r="8" fill="#fff" />
      <circle cx="25" cy="50" r="5" fill="#fff" />
      <circle cx="75" cy="50" r="5" fill="#fff" />
      <circle cx="30" cy="85" r="5" fill="#fff" />
      <circle cx="70" cy="85" r="5" fill="#fff" />
      <circle cx="50" cy="93" r="5" fill="#fff" />
      
      {/* Red Arrow */}
      <path d="M15,55 L75,45 L70,30 L110,52 L70,74 L75,59 L15,63 Z" fill="#D31D28" stroke="#fff" strokeWidth="4" strokeLinejoin="round" />
    </g>
    {/* Text */}
    <text x="120" y="82" fill="#D31D28" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="75" letterSpacing="-2">Cinerush</text>
  </svg>
);

export default Logo;
