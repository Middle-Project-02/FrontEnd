import { useNavigate, useParams } from 'react-router-dom';

import { PATH } from '@/constants/path';
import {
  BUTTON_TEXTS,
  CONFIRM_DESCRIPTIONS,
  CONFIRM_TITLES,
  SUCCESS_TITLES,
} from '@/constants/modalMessage';

import {
  useDeleteTemplateMutation,
  useTemplateDetailQuery,
} from '@/hooks/queries/template/useTemplateQueries';
import useModalStore from '@/stores/modalStore';

import BackButton from '@/components/common/BackButton';
import { Button } from '@/components/ui/button';
import ConfirmModal from '@/components/modals/ConfirmModal';
import SuccessModal from '@/components/modals/SuccessModal';
import TemplateDetailSkeleton from '@/components/skeleton/template/TemplateDetailSkeleton';
import NotFoundPage from '@/pages/NotFoundPage';

import { makeToast } from '@/utils/makeToast';

const TemplateDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setModal, removeModal } = useModalStore();

  const templateId = Number(id);
  const { templateDetail, isLoading } = useTemplateDetailQuery(templateId);
  const { mutate: deleteTemplate } = useDeleteTemplateMutation({
    onSuccess: () => {
      setModal(
        <SuccessModal
          title={SUCCESS_TITLES.DELETE}
          buttonText={BUTTON_TEXTS.CONFIRM}
          onSuccess={() => {
            removeModal();
            navigate(PATH.TEMPLATES);
          }}
        />,
      );
    },
    onError: () => {
      makeToast('안내서 삭제에 실패했어요. 다시 시도해주세요.', 'warning');
      removeModal();
    },
  });

  const handleDeleteClick = () => {
    setModal(
      <ConfirmModal
        title={CONFIRM_TITLES.DELETE}
        description={CONFIRM_DESCRIPTIONS.DELETE(templateDetail!.title)}
        primaryText={BUTTON_TEXTS.DELETE}
        secondaryText={BUTTON_TEXTS.CANCEL}
        onPrimary={async () => {
          await deleteTemplate(templateId);
        }}
        onSecondary={removeModal}
      />,
    );
  };

  if (isLoading) return <TemplateDetailSkeleton />;
  if (!templateDetail) return <NotFoundPage />;

  const paragraphs = templateDetail.content.split(/(?<=\.)\s+/);

  return (
    <div className="flex flex-col h-full min-h-screen bg-white break-keep">
      <header className="sticky top-0 px-[30px] pt-[44px]">
        <BackButton />
        <h3 className="text-heading-h3 text-primary font-semibold py-4">{templateDetail.title}</h3>
        <p className="text-body-md text-textSecondary pb-12">
          이 안내서는 대리점에 보여주기 위해 만들어졌어요.
        </p>
      </header>
      <main className="flex flex-col pb-[150px] flex-1 overflow-y-auto p-[30px] bg-bgTertiary no-scrollbar">
        <div className="bg-white rounded-16 border shadow4 py-20 px-16 mb-5 max-w-[300px]">
          <h4 className="text-heading-h4 font-semibold mb-4">요금제 변경 안내서</h4>
          {paragraphs.map((para, idx) => (
            <p key={idx} className="text-body-lg mb-4">
              {para}
            </p>
          ))}
        </div>
        <div className="flex flex-row justify-end">
          <Button variant="destructive" onClick={handleDeleteClick}>
            이 안내서 지우기
          </Button>
        </div>
      </main>
    </div>
  );
};

export default TemplateDetailPage;
