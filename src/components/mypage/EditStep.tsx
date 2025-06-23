import { MyPageUserInfo } from '@/types/user';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface EditStepProps {
  userInfo: MyPageUserInfo;
  onSave: (newInfo: MyPageUserInfo) => void;
  onCancel: () => void;
}

const EditStep = ({ userInfo, onSave, onCancel }: EditStepProps) => {
  const [editedInfo, setEditedInfo] = useState(userInfo);

  const handleInputChange = (field: keyof MyPageUserInfo, value: string | boolean) => {
    setEditedInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(editedInfo);
  };

  return (
    <section className="flex flex-col gap-12">
      <h1 className="text-heading-h3">내 정보</h1>
      <div className="flex flex-col px-16 py-20 gap-12 rounded-16 bg-bgTertiary border-borderSecondary border-1">
        {/* 전화번호 - 읽기 전용 */}
        <div>
          <label className="text-body-md text-textSecondary">전화번호</label>
          <p className="text-body-md">{userInfo.memberId}</p>
        </div>

        {/* 닉네임 - 수정 가능 */}
        <div>
          <label className="text-body-md text-textSecondary">이름</label>
          <Input
            value={editedInfo.nickname}
            onChange={(e) => handleInputChange('nickname', e.target.value)}
          />
        </div>

        {/* 글씨 크기 선택 */}
        <div>
          <label className="text-body-md text-textSecondary">글씨 크기</label>
          <div className="flex gap-8 mt-8">
            <Button
              variant={!editedInfo.fontMode ? 'default' : 'secondary'}
              onClick={() => handleInputChange('fontMode', false)}
            >
              보통 글씨
            </Button>
            <Button
              variant={editedInfo.fontMode ? 'default' : 'secondary'}
              onClick={() => handleInputChange('fontMode', true)}
            >
              큰 글씨
            </Button>
          </div>
        </div>

        {/* 저장/취소 */}
        <div className="flex flex-col gap-12">
          <Button onClick={handleSave} className="w-full">
            저장하기
          </Button>
          <Button onClick={onCancel} variant="secondary" className="w-full">
            취소하기
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EditStep;
