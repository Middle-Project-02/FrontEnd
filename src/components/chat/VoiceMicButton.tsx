interface VoiceMicButtonProps {
  isListening: boolean;
  isDisabled: boolean;
  onClick: () => void;
}

const VoiceMicButton = ({ isListening, isDisabled, onClick }: VoiceMicButtonProps) => {
  return (
    <div className="relative flex items-center justify-center">
      {isListening && (
        <div className="absolute w-52 h-52 rounded-full bg-blue-400 opacity-30 animate-ping" />
      )}

      <button
        onClick={onClick}
        disabled={isDisabled}
        className={`
          w-28 h-28 rounded-full flex items-center justify-center z-10 shadow-xl
          transition-all duration-300
          ${isDisabled ? 'bg-gray-300 text-gray-400 cursor-not-allowed' : ''}
          ${isListening ? 'bg-gradient-to-br from-blue-600 to-blue-400 text-white' : 'bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:scale-105'}
        `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 14 0h-2zm-5 8c-1.104 0-2-.896-2-2h4c0 1.104-.896 2-2 2z" />
        </svg>
      </button>
    </div>
  );
};

export default VoiceMicButton;
