const WaitingIndicator = () => (
  <div className="flex items-center justify-start">
    <div className="bg-gray-100 rounded-2xl px-4 py-3 max-w-xs">
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse [animation-delay:0s]" />
          <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse [animation-delay:0.2s]" />
          <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse [animation-delay:0.4s]" />
        </div>
      </div>
    </div>
  </div>
);

export default WaitingIndicator;