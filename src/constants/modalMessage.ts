export const LOGIN_MODAL = {
  TITLE: '로그인 후 이용이 가능해요',
  DESCRIPTION: '로그인 후 계속 이용하시겠어요?',
};

export const CONFIRM_TITLES = {
  DELETE: '정말 삭제하시겠습니까?',
  WITHDRAW: '정말 탈퇴하시겠습니까?',
};

export const SUCCESS_TITLES = {
  DELETE: '정상적으로 삭제되었습니다.',
  WITHDRAW: '정상적으로 탈퇴되었습니다.',
};

export const CONFIRM_DESCRIPTIONS = {
  DELETE: (title: string) => `${title}는 삭제되며 복구되지 않습니다.`,
  WITHDRAW: (userName: string) =>
    `탈퇴하면 ${userName}님의 TOGETHER 정보가 삭제되며 복구되지 않습니다.`,
};

export const BUTTON_TEXTS = {
  DELETE: '삭제하기',
  WITHDRAW: '탈퇴하기',
  CONFIRM: '확인',
  CANCEL: '돌아가기',
  LOGIN: '로그인하기',
};
