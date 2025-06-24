import { MyPageUserInfo } from '@/types/user';
import { Button } from '@/components/ui/button';

interface InfoStepProps {
  userInfo: MyPageUserInfo;
  onEdit: () => void;
  onDelete: () => void;
}

const InfoStep = ({ userInfo, onEdit, onDelete }: InfoStepProps) => {
  const getFontModeText = (fontMode: boolean) => {
    return fontMode ? '큰 글씨' : '보통 글씨';
  };

  return (
    <>
      <section className="flex flex-col gap-12">
        <h1 className="text-heading-h3 font-bold">내 정보</h1>
        <article className="flex flex-col px-16 py-20 gap-12 rounded-16 bg-bgTertiary border-borderSecondary border-1">
          <h2 className="text-heading-h4 font-bold">{userInfo.nickname}</h2>
          <h2 className="text-body-lg font-semibold">전화번호</h2>
          <p className="text-body-md">{userInfo.memberId}</p>
          <h2 className="text-body-lg font-semibold">글씨 크기</h2>
          <p className="text-body-md">
            현재 <span className="text-primary">{getFontModeText(userInfo.fontMode)} </span>적용
            중입니다.
          </p>
          <div className="flex justify-end">
            <Button variant="default" size="md" onClick={onEdit}>
              수정하기
            </Button>
          </div>
        </article>
      </section>

      <section className="flex justify-between items-center">
        <div className="flex flex-col gap-6">
          <h1 className="text-body-md font-semibold">회원 탈퇴</h1>
          <p className="text-body-sm text-textSecondary">
            탈퇴 시 모든 데이터가
            <br />
            삭제되며 복구되지 않습니다.
          </p>
        </div>
        <Button variant="secondary" size="md" onClick={onDelete}>
          탈퇴하기
        </Button>
      </section>
    </>
  );
};

export default InfoStep;
