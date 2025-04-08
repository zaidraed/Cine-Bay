export const Logo = ({ className }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
      <path
        d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0zm0 30C8.268 30 2 23.732 2 16S8.268 2 16 2s14 6.268 14 14-6.268 14-14 14z"
        fill="currentColor"
        className="text-blue-500"
      />
      <path
        d="M22 10l-8 12-4-6"
        stroke="currentColor"
        strokeWidth="2"
        className="text-blue-500"
      />
    </svg>
    <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">
      CINE-BAY
    </span>
  </div>
);
