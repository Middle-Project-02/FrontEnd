import { useEffect } from 'react';
import { SmartChoicePlanDto } from '@/types/smartChoicePlan';
import { makeToast } from '@/utils/makeToast';

declare global {
  interface Window {
    Kakao: any;
  }
}

export const useKakaoShare = (planInfo: SmartChoicePlanDto) => {
  const key = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(key);
    }
  }, [key]);

  const handleFallbackShare = () => {
    const message = `${planInfo.planName} 요금제 어때요?
💰 월 ${planInfo.price.toLocaleString()}원
📊 데이터: ${planInfo.data}
📞 통화: ${planInfo.voice}
💬 문자: ${planInfo.sms}
📡 통신망: ${planInfo.telecom}

이 요금제 괜찮은가요?`;

    if (navigator.share) {
      navigator
        .share({
          title: '요금제 추천 받았어요!',
          text: message,
        })
        .catch(() => {
          makeToast('공유가 어려워요.', 'warning');
        });
    } else {
      makeToast('공유가 지원되지 않는 환경이에요', 'warning');
    }
  };

  const share = () => {
    const isKakaoReady =
      typeof window !== 'undefined' &&
      window.Kakao &&
      typeof window.Kakao.isInitialized === 'function' &&
      window.Kakao.isInitialized();

    if (!isKakaoReady) {
      makeToast('카카오톡 공유 기능이 준비되지 않았어요.', 'warning');
      handleFallbackShare();
      return;
    }

    try {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: `${planInfo.planName} 요금제 어때요?`,
          description: `월 ${planInfo.price.toLocaleString()}원
통신망: ${planInfo.telecom}, 데이터: ${planInfo.data}
통화: ${planInfo.voice}, 문자: ${planInfo.sms}
`,
          imageUrl: 'https://i.ibb.co/23PJnGvY/0b5e446d-1e4b-4bed-92a4-cd2ce23e62fd.png',
          link: {
            mobileWebUrl: 'https://together2.netlify.app/',
            webUrl: 'https://together2.netlify.app/',
          },
        },
      });
    } catch (e) {
      console.error('카카오톡 공유 중 오류 발생:', e);
      handleFallbackShare();
    }
  };
  return { share };
};
