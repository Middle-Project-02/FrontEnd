import { ICON_MAP } from '@/constants/home';

interface CategoryButtonProps {
  fontMode: boolean;
  title: string;
  iconName: string;
  fullWidth?: boolean;
  onClick?: () => void;
}

const CategoryButton = ({ fontMode, title, iconName, fullWidth, onClick }: CategoryButtonProps) => {
  const iconSrc = ICON_MAP[iconName as keyof typeof ICON_MAP];
  const heightClass = fullWidth ? (fontMode ? 'h-[140px]' : 'h-[90px]') : 'aspect-square';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative w-full ${heightClass} rounded-16 border border-borderSecondary p-16 shadow-shadow2 text-left
        ${fontMode && 'flex flex-col items-center justify-center'}
        active:scale-95 active:opacity-60 transition-all duration-100 ease-in-out
      `}
    >
      {fontMode ? (
        <>
          <img src={iconSrc} alt="icon" className="w-[70px] h-[70px] mb-4" />
          <p className="text-body-lg font-bold text-black text-center">{title}</p>
        </>
      ) : (
        <>
          <p className="absolute top-16 left-16 right-16 text-body-md font-bold text-black leading-[1.1] ">
            {title}
          </p>
          <img
            src={iconSrc}
            alt="icon"
            className={`absolute bottom-12 right-16  ${fullWidth ? 'w-[68px] h-[68px]' : 'w-[30px] h-[30px]'}`}
          />
        </>
      )}
    </button>
  );
};

export default CategoryButton;
