interface NotificationSectionProps {
  title: string;
  content: string;
  icon: string;
  alt: string;
}

const NotificationSection = ({ title, content, icon, alt }: NotificationSectionProps) => {
  return (
    <section className="w-full max-w-[320px] space-y-12">
      <div className="flex items-center gap-8">
        <img src={icon} alt={alt} />
        <h4 className="text-heading-h4 font-semibold">{title}</h4>
      </div>
      <div className="bg-white rounded-16 border shadow-shadow2 p-20 mb-5 text-body-lg leading-relaxed">
        {content}
      </div>
    </section>
  );
};

export default NotificationSection;
