import { cn } from '@/lib/utils';

interface ConnectBadgeProps {
  connected: boolean;
}

const ConnectBadge = ({ connected }: ConnectBadgeProps) => {
  const baseStyle = 'text-body-xs font-medium px-12 py-4 rounded-12';

  const statusStyle = connected ? 'text-success bg-green-100' : 'text-error bg-red-100';

  return <span className={cn(baseStyle, statusStyle)}>{connected ? '연결됨' : '연결 끊김'}</span>;
};

export default ConnectBadge;
