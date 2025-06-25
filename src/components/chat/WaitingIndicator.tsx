const WaitingIndicator = () => (
  <div className="flex items-center justify-start">
    <div className="bg-gray-100 rounded-2xl px-16 py-16 max-w-md">
      <div className="flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse [animation-delay:0s]" />
          <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse [animation-delay:0.2s]" />
          <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse [animation-delay:0.4s]" />
        </div>
      </div>
    </div>
  </div>
);

export default WaitingIndicator;
