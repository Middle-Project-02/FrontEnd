import useLoginMutation from '@/hooks/queries/auth/useLoginMutation';

const LoginPage = () => {
  const { mutatePostLogin } = useLoginMutation();

  const handleButtonClick = () => {
    try {
      mutatePostLogin({ memberId: '01000000000', password: '01000000000' });
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  return (
    <div>
      <button className="bg-red-400 w-20" onClick={handleButtonClick}>
        로그인 테스트
      </button>
    </div>
  );
};

export default LoginPage;
