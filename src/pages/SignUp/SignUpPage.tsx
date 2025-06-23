import Name from '@/components/SignUp/Name';
import PhoneNumber from '@/components/SignUp/PhoneNumber';
import Password from '@/components/SignUp/Password';
import Complete from '@/components/SignUp/Complete';
import Welcome from '@/components/SignUp/Welcome';
import { SignUpProvider, useSignUpContext } from '@/pages/SignUp/context/SignUpContext';

const SignUpContent = () => {
  const { step } = useSignUpContext();

  switch (step) {
    case 'name':
      return <Name />;
    case 'phoneNumber':
      return <PhoneNumber />;
    case 'password':
      return <Password />;
    case 'complete':
      return <Complete />;
    case 'welcome':
      return <Welcome />;
    default:
      return <Name />;
  }
};

const SignUpPage = () => {
  return (
    <SignUpProvider>
      <div className="flex flex-col min-h-screen w-full max-w-[360px] items-center px-30">
        <SignUpContent />
      </div>
    </SignUpProvider>
  );
};

export default SignUpPage;
