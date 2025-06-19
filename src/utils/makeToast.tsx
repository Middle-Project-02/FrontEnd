import { toast } from 'sonner';
import { Success, Warning } from '@/assets/svg';

type ToastVariant = 'success' | 'warning';

export const makeToast = (message: string, variant: ToastVariant) => {
  toast.custom(
    () => (
      <div className="flex items-center w-[300px] gap-12 px-20 py-12 rounded-12 bg-[#737373] shadow-shadow2">
        <img src={variant === 'success' ? Success : Warning} alt={variant} />
        <span className="text-body-md font-semibold text-white">{message}</span>
      </div>
    ),
    {
      duration: 3000,
    },
  );
};
