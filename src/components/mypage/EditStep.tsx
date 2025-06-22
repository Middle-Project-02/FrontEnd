import { MyPageUserInfo } from '@/types/user';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';

interface EditStepProps {
  userInfo: MyPageUserInfo;
  onSave: (newInfo: MyPageUserInfo) => void;
  onCancel: () => void;
}

const EditStep = ({ userInfo, onSave, onCancel }: EditStepProps) => {
  //폼 상태
  const [editedInfo, setEditedInfo] = useState(userInfo);

  const handleInputChange = (field: keyof MyPageUserInfo, value: string | boolean) => {
    setEditedInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(editedInfo); //부모의 전역 로직 호출
  };

  return (
    <>
      <section className="flex flex-col gap-12">
        <h1 className="text-heading-h3">내 정보</h1>
        <div className="flex flex-col px-16 py-20 gap-12 rounded-16 bg-bgTertiary border-borderSecondary border-1">
          {/* 전화번호 - 읽기 전용 */}
          <div>
            <label>전화번호</label>
            <p>{userInfo.memberId}</p>
          </div>

          {/* 닉네임 - 수정 가능 */}
          <div>
            <label>이름</label>
            <Input></Input>
          </div>

          {/* 글씨 크기 - on/off */}
          <div>
            <label>글씨 크기</label>
            <Button onClick={() => handleInputChange('fontMode', false)}>보통글씨</Button>
            <Button onClick={() => handleInputChange('fontMode', true)}>큰 글씨</Button>
          </div>

          {/* 취소 / 저장 버튼 */}
          <div className="flex flex-col gap-12">
            <Button onClick={handleSave} className="w-full">
              저장하기
            </Button>
            <Button onClick={onCancel} variant={'secondary'} className="w-full">
              취소하기
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditStep;
