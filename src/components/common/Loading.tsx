import { LoadingDog } from '@/assets/svg';

const Loading = () => {
  return (
    <div className="flex flex-col h-full min-h-screen justify-center items-center text-center">
      <img src={LoadingDog} alt="로딩" className="w-full" />
      <h3 className="text-heading-h3 font-semibold">
        정보를 가지고 오고 있어요
        <br />
        조금만 기다려주세요!
      </h3>
    </div>
  );
};

export default Loading;
