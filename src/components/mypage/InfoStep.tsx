import { MyPageUserInfo } from '@/types/user';
import { Button } from '@/components/ui/button';
import { ProfileDog } from '@/assets/svg';

interface InfoStepProps {
  userInfo: MyPageUserInfo;
  onEdit: () => void;
  onDelete: () => void;
}

const InfoStep = ({ userInfo, onEdit }: InfoStepProps) => {
  const getFontModeText = (fontMode: boolean) => {
    return fontMode ? '큰 글씨' : '보통 글씨';
  };

  return (
    <>
      <section className="flex flex-col h-full gap-16">
        <article className="w-[300px] h-[345px] flex flex-col items-center px-16 py-20 gap-28 rounded-16 bg-white border border-borderSecondary">
          <img
            src={ProfileDog}
            alt="프로필 이미지"
            className="w-100 h-100 rounded-full object-cover mt-16"
          />
          <h2 className="text-heading-h3 font-bold text-center">{userInfo.nickname}</h2>
          <div className="text-body-lg flex flex-col gap-28">
            <p>
              <span className="font-semibold">전화번호</span>{' '}
              <span className="ml-8">{userInfo.memberId}</span>
            </p>
            <p>
              <span className="font-semibold">글씨 크기</span>{' '}
              <span className="text-primary ml-8">{getFontModeText(userInfo.fontMode)}</span> 모드
              적용 중
            </p>
          </div>
        </article>

        <div className="w-full max-w-[360px] flex justify-end">
          <Button variant="default" size="md" onClick={onEdit}>
            수정하기
          </Button>
        </div>
      </section>
    </>
  );
};

export default InfoStep;
