import { LandingDog } from '@/assets/svg';

interface MicGuideOverlayProps {
  onClose: () => void;
}

const MicGuideOverlay = ({ onClose }: MicGuideOverlayProps) => {
  return (
    <div className="fixed inset-0 z-40" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 animate-fadeInBg" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative flex flex-col items-center">
          <div className="relative z-30 mb-6 opacity-0 animate-slideUpGuide">
            <div className="bg-white text-gray-800 text-sm rounded-2xl px-5 py-3 shadow-xl border border-gray-100 min-w-max">
              <div className="font-medium text-center">🎤 음성으로 질문해보세요!</div>
              <div className="text-xs text-gray-500 text-center mt-1">
                아래 마이크 버튼을 눌러 시작하세요
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                <div className="w-4 h-4 bg-white border-r border-b border-gray-100 rotate-45"></div>
              </div>
            </div>
          </div>

          <div className="relative z-20 w-[220px] h-[180px] mb-20 opacity-0 animate-slideUpGuide">
            <img src={LandingDog} alt="LandingDog" className="w-full h-full object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MicGuideOverlay;
