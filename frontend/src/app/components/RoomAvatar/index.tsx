import { useState } from "react";

interface RoomAvatarProps {
  label: string;
  imageUrl: string | null;
  isSelected: boolean;
  onClick: () => void;
}

function RoomAvatar({ label, imageUrl, isSelected, onClick }: RoomAvatarProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative flex items-center">
      <button
        onClick={onClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`
          w-10 h-10 rounded-full overflow-hidden shrink-0 transition-all
          ${isSelected
            ? "ring-2 ring-purple ring-offset-2 ring-offset-woodsmoke"
            : "hover:ring-2 hover:ring-gray-500 hover:ring-offset-2 hover:ring-offset-woodsmoke"
          }
        `}
      >
        {imageUrl ? (
          <img src={imageUrl} alt={label} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-charade flex items-center justify-center text-white text-xs font-bold">
            {label.charAt(0).toUpperCase()}
          </div>
        )}
      </button>

      {/* Tooltip */}
      {showTooltip && (
        <div className="fixed z-9999 left-20 bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap pointer-events-none">
          {label}
        </div>
      )}
    </div>
  );
}

export default RoomAvatar;