import BackButton from '@/components/common/BackButton';
import { Button } from '@/components/ui/button';

const MyPage = () => {
  return (
    <main className="pt-44 px-30 flex flex-col gap-24">
      <BackButton />
      <section className="flex flex-col gap-12">
        <h1 className="text-heading-h3">내 정보</h1>
        <article className="flex flex-col px-16 py-20 gap-12 rounded-16 bg-bgTertiary border-borderSecondary border-1">
          <h2 className="text-body-lg font-semibold">김테스트</h2>
          <p className="text-body-md">전화번호</p>
          <p className="text-body-md">글씨 크기</p>
          <div className="flex justify-end">
            <Button variant="default" size="md">
              수정하기
            </Button>
          </div>
        </article>
      </section>
      <section className="flex justify-between items-center">
        <div className="flex flex-col gap-6">
          <h2 className="text-body-md font-semibold">회원 탈퇴</h2>
          <p className="text-body-sm text-textSecondary">
            탈퇴 시 모든 데이터가
            <br />
            삭제되며 복구되지 않습니다.
          </p>
        </div>
        <Button variant="secondary" size="md">
          탈퇴하기
        </Button>
      </section>
    </main>
  );
};

export default MyPage;
