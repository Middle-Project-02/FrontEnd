import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import LoginModal from '@/components/modals/LoginModal';
import CategoryButton from '@/components/home/CategoryButton';
import PlanRankingSkeleton from '@/components/skeleton/home/PlanRankingSkeleton';
import { CATEGORY_LIST, REQUIRED_LOGIN, ROUTE_MAP } from '@/constants/home';
import { BUTTON_TEXTS, LOGIN_MODAL } from '@/constants/modalMessage';
import { PATH } from '@/constants/path';
import useAuthStore from '@/stores/authStore';
import useModalStore from '@/stores/modalStore';
import useFontModeStore from '@/stores/fontModeStore';
import useRankDetailQuery from '@/hooks/queries/ranking/useRankDetailQuery';
import { LandingDog } from '@/assets/svg';

const HomePage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();
  const { setModal, removeModal } = useModalStore();
  const { fontMode, setFontMode } = useFontModeStore();
  const randomId = useMemo(() => {
    return Math.floor(Math.random() * 120) + 1;
  }, []);
  const { rankDetailResponse, isLoading } = useRankDetailQuery(randomId);

  const handleClick = (title: string) => {
    const path = ROUTE_MAP[title as keyof typeof ROUTE_MAP];

    if (REQUIRED_LOGIN.includes(title)) {
      if (isLoggedIn) {
        navigate(path);
      } else {
        setModal(
          <LoginModal
            title={LOGIN_MODAL.TITLE}
            description={LOGIN_MODAL.DESCRIPTION}
            primaryText={BUTTON_TEXTS.LOGIN}
            secondaryText={BUTTON_TEXTS.CANCEL}
            onPrimary={() => {
              localStorage.setItem('redirectAfterLogin', path);
              removeModal();
              navigate(PATH.LOGIN);
            }}
          />,
        );
      }
    } else {
      navigate(path);
    }
  };

  return (
    <div className="flex flex-col h-full w-full max-w-[360px] pl-30 pr-30 pt-44 pb-24 gap-24 overflow-y-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-heading-h2 text-black font-semibold">투게더</h2>
        <div className="flex items-center gap-8">
          <Switch
            id="font-mode"
            checked={fontMode}
            onCheckedChange={(value) => {
              setFontMode(value);
            }}
          />
          <Label
            htmlFor="font-mode"
            className={`text-black ${fontMode ? 'text-body-lg' : 'text-body-sm'}`}
          >
            {fontMode ? '큰 글씨' : '일반 글씨'}
          </Label>
        </div>
      </div>

      <div className="flex border border-borderSecondary bg-bgTertiary rounded-16 px-20 py-30 items-center">
        <div className="flex flex-col flex-1 gap-16">
          <p
            className={`font-semibold leading-tight ${fontMode ? 'text-heading-h3' : 'text-heading-h4'}`}
          >
            나에게 맞는 요금제를 <br /> 찾아보세요!
          </p>
          <Button
            variant="default"
            size={fontMode ? 'md' : 'sm'}
            onClick={() => handleClick(CATEGORY_LIST[0].title)}
          >
            챗봇에게 추천받기
          </Button>
        </div>
        {!fontMode && <img src={LandingDog} className="max-w-[35%] aspect-square object-contain" />}
      </div>

      {!fontMode && (
        <div className="flex flex-col gap-8">
          <Button
            className="flex items-center py-8 px-8 gap-8 w-fit"
            variant="ghost"
            size="md"
            onClick={() => navigate(PATH.RANKING.AGE_SELECT)}
          >
            <h4 className="text-heading-h4 font-semibold">요금제 랭킹</h4>
            <ChevronRight />
          </Button>

          {isLoading || !rankDetailResponse ? (
            <PlanRankingSkeleton />
          ) : (
            <div className="flex flex-col px-16 py-20 gap-8 border border-borderSecondary bg-bgTertiary rounded-16 shadow-shadow2 h-[165px]">
              <p className="text-body-lg font-semibold text-black">{rankDetailResponse.name}</p>
              <div className="flex flex-col gap-20">
                <div className="flex flex-col">
                  <p className="text-body-md font-semibold text-black">
                    데이터 {rankDetailResponse.dataAmount}
                  </p>
                  <div className="flex items-center gap-8">
                    <p className="text-body-sm font-semibold text-textSecondary">
                      통화 {rankDetailResponse.allBenefits.음성통화?.split('(')[0].trim()}
                    </p>
                    <span className="w-[1px] h-[12px] bg-borderSecondary" />
                    <p className="text-body-sm font-semibold text-textSecondary">
                      문자 {rankDetailResponse.allBenefits.문자메시지}
                    </p>
                  </div>
                </div>
                <p className="text-body-md font-semibold text-primary text-right">
                  {rankDetailResponse.regularPrice}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex flex-col gap-16 w-full">
        <CategoryButton
          fontMode={fontMode}
          title={CATEGORY_LIST[0].title}
          iconName={CATEGORY_LIST[0].icon}
          fullWidth
          onClick={() => handleClick(CATEGORY_LIST[0].title)}
        />
        <div
          className={`grid gap-16 justify-items-center ${fontMode ? 'grid-cols-2' : 'grid-cols-3'}`}
        >
          {CATEGORY_LIST.slice(1).map((item) => (
            <CategoryButton
              key={item.title}
              fontMode={fontMode}
              title={item.title}
              iconName={item.icon}
              onClick={() => handleClick(item.title)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
