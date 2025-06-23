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
        <div>
          <label className="text-body-md text-textSecondary">전화번호</label>
          <p className="text-body-md">{userInfo.memberId}</p>
        </div>

        <div>
          <label className="text-body-md text-textSecondary">이름</label>
          <Input
            value={editedInfo.nickname}
            onChange={(e) => handleInputChange('nickname', e.target.value)}
          />
        </div>

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
      </div>
      <div className="flex justify-end gap-8 mt-12">
        <Button onClick={onCancel} variant="secondary">
          취소하기
        </Button>
        <Button onClick={handleSave}>저장하기</Button>
      </div>
    </section>
  );
};

export default EditStep;
