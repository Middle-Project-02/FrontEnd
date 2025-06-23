import { LandingDog } from '@/assets/svg';

const ListeningOverlay = () => {
  return (
    <div className="fixed inset-0 z-40 pointer-events-none">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

      <div className="absolute inset-0 flex flex-col items-center justify-center z-40">
        <div className="flex flex-col items-center gap-4 animate-fadeIn pointer-events-auto">
          <div className="bg-white text-gray-900 text-2xl font-bold rounded-2xl px-10 py-7 shadow-lg border border-gray-100 text-center animate-slideUpGuide">
            <div>🎤 듣고 있어요!</div>
            <div className="text-lg text-gray-500 mt-2">지금 말씀해주시면 바로 도와드릴게요</div>
          </div>
          <div className="w-[300px] h-[240px] animate-fadeInSlow">
            <img src={LandingDog} alt="LandingDog" className="w-full h-full object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListeningOverlay;
