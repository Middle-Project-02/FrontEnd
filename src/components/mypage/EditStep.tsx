import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { MyPageUserInfo } from '@/types/user';
import { ProfileDog } from '@/assets/svg';
import { X, LoaderCircle, Check } from 'lucide-react';

interface EditStepProps {
  userInfo: MyPageUserInfo;
  onSave: (newInfo: MyPageUserInfo, onDone: () => void) => void;
  onCancel: () => void;
  onDelete: () => void;
}

type SaveState = 'idle' | 'saving' | 'success';

const FontModeOption = ({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) => (
  <label
    className={`flex items-center gap-8 cursor-pointer text-heading-h4 ${
      checked ? 'text-primary font-bold' : 'text-black font-medium'
    }`}
  >
    <input
      type="radio"
      name="fontMode"
      checked={checked}
      onChange={onChange}
      className="w-24 h-24 accent-primary"
    />
    {label}
  </label>
);

const EditStep = ({ userInfo, onSave, onCancel, onDelete }: EditStepProps) => {
  const [editedInfo, setEditedInfo] = useState(userInfo);
  const [saveState, setSaveState] = useState<SaveState>('idle');

  const handleInputChange = (field: keyof MyPageUserInfo, value: string | boolean) => {
    setEditedInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setSaveState('saving');
    onSave(editedInfo, () => {
      setSaveState('success');
      setTimeout(() => setSaveState('idle'), 1500);
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-40 z-40"
        onClick={onCancel}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.section
        className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl px-24 pt-20 pb-32 flex flex-col items-center w-[360px] h-[590px] mx-auto gap-35"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div className="flex justify-between items-center w-full">
          <button onClick={onCancel}>
            <X className="w-24 h-24 text-textSecondary" />
          </button>

          {saveState === 'saving' && (
            <div className="flex items-center gap-8 text-body-md text-primary">
              <LoaderCircle className="w-20 h-20 animate-spin" />
              저장 중...
            </div>
          )}

          {saveState === 'success' && (
            <div className="flex items-center gap-8 text-body-md text-success font-semibold">
              <Check className="w-20 h-20" />
              저장 완료
            </div>
          )}

          {saveState === 'idle' && (
            <Button size="sm" onClick={handleSave}>
              저장하기
            </Button>
          )}
        </div>

        <img
          src={ProfileDog}
          alt="프로필 이미지"
          className="w-100 h-100 rounded-full object-cover mt-36 mb-36"
        />

        <div className="flex flex-col gap-36 w-full">
          <div className="flex items-center gap-12">
            <label className="text-heading-h3 font-semibold w-[100px] shrink-0">전화번호</label>
            <p className="text-body-lg font-semibold">{userInfo.memberId}</p>
          </div>

          <div className="flex items-center gap-12">
            <label className="text-heading-h3 w-[100px] font-semibold shrink-0">이름</label>
            <Input
              value={editedInfo.nickname}
              onChange={(e) => handleInputChange('nickname', e.target.value)}
              className="flex-1 font-semibold"
            />
          </div>

          <div className="flex flex-col gap-12 font-semibold">
            <div className="flex items-center gap-12">
              <label className="text-heading-h3 w-[100px] shrink-0">글씨 크기</label>
              <FontModeOption
                label="큰 글씨"
                checked={editedInfo.fontMode === true}
                onChange={() => handleInputChange('fontMode', true)}
              />
            </div>

            <div className="flex items-center gap-12">
              <div className="w-[100px]" />
              <FontModeOption
                label="보통 글씨"
                checked={editedInfo.fontMode === false}
                onChange={() => handleInputChange('fontMode', false)}
              />
            </div>
          </div>
        </div>

        <div className="mt-auto w-full border-t border-borderSecondary pt-16 flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <h1 className="text-body-md font-semibold">회원 탈퇴</h1>
            <p className="text-body-sm text-textSecondary whitespace-pre-line">
              탈퇴 시 모든 데이터가 삭제되며{'\n'}복구되지 않습니다.
            </p>
          </div>
          <Button variant="secondary" size="md" onClick={onDelete}>
            탈퇴하기
          </Button>
        </div>
      </motion.section>
    </AnimatePresence>
  );
};

export default EditStep;
