import { ReactNode } from 'react';

interface BaseModalLayoutProps {
  icon: string;
  title: string;
  description?: string;
  children: ReactNode;
}

const BaseModalLayout = ({ icon, title, description, children }: BaseModalLayoutProps) => {
  return (
    <div className="flex flex-col justify-center items-center text-center gap-[16px] break-keep">
      <img src={icon} alt="confirm" />
      <div className="flex flex-col gap-3">
        <h4 className="text-heading-h4 font-semibold">{title}</h4>
        {description && <p className="text-body-md">{description}</p>}
      </div>
      <div className="flex flex-row gap-5">{children}</div>
    </div>
  );
};

export default BaseModalLayout;
