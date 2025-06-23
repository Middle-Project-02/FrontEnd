import BackButton from '@/components/common/BackButton';
import ConnectBadge from '@/components/chat/ConnectBadge';

const ChatHeader = () => {
  return (
    <div className="flex items-center justify-between px-2 py-3 text-base font-medium">
      <BackButton />
      <div className="flex items-center gap-3">
        <ConnectBadge connected />
      </div>
    </div>
  );
};

export default ChatHeader;
