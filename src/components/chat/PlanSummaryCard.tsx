import React from 'react';

interface PlanSummaryCardProps {
  title: string;
  content: string;
}

const PlanSummaryCard = ({ title, content }: PlanSummaryCardProps) => {
  return (
    <div className="flex flex-col items-start gap-16 p-20 pt-20 pr-30 pb-20 pl-30 rounded-16 bg-white w-full">
      <h2 className="text-heading-h4 font-bold text-primary">{title}</h2>
      <p className="text-body-md text-black whitespace-pre-line">{content}</p>
    </div>
  );
};

export default PlanSummaryCard;
