import { useNavigate } from 'react-router-dom';
import useUserInfoQuery from '@/hooks/queries/user/useUserInfoQuery';
import { axiosInstance } from '@/apis/axiosInstance';
import useAuthStore from '@/stores/authStore';

const MainPage = () => {
  const { userInformation } = useUserInfoQuery();
  const { setIsLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  const logout = async () => {
    const response = await axiosInstance.post('auth/logout', {});

    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <div>
      MainPage 입니다.
      <button className="bg-green-400 w-20" onClick={logout}>
        로그아웃
      </button>
      <div>{userInformation && userInformation.nickname}</div>
    </div>
  );
};

export default MainPage;
