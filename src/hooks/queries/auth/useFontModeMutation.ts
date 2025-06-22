import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { patchFontMode } from '@/apis/auth';
import { PATH } from '@/constants/path';
import { makeToast } from '@/utils/makeToast';

const useFontModeMutation = () => {
  const navigate = useNavigate();

  const patchFontModeMutation = useMutation({
    mutationFn: patchFontMode,
    onSuccess: () => {
      navigate(PATH.HOME, { replace: true });
    },
    onError: () => {
      makeToast('글씨 크기 설정에 실패했어요. 잠시 후 다시 시도해 주세요.', 'warning');
    },
  });

  return { mutatePatchFontMode: patchFontModeMutation.mutate };
};

export default useFontModeMutation;
