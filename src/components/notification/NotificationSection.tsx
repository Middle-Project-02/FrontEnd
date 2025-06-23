interface NotificationSectionProps {
  title: string;
  content: string;
  icon: string;
  alt: string;
}

const NotificationSection = ({ title, content, icon, alt }: NotificationSectionProps) => {
  return (
    <section className="mb-[16px]">
      <div className="flex items-center gap-[6px] mb-[6px]">
        <img src={icon} alt={alt} />
        <h4 className="text-heading-h4 font-semibold">{title}</h4>
      </div>
      <div className="bg-white rounded-16 border shadow4 py-20 px-16 mb-5 max-w-[300px] text-body-lg">
        {content}
      </div>
    </section>
  );
};

export default NotificationSection;
