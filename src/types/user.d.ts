export interface UserInformation {
  id: string;
  memberId: string;
  nickname: string;
  createdAt: string;
}
export interface UserInfoUpdate {
  nickname: string;
  fontMode: boolean;
}
export interface MyPageUserInfo {
  memberId: string;
  nickname: string;
  fontMode: boolean;
}

export type MyPageStep = 'info' | 'edit';
