// import type { SmartChoicePlanDto } from '@/types/smartChoicePlan';

// // const PlanCard = ({ plan }: { plan: SmartChoicePlanDto }) => {
// //   const infoItems = [
// //     { label: '데이터', value: plan.data },
// //     { label: '통화', value: plan.voice },
// //     { label: '문자', value: plan.sms },
// //     { label: '통신망', value: plan.telecom },
// //   ];

// //   return (
// //     <div className="flex flex-col items-start gap-[var(--collection-1-spacing-20)] pt-[var(--collection-1-spacing-30)] pr-[var(--collection-1-spacing-20)] pb-[var(--collection-1-spacing-30)] pl-[var(--collection-1-spacing-20)] relative bg-collection-1-color-bg-white rounded-[var(--collection-1-border-radius-16)] shadow-shadow-shadow2 max-w-[268px]">
// //       <div className="items-end justify-center gap-[var(--collection-1-spacing-16)] flex flex-col relative self-stretch w-full">
// //         <p className="relative self-stretch mt-[-1.00px] font-heading-h4 text-collection-1-color-text-black tracking-[var(--heading-h4-letter-spacing)] leading-[var(--heading-h4-line-height)] text-[length:var(--heading-h4-font-size)]">
// //           <span className="text-primary">{plan.planName}</span>
// //         </p>

// //         <div className="items-start gap-[var(--collection-1-spacing-16)] flex flex-col relative self-stretch w-full">
// //           {infoItems.map((item, idx) => (
// //             <div
// //               key={idx}
// //               className="items-start justify-center gap-[var(--collection-1-spacing-6)] flex flex-col relative self-stretch w-full"
// //             >
// //               <div className="relative w-fit font-body-md-regular text-collection-1-color-text-textSecondary">
// //                 {item.label}
// //               </div>
// //               <div className="text-collection-1-color-text-black font-body-md-semibold">
// //                 {item.value}
// //               </div>
// //             </div>
// //           ))}
// //         </div>

// //         <div className="text-collection-1-color-text-primary font-body-lg-semibold text-[length:var(--body-lg-semibold-font-size)]">
// //           월 {plan.price.toLocaleString()}원
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// const PlanCard = () => {
//   return (
//     <div className="rounded-2xl border border-gray-200 p-6 bg-white shadow-sm w-full max-w-sm mx-auto">
//       {/* 요금제 이름 */}
//       <h2 className="text-lg font-bold text-primary mb-4">데이터 플러스 7GB</h2>

//       {/* 요금제 상세 */}
//       <div className="space-y-2 mb-6 text-[14px]">
//         <div className="flex justify-between">
//           <span className="text-gray-500">데이터</span>
//           <span className="font-medium">월 17GB + 1Mbps</span>
//         </div>
//         <div className="flex justify-between">
//           <span className="text-gray-500">통화</span>
//           <span className="font-medium">무제한</span>
//         </div>
//         <div className="flex justify-between">
//           <span className="text-gray-500">문자</span>
//           <span className="font-medium">무제한</span>
//         </div>
//         <div className="flex justify-between">
//           <span className="text-gray-500">통신망</span>
//           <span className="font-medium">LG U+</span>
//         </div>
//       </div>

//       {/* 요금제 가격 */}
//       <div className="text-right text-[16px] font-bold mb-4">월 58,000원</div>

//       {/* 버튼 영역 */}
//       <div className="flex flex-col gap-2">
//         <button className="h-12 rounded-lg bg-primary text-white font-semibold text-[14px]">
//           요금제 변경 안내서 만들기
//         </button>
//         <button className="h-12 rounded-lg border border-primary text-primary font-semibold text-[14px]">
//           요금제 공유하기
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PlanCard;

import { SmartChoicePlanDto } from '@/types/smartChoicePlan';
import { Button } from '../ui/button';

interface PlanCardProps {
  plan: SmartChoicePlanDto;
}

const PlanCard = ({ plan }: PlanCardProps) => {
  const infoItems = [
    { label: '데이터', value: plan.data },
    { label: '통화', value: plan.voice },
    { label: '문자', value: plan.sms },
    { label: '통신망', value: plan.telecom },
  ];

  return (
    <div className="flex flex-col items-start gap-16 p-20 pt-20 pr-30 pb-20 pl-30 rounded-16 bg-white w-full">
      <h2 className="text-heading-h4 font-bold text-primary">{plan.planName}</h2>

      <main className="flex flex-col gap-16 text-body-sm text-black w-full">
        {infoItems.map((item, idx) => (
          <div key={idx} className="flex flex-col items-start gap-6">
            <p className="text-body-md text-textSecondary">{item.label}</p>
            <p className="text-body-md font-semibold text-black">{item.value}</p>
          </div>
        ))}
      </main>

      <footer className="self-end text-body-lg font-semibold text-primary">
        월 {plan.price.toLocaleString()}원
      </footer>

      <Button className="w-full">요금제 변경 안내서 만들기</Button>
      <Button variant="outline" className="w-full">
        요금제 공유하기
      </Button>
    </div>
  );
};
export default PlanCard;
