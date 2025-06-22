interface AgeSelectButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const AgeSelectButton = ({ label, isSelected, onClick }: AgeSelectButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-full h-full rounded-16 text-body-lg font-bold ${
        isSelected
          ? 'border-primary border-2 bg-bgTertiary text-primary'
          : 'border border-borderSecondary bg-white'
      }`}
    >
      {label}
    </button>
  );
};

export default AgeSelectButton;
