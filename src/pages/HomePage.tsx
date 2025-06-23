import { useRef, useState, useLayoutEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Play, Pause } from 'lucide-react';
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
import useRankAgeGroupQuery from '@/hooks/queries/ranking/useRankAgeGroupQuery';
import useFixedFontSize from '@/hooks/useFixedFontSize';
import { LandingDog } from '@/assets/svg';

const HomePage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();
  const { setModal, removeModal } = useModalStore();
  const { fontMode, setFontMode } = useFontModeStore();
  const randomAgeGroup = useMemo(() => Math.floor(Math.random() * 6) + 1, []);
  const { RankingPlanListResponse, isLoading } = useRankAgeGroupQuery(randomAgeGroup);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAutoSliding, setIsAutoSliding] = useState(true);

  useFixedFontSize();

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

  useLayoutEffect(() => {
    if (!isAutoSliding || !scrollRef.current || !RankingPlanListResponse) return;

    const container = scrollRef.current;
    const speed = 0.8;
    let animationFrameId: number;

    const animate = () => {
      if (!container) return;

      container.scrollLeft += speed;

      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 1) {
        container.scrollLeft = 0;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isAutoSliding, RankingPlanListResponse, fontMode]);

  return (
    <div className="flex flex-col h-full w-full max-w-[360px] pl-30 pr-30 pt-44 pb-24 gap-24 overflow-y-auto no-scrollbar">
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

      <div className="flex border border-borderSecondary bg-bgTertiary rounded-16 px-20 py-30 items-center shadow-shadow2">
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
            onClick={() => navigate(PATH.RANKING.MAIN)}
          >
            <h4 className="text-heading-h4 font-semibold">요금제 랭킹</h4>
            <ChevronRight />
          </Button>

            <button
              onClick={() => setIsAutoSliding((prev) => !prev)}
              className="flex items-center justify-center bg-primary text-white rounded-full w-24 h-24"
            >
              {isAutoSliding ? (
                <Pause size={12} className="text-white fill-white" />
              ) : (
                <Play size={12} className="text-white fill-white" />
              )}
            </button>
          </div>

          {isLoading || !RankingPlanListResponse ? (
            <PlanRankingSkeleton />
          ) : (
            <div
              ref={scrollRef}
              className="overflow-x-auto no-scrollbar px-6 h-[170px] whitespace-nowrap"
            >
              <div className="flex w-fit gap-20">
                {RankingPlanListResponse.plans.slice(0, 10).map((plan) => (
                  <div
                    key={plan.id}
                    className="flex flex-col shrink-0 w-[85vw] max-w-[240px] h-[165px] px-16 py-20 gap-8 border border-borderSecondary bg-bgTertiary rounded-16 shadow-shadow2 snap-center"
                    onClick={() => setIsAutoSliding(false)}
                    onTouchStart={() => setIsAutoSliding(false)}
                  >
                    <p className="text-body-lg font-semibold text-black">{plan.name}</p>
                    <div className="flex flex-col justify-between flex-1">
                      <div className="flex flex-col">
                        <p className="text-body-md font-semibold text-black">
                          데이터 {plan.dataAmount}
                        </p>
                        {plan.sharedData && (
                          <p className="text-body-sm font-semibold text-textSecondary">
                            {plan.sharedData}
                          </p>
                        )}
                      </div>
                      <p className="text-body-md font-semibold text-primary text-right">
                        {plan.regularPrice}
                      </p>
                    </div>
                  </div>
                ))}
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
