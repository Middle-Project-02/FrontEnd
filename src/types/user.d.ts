export interface UserInformation {
  memberId: string;
  nickname: string;
  fontMode: boolean;
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
